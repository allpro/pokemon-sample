import apiService, { api } from './apiService'
import { addUniqueArrayItem, removeArrayItem, getTimeNow } from './utils';
import { sortByName, sortList } from './sorting';
import detailsModel, { toDisplayName } from './detailsModel';


const reIdFromUrl = /(\d+)\/$/;

function extendItem(item) {
	// Add a display name by converting 'name' to Proper Case
	item.displayName = toDisplayName(item.name);
	// Add an ID to the item, in case ever useful
	item.id = Number(item.url.match(reIdFromUrl)[1]);
}


/**
 * Data object for loading and caching all Pokémon data.
 * Includes helpers for applying filters to the list data.
 *
 * @constructor
 * @returns {{
 *   readonly list: Object[],
 *   readonly totalCount: number,
 *   readonly filteredList: Object[],
 *   readonly filteredCount: number,
 *   readonly isListLoaded: boolean,
 *   itemFromList: Function,
 *   loadList: Function,
 *   setListFilters: Function,
 *   setListSort: Function,
 *   addListListener: Function,
 *   removeListListener: Function,
 * }}
 */
function Model() {
	let count = 0;
	/** The list data contains only 'name' & 'url' */
  let list = [];

	/**
	 * Filtered/sorted list and count, cached for fast refresh.
	 */
	let listFilters = null;
	let listSort = null; // eslint-disable-line no-unused-vars
	let sortedList = null;
	let filteredList = null;
	let filteredCount = null;

	/**
	 * Listeners are used so that only the specific elements that need refreshing will rerender,
	 *  like the cards in the list view.
	 * @see usePokemonDetails()
	 */
	const listListeners = [];


	/**
	 * Model API. Getters ensure that the latest values list & count will be returned.
	 */
	return {
    get list() { return list; },
		get totalCount() { return count; },
    get filteredList() { return filteredList || sortedList || list; },
    get filteredCount() { return filteredCount ?? count; },
		get isListLoaded() { return count > 0; },

		itemFromList,
		loadList,
		setListFilters,
		setListSort,

		addListListener,
		removeListListener,
  };


	/**
	 * Returns the simple item from the list data.
	 * This can be used to display the Pokémon name while waiting for the details to load.
	 *
	 * @param {string} name
	 * @returns {Object|undefined}
	 */
	function itemFromList(name) {
		return list?.find(item => item.name === name);
	}


	function setListFilters(filters) {
		const activeList = sortedList || list;
		listFilters = filters || null;

		if (!filters.name && !filters.types?.length) {
			filteredList = activeList;
			filteredCount = filteredList.length;
			listListeners.forEach(handler => handler(getTimeNow()));
			return;
		}

		// Create a regex for searching against item name
		// Replace spaces in the displayName we created, so ALSO match if a hyphenated-name entered
		const reSearch = filters.name && new RegExp(filters.name.replace(/\s/g, '-'), 'i');

		filteredList = activeList.filter(item => {
			const details = detailsModel.getItem(item.name);

			if (filters.name && !reSearch.test(item.name)) return false;

			if (
				details &&
				filters.types?.length &&
				// If more than 1 type was selected, item must have ALL the selected types
				!filters.types.every(type => details.typeList.includes(type))
			) return false;

			return true; // Matched all filters
		});

		filteredCount = filteredList.length;

		listListeners.forEach(handler => handler(getTimeNow()));
	}

	function setListSort(sort) {
		// Cache the sort for reference, though not currently used
		listSort = sort || null;

		if (!sort) {
			if (sortedList) {
				sortedList = null;
				listListeners.forEach(handler => handler(getTimeNow()));
			}
			return;
		}

		sortedList = [...list];
		sortList(sortedList, sort);
		// Reapply filters to newly sortedlist
		if (listFilters) setListFilters(listFilters);
		listListeners.forEach(handler => handler(getTimeNow()));
	}


	/**
	 * Load the list of data.
	 * Currently, the entire list is always loaded so this only needs to run once
	 *
	 * @returns {Promise<void>}
	 */
  function loadList() {
		if (list.length) return Promise.resolve();

		// Cache promise in case a Details fetch is made simultaneously; see loadItem()
		return apiService.get(`${api}/pokemon?offset=0&limit=10000`)
			.then((data) => {
				count = data.count;
				list = data.results;
				list.sort(sortByName);
				list.forEach(extendItem); // Add id & displayName
				// Fire list-listeners now
				listListeners.forEach(handler => handler(getTimeNow()));
			});
  }


	/**
	 * Add a listener that will be called when the list/filteredList data is changed.
	 *
	 * @param {Function} handler
	 */
	function addListListener(handler) {
		addUniqueArrayItem(listListeners, handler);
	}

	/**
	 * Remove a specific listener for the list/filteredList.
	 * The handler passed must be the same function originally set, using an equality check.
	 *
	 * @param {Function} handler
	 */
	function removeListListener(handler) {
		removeArrayItem(listListeners, handler);
	}
}

// Create a Singleton instance of the model for export
const listModel = new Model();

export default listModel;
