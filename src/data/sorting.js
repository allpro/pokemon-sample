import detailsModel from './detailsModel';


/**
 * Simpler sorter for initial list sorting
 *
 * @param {Object} a   A list-item
 * @param {Object} b   A list-item
 */
const sortByName = (a, b) => (a.name > b.name ? 1 : -1);


/**
 * Sort method used by the app. Can sort on any field in root of item
 *
 * @param {Object[]} list
 * @param {string} sort
 * @returns {*}
 */
function sortList(list, sort) {
	const { field, direction } = sort;
	const value = direction === 'asc' ? 1 : -1;
	const useDetails = detailsModel.isAllLoaded;

	return list.sort((a, b) => {
		const itemA = useDetails ? detailsModel.getItem(a.name) : a;
		const itemB = useDetails ? detailsModel.getItem(b.name) : b;
		return (itemA[field] > itemB[field] ? value : -value)
	})
}

export { sortByName, sortList };
