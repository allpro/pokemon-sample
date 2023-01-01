import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss';

import { detailsModel, listModel } from 'data';
import 'styles/progressbar.css';

import styles from './styles';

const useStyles = createUseStyles(styles);


function ListFooter() {
	const classes = useStyles();
	const { filteredCount, totalCount } = listModel;
	const [percentLoaded, setPercentLoaded] = useState(detailsModel.percentLoaded);

	useEffect(() => {
		detailsModel.addItemsProgressListener(setPercentLoaded);
		return () => detailsModel.removeItemsProgressListener(setPercentLoaded);
	}, []);

	const isListFiltered = totalCount > 0 && filteredCount < totalCount;

	return (
		<footer className={classes.footer}>
			<div className={classes.count}>
				{isListFiltered ? (
					<>{filteredCount} of {totalCount}</>
				) : (
					totalCount
				)}

				{' '}Pokémons

				{percentLoaded < 100 && (
					<> &mdash; Loading...</>
				)}
			</div>

			<div
				className={classes.loader}
				title="Loading Pokemons..."
			>
				{percentLoaded < 100 && (
					<div className="progressbar">
						<span style={{ width: `${percentLoaded}%` }}></span>
					</div>
				)}
			</div>
		</footer>
	)
}

export default ListFooter;
