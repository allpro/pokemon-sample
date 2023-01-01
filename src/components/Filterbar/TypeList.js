import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import without from 'lodash/pull';

import { detailsModel as model } from 'data'
import { useOnUpdate } from 'helpers';
import { theme } from 'styles'

const useStyles = createUseStyles({
	typeList: {
		flex: '0 0 100%',
		listStyle: 'none',
		padding: 0,
		margin: 0,

		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
		minWidth: 0,

		'& > li': {
			flex: '0 1 auto',
			minWidth: '30px',
			padding: '1px 10px 3px',
			margin: '0 5px',
			display: 'inline-block',

			borderRadius: '8px',
			borderWidth: '2px',
			borderStyle: 'solid',
			borderColor: 'transparent',
			textAlign: 'center',
			fontWeight: 600,
			color: 'white',
			cursor: 'pointer',

			'&.active': {
				borderColor: 'blue',
			},
			'&.inactive': {
				opacity: 0.5,
				'&:hover': {
					opacity: 1,
				},
			},
			'&.disabled': {
				opacity: 0.5,
				cursor: 'wait',
			},
		},
	},
});

const types = [
	'Bug',
	'Dark',
	'Dragon',
	'Electric',
	'Fairy',
	'Fighting',
	'Flying',
	'Fire',
	'Ghost',
	'Grass',
	'Ground',
	'Ice',
	'Normal',
	'Poison',
	'Psychic',
	'Reset',
	'Rock',
	'Steel',
	'Water',
];


function FilterbarTypeList({ onSelect }) {
	const classes = useStyles();

	const [isAllItemsLoaded, setAllItemsLoaded] = useState(model.isAllLoaded);

	useEffect(() => {
		if (isAllItemsLoaded) return;

		function onLoad() { setAllItemsLoaded(true); }
		model.addAllItemsLoadedListener(onLoad);
		return () => model.removeAllItemsLoadedListener(onLoad);
	}, []); // eslint-disable-line


	const [selectedTypes, setSelectedTypes] = useState([]);

	useOnUpdate(() => {
		onSelect(selectedTypes);
	}, [selectedTypes]); // eslint-disable-line

	function onClickType(e) {
		if (!isAllItemsLoaded) return;

		const elem = e.target;
		const { value } = elem.dataset;

		const isAlreadySelected = selectedTypes.includes(value);
		const haveMultipleSelections = selectedTypes.length > 1;

		// If the already-selected type is clicked, deselect it OR select it 'only'
		if (isAlreadySelected) {
			if (!haveMultipleSelections || e.ctrlKey) {
				// NOTE: There is a BUG in without method - it mutates array instead of creating a new one!
				setSelectedTypes([...without(selectedTypes, value)]);
			} else {
				setSelectedTypes([value]);
			}
		}
		// Allow multi-select with the CTRL+Click
		else if (e.ctrlKey) {
			setSelectedTypes([...selectedTypes, value]);
		}
		// Else replace the current selection, if exists
		else {
			setSelectedTypes([value]);
		}
	}


	function getTypeClasses(type) {
		const hasSelected = selectedTypes.length;
		const active = hasSelected && selectedTypes.includes(type);
		const inactive = hasSelected && !active;
		const disabled = !isAllItemsLoaded;
		return cx({ active, inactive, disabled });
	}

	return (
		<ul className={classes.typeList}>
			{types.map(type => (
				<li
					key={type}
					data-value={type}
					className={getTypeClasses(type)}
					style={{ backgroundColor: theme.types[type] }}
					onClick={onClickType}
				>
					{type}
				</li>
			))}
		</ul>
	);
}

const { func } = PropTypes;

FilterbarTypeList.propTypes = {
	onSelect: func.isRequired,
};

export default FilterbarTypeList;
