import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import debounce from 'lodash/debounce';

import { listModel as model } from 'data'
import { theme } from 'styles'

const useStyles = createUseStyles({
	searchInput: {
		border: theme.lightBorder,
		borderRadius: '15px',
		padding: '6px 12px 7px',
		width: '20rem',
	},
});


function Searchbox({ onSearch}) {
	const classes = useStyles();

	const [isListLoaded, setListLoaded] = useState(model.isListLoaded);

	useEffect(() => {
		if (isListLoaded) return;

		function onLoad() { setListLoaded(true); }
		model.addListListener(onLoad);
		return () => model.addListListener(onLoad);
	}, []); // eslint-disable-line


	const [text, setText] = useState('');

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const searchNames = useCallback(debounce(
		(searchText) => onSearch(searchText),
		500,
		{ maxWait: 3000 },
	), []);

	function onChange(e) {
		setText(e.target.value);
		searchNames(e.target.value.trim());
	}

	return (
		<input
			value={text}
			placeholder="Search names"
			onChange={onChange}
			className={classes.searchInput}
			disabled={!isListLoaded}
		/>
	)
}

const { func } = PropTypes;

Searchbox.propTypes = {
	onSearch: func.isRequired,
};

export default Searchbox;
