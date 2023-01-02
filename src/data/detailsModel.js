import startCase from 'lodash/startCase'
import uniq from 'lodash/uniq'

import apiService, { api } from './apiService'
import { isPromise, addUniqueArrayItem, removeArrayItem } from './utils';


export const toDisplayName = name => startCase(name)


function extendItem(item) {
	// Add a display name by converting 'name' to Proper Case
	item.displayName = toDisplayName(item.name);
	// Replace null experience values so will display and sort as expected
	if (!item.base_experience) item.base_experience = 0;

	// Add simple arrays for nested data to simplify rendering; and convert to Proper Case
	item.typeList = uniq(item.types.map(child => startCase(child.type.name)));
	item.abilityList = uniq(item.abilities.map(child => startCase(child.ability.name)));
	item.heldItemList = uniq(item.held_items.map(child => startCase(child.item.name)));
}


/**
 * Data object for loading and caching all Pokémon data.
 * Includes helpers for applying filters to the list data.
 *
 * @constructor
 * @returns {{
 *   readonly isAllLoaded: boolean,
 *   readonly percentLoaded: number,
 *   getItem: Function,
 *   loadItem: Function,
 *   loadAllItems: Function,
 *   addItemListener: Function,
 *   removeItemListener: Function,
 *   addItemsProgressListener: Function,
 *   removeItemsProgressListener: Function,
 *   addAllItemsLoadedListener: Function,
 *   removeAllItemsLoadedListener: Function,
 * }}
 */
