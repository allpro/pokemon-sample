import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createUseStyles } from 'react-jss';

import { listModel as model, detailsModel } from 'data';

import useLoadVisibleListItems from './useLoadVisibleListItems';
import Footer from './Footer';
import Item from './Item';
import styles from './styles';

const useStyles = createUseStyles(styles);


function List() {
	const classes = useStyles();
	const { name } = useParams();
	// const navigate = useNavigate();

	const { filteredList, isListLoaded } = model;
	const [, forceRefresh] = useState(0);

	const { containerRef, updateObservers } = useLoadVisibleListItems({
		// After loading the initial screen-full of items, preload the rest, in batches
		onInitialLoadComplete: () => detailsModel.loadAllItems(model.list),
	});

	useEffect(() => {
		// Load the list data onMount, if not already loaded
		model.loadList();

		// Listen for list changes, like filters or sorting being applied
		// The list-listener returns a timestamp so can be used to force a state-change & rerender
		model.addListListener(forceRefresh);
		return () => model.removeListListener(forceRefresh);
	}, []);


	/* Disabled for now, to allow the list to display without the sidebar
	 // When list loads, auto-select the first item if there is not selected item
	useLayoutEffect(() => {
		if (name || !isListLoaded) return;
		navigate(`/${filteredList[0].name}`);
	}, [filteredList, name, isListLoaded, navigate]);
	*/


	// If a name exists on the URL when list loads, scroll to it in the list
	useLayoutEffect(() => {
		if (!isListLoaded || !name) return;
		const selectedItem = containerRef.current.querySelector('.active');

		// scrollIntoViewIfNeeded is not supported by every browser
		if (selectedItem?.scrollIntoViewIfNeeded) {
			selectedItem.scrollIntoViewIfNeeded(true)
		} else {
			selectedItem?.scrollIntoView({ block: 'center' });
		}
	}, [isListLoaded, name]); // eslint-disable-line


	// AFTER the list has rendered, add observers to items for load-on-demand
	useLayoutEffect(() => {
		if (isListLoaded) updateObservers();
	}, [isListLoaded, updateObservers]);


	return (
    <section className={classes.wrapper}>
      <nav ref={containerRef} className={classes.list}>
				{filteredList.map(item => (
					<Item key={item.name} name={item.name} />
				))}

				{isListLoaded && !filteredList.length && (
					<div style={{ fontWeight: 600 }}>No matching Pokémon found</div>
				)}
			</nav>

			<Footer />
    </section>
  );
}

export default React.memo(List);
