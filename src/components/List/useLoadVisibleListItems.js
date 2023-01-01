import { useCallback, useRef } from 'react';
import noop from 'lodash/noop';

import { detailsModel as model } from 'data';


/**
 * Used by List component to load details for items as they are scrolled into view.
 * Parent component needs to call updateObservers() AFTER the list of items has rendered.
 *
 * @param {Object} config
 * @param {Function} [config.onInitialLoadComplete]
 * @returns {{
 *   containerRef: React.MutableRefObject,
 *   updateObservers: Function,
 * }}
 */
function useLoadVisibleListItems({ onInitialLoadComplete = noop } = {}) {
	const containerRef = useRef();
	const isInitialized = useRef(false);

	const updateObservers = useCallback(() => {
		function onIntersect(entries) {
			const loadingPromises = [];

			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const { name } = entry.target.dataset;
				// Note: model will fire listeners after loading, triggering a rerender where needed
				if (!model.getItem(name)) {
					loadingPromises.push(
						model.loadItem(name)
					)
				}
			});

			// Only fire onInitialLoadComplete after the initial load of items
			if (!isInitialized.current) {
				isInitialized.current = true;
				Promise.allSettled(loadingPromises)
					.then(onInitialLoadComplete)
			}
			else {
				// No need to cached promises after the first load
				loadingPromises.length = 0;
			}
		}

		const observer = new IntersectionObserver(
			onIntersect,
			{
				root: containerRef.current,
				rootMargin: '50px 0px 50px 0px',
				threshold: 0,
				// trackVisibility: true,
				delay: 100, // minimum 100
			},
		);

		[...containerRef.current.querySelectorAll('.card')].forEach(elem => {
			observer.observe(elem);
		});

		// Disconnect the observer from the DOM onUnmount
		return () => {
			observer.disconnect();
		};
	}, []); // eslint-disable-line


	return { containerRef, updateObservers, onInitialLoadComplete };
}

export default useLoadVisibleListItems;
