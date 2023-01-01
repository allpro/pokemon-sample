import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { detailsModel as model } from 'data'
import { useOnUpdate } from 'helpers';
import { theme } from 'styles'

const useStyles = createUseStyles({
	wrapper: {
		flex: '0 0 auto',

		'& label': {
			fontSize: '1rem',
			fontWeight: 600,
			color: '#666',
			marginRight: '10px',
		},

		'& select': {
			border: theme.lightBorder,
			borderRadius: '10px',
			padding: '6px 12px 7px',
			width: '9rem',
			margin: '0 7px',

			'&:disabled': {
				cursor: 'wait',
			},
		},
	},
});


function FilterbarSort({ onSort }) {
	const classes = useStyles();

	const [isAllItemsLoaded, setAllItemsLoaded] = useState(model.isAllLoaded);

	useEffect(() => {
		if (isAllItemsLoaded) return;

		function onLoad() { setAllItemsLoaded(true); }
		model.addAllItemsLoadedListener(onLoad);
		return () => model.removeAllItemsLoadedListener(onLoad);
	}, []); // eslint-disable-line


	const [sort, setSort] = useState({
		field: 'name',
		direction: 'asc',
	});

	useOnUpdate(() => {
		onSort(sort);
	}, [sort]); // eslint-disable-line

	function onChange(e) {
		const elem = e.target;
		setSort({ ...sort, [elem.name]: elem.value });
	}

	return (
		<div className={classes.wrapper}>
			<label htmlFor="field">Sort By:</label>

			<select
				id="field"
				name="field"
				defaultValue="name"
				onChange={onChange}
			>
				<option value="id">ID</option>
				<option value="name">Name</option>
				{/* Cannot sort by experience until details data is loaded */}
				<option value="base_experience" disabled={!isAllItemsLoaded}>Experience</option>
			</select>

			<select
				name="direction"
				onChange={onChange}
			>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
		</div>
	);
}

const { func } = PropTypes;

FilterbarSort.propTypes = {
	onSort: func.isRequired,
};

export default FilterbarSort;
