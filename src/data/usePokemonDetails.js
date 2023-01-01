import { useEffect, useState } from 'react';

import listModel from './listModel';
import model from './detailsModel';


/**
 * Helper for getting Pokémon details data from the model.
 * Will trigger a rerender in consuming component if the data changes,
 *  which will only occur if the details are not already loaded when called.
 *
 * Can optionally fetch details onMount if not loaded onMount.
 * However, the List handles fetching of details data because loads on-demand while scrolling.
 * @see useLoadVisibleListItems()
 *
 * @param {Object} config
 * @param {string} config.name            The name of the Pokémon
 * @param {boolean} [config.loadOnMount]  If true, details data will be loaded onMount
 * @returns {Object}
 */
function usePokemonDetails({ name, loadOnMount = false }) {
	/**
	 * Store the details item in state so can force consuming component to rerender when it loads
	 */
	const [details, setDetails] = useState(() => model.getItem(name));

	/**
	 * If details are not loaded onMount, we return the listItem so can at least display the name
	 * Only expend effort to find the listItem if we do not have details onMount,
	 */
	const [listItem] = useState(() => !details && listModel.itemFromList(name));

	useEffect(() => {
		// Fetch the Pokémon details item, IF not already loaded
		if (loadOnMount) model.loadItem(name);

		// If details data loaded during the first render, set the data now
		const item = !details && model.getItem(name);
		if (!details && item) setDetails(item);

		// Add a listener that fires if the item changes later, including first load
		model.addItemListener(name, setDetails);

		// Remove the listener onUnmount
		return () => model.removeItemListener(name, setDetails);
	}, []); // eslint-disable-line

	return {
		item: details || listItem,
		isDetailsLoaded: !!details,
	};
}

export default usePokemonDetails;
