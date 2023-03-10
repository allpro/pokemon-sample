import { useEffect, useRef } from 'react';
import isFunction from 'lodash/isFunction';


/**
 * Wrapper to simplify onUpdate effects that should NOT run onMount.
 * An onUpdate method return value that IS a function is returned
 *  from the useEffect as normal, so also runs on every change.
 *
 * @usage const useOnUpdate(props.doSomething) // Convert non-static method to a static one
 * @usage const useOnUpdate(() => doSomething(param)) // Use external param inside a static method
 *
 * @param {Function} handler
 * @param {Array<*>} [dependencies]
 * @returns undefined
 */
function useOnUpdate(handler, dependencies) {
	const isMounted = useRef(false);

	useEffect(() => {
		// onUpdate does not run onMount so exit if this is the first call
		if (!isMounted.current) {
			isMounted.current = true;
			return undefined;
		}

		const response = handler();

		// Return the response IF it's a function because can return an un-update method
		// We ignore any non-function values, like a promise, to allow passing methods with a wrapper.
		return isFunction(response) ? response : undefined;
	}, dependencies); // eslint-disable-line

	return isMounted;
}

export default useOnUpdate;
