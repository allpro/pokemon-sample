import React, { useCallback, useRef } from 'react'
import { createUseStyles } from 'react-jss';

import model from 'data/listModel';

import Searchbox from './Searchbox';
import TypeList from './TypeList';
import Sort from './Sort';
import styles from './styles';

const useStyles = createUseStyles(styles);


function Filterbar() {
	const classes = useStyles();

	const filters = useRef({
		name: '',
		types: [],
	})

	const onSearch = useCallback((text) => {
		filters.current.name = text;
		model.setListFilters(filters.current);
	}, []);

	const onSelectType = useCallback((types) => {
		filters.current.types = types;
		model.setListFilters(filters.current);
	}, []);

	const onSort = useCallback((sort) => {
		model.setListSort(sort);
	}, []);

	return (
		<div className={classes.wrapper}>
			<div className={classes.row}>
				<div style={{ flex: '0 0 auto' }}>
					<Searchbox onSearch={onSearch} />
				</div>

				<Sort onSort={onSort} />
			</div>

			<div className={classes.row}>
				<TypeList onSelect={onSelectType} />
			</div>
		</div>
	)
}

export default Filterbar;
