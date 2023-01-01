const isPromise = obj => !!obj?.then;

const getTimeNow = () => new Date().getTime();


function addUniqueArrayItem(array, item) {
	const found = array.find(arrayItem => (arrayItem === item));
	if (!found) array.push(item);
}

function removeArrayItem(array, item) {
	const index = array.indexOf(arrayItem => (arrayItem === item));
	if (index >= 0) array.splice(index, 1);
}

export { isPromise, getTimeNow, addUniqueArrayItem, removeArrayItem };