function Model() {
	let count = 0;
	let numLoaded = 0;
	const getPercentLoaded = () => count ? Math.floor(numLoaded / count * 1000) / 10 : 0;

	/** The detailed data for each Pokémon, accessed via the getItem method */
	let items = {};

	/**
	 * Listeners allow only the specific elements that need refreshing to rerender,
	 *  like the cards in the list view or the footer/progress-bar.
	 * @see useDetails()
	 */
	const itemListeners = {}; // Fired when the specific item is loaded/updated
	const itemsProgressListeners = []; // Fired when any item is loaded/updated
	const allItemsLoadedListeners = []; // Fired when all items finish loading initially


	/**
	 * Model API. Getters ensure that the latest values list & count will be returned.
	 */
	return {
		get isAllLoaded() { return count > 0 && numLoaded === count; },
    get percentLoaded() { return getPercentLoaded(); },

		getItem,
		loadItem,
		loadAllItems,

		addItemListener,
		removeItemListener,
		addItemsProgressListener,
		removeItemsProgressListener,
		addAllItemsLoadedListener,
		removeAllItemsLoadedListener,
  };


	/**
	 * Returns the details item for the specified name, if already loaded.
	 *
	 * @param {string} name
	 * @returns {Object|undefined}
	 */
  function getItem(name) {
		const item = items[name];
		// Note: The loadingPromise is cached while waiting for a response, so need to check for that
		return item && !isPromise(item) ? item : undefined;
	}


	/**
	 * Load the details for a single Pokémon.
	 * The data never changes so each Pokémon is only ever loaded once.
	 *
	 * @param {string} name
	 * @returns {Promise<void>}
	 */
  function loadItem(name) {
		const item = items[name];
		if (item) {
			return isPromise(item) ? item : Promise.resolve();
		}

    const loadingPromise = apiService.get(`${api}/pokemon/${name}/`)
			.then((details) => {
				extendItem(details);
				items[name] = details;
				numLoaded++;

				// Fire listener(s) for this item, if exist
				itemListeners[name]?.forEach(handler => handler(details));
			})
			.catch(() => {
				// NOTE: Item-loading errors are ignored in this app; should be rare
				items[name] = undefined;
				numLoaded++;
			})
			.finally(() => {
				const percent = getPercentLoaded();
				itemsProgressListeners.forEach(handler => handler(percent));

				if (numLoaded === count) {
					allItemsLoadedListeners.forEach(func => func());
					// Clear listeners list because no longer needed
					allItemsLoadedListeners.length = 0;
					// console.log(items); // Keep for now; useful for reviewing the Pokémon data
				}
			});

		// Cache the loadingPromise in case this method is called twice quickly,
		//  like from the List and Details components.
		items[name] = loadingPromise;

		return loadingPromise;
  }

	/**
	 * Load ALL ITEMS. Needed before we can filter the list.
	 * Loads in batches to avoid consuming all available requests and slowing the UI.
	 */
	function loadAllItems(list) {
		// NOTE: This is where the `count` value is initialized in this model
		count = list.length;
		if (!count) return; // Should not happen

		const batchSize = 5; // batch = 10 is only 20% faster than 5, when no-cache
		let lastItemIndex = -1;

		function getBatchPromises() {
			if (lastItemIndex === count) return [];

			const promises = [];

			list.some(({ name }, index) => {
				// Skip previously processed items
				if (index <= lastItemIndex) return false; // Next item
				lastItemIndex = index;

				const item = items[name];
				// Note: This item may be a loadingPromise
				if (!item) {
					promises.push(loadItem(name));
				}
				else if (isPromise(item)) {
					promises.push(item);
				}

				// Break the loop when batch is full, else Next item
				return promises.length === batchSize;
			});

			return promises;
		}

		// Return an outer-promise that resolves when ALL items have been fetched, or are fetching
		return new Promise(resolve => {
			function fetchNextBatch() {
				const promises = getBatchPromises();

				// It all items have finished fetching, resolve the outer promise
				if (!promises.length) {
					resolve(); // Resolve outer Promise
					return;
				}

				// Use allSettled to ignore failed requests
				// This is a simple app, so we do not include error handling
				Promise.allSettled(promises)
					.then(fetchNextBatch);
			}

			// Init the recursive fetch-loop
			fetchNextBatch();
		});
	}


	/**
	 * Add a listener that will be called when the specified details are loaded.
	 * This is used by the useDetails helper, and potentially other code,
	 *  so multiple handlers for the same item can be handled.
	 *
	 * @param {string} name
	 * @param {Function} handler
	 */
	function addItemListener(name, handler) {
		if (!itemListeners[name]) itemListeners[name] = [];
		addUniqueArrayItem(itemListeners[name], handler);
	}

	/**
	 * Remove a specific listener for the specified name.
	 * The handler passed must be the same function originally set, using an equality check.
	 *
	 * @param {string} name
	 * @param {Function} handler
	 */
	function removeItemListener(name, handler) {
		removeArrayItem(itemListeners[name] || [], handler);
	}


	/**
	 * Add a listener for when all items finish loading.
	 *
	 * @param {Function} handler
	 */
	function addItemsProgressListener(handler) {
		// If all item are already loaded when this is called, then just call the handler now
		if (count && numLoaded === count) {
			handler(100); // 100%
		} else {
			addUniqueArrayItem(itemsProgressListeners, handler);
		}
	}

	/**
	 * Remove a listener for when all items finish loading.
	 * The handler passed must be the same function originally set, using an equality check.
	 *
	 * @param {Function} handler
	 */
	function removeItemsProgressListener(handler) {
		removeArrayItem(itemsProgressListeners, handler);
	}


	/**
	 * Add a listener for when all items finish loading.
	 *
	 * @param {Function} handler
	 */
	function addAllItemsLoadedListener(handler) {
		// If all item are already loaded when this is called, then just call the handler now
		if (count > 0 && numLoaded === count) {
			handler();
		} else {
			addUniqueArrayItem(allItemsLoadedListeners, handler);
		}
	}

	/**
	 * Remove a listener for when all items finish loading.
	 * The handler passed must be the same function originally set, using an equality check.
	 *
	 * @param {Function} handler
	 */
	function removeAllItemsLoadedListener(handler) {
		removeArrayItem(allItemsLoadedListeners, handler);
	}
}

// Create a Singleton instance of the model for export
const detailsModel = new Model();

export default detailsModel;
