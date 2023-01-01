import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { createUseStyles } from 'react-jss';
import cx from 'classnames';

import { usePokemonDetails } from 'data';
import { getSprite, showSpriteFront, showSpriteBack } from 'helpers';
import { theme } from 'styles'

import styles from './styles';

const useStyles = createUseStyles(styles);


/**
 * NOTE: The List component handles loading of Pokémon details data as items become visible.
 */
function ListItem({ name }) {
	const classes = useStyles();

	/**
	 * Hook will load the Pokémon details onMount if not already loaded.
	 * If details not loaded then the list-item is provided so can display the Pokémon name.
	 * This component will rerender when the details finish loading.
	 */
	const { item, isDetailsLoaded } = usePokemonDetails({ name, loadOnMount: false });

	return (
		<NavLink
			to={`/${name}`}
			className={classes.cardLink}
		>
			<div
				data-name={name} // Used for load-on-demand while scrolling
				className={cx('card', classes.card)} // `.card` used as a DOM selector
			>
				<div
					className={classes.imageWrapper}
					onMouseEnter={e => showSpriteBack(item, e.target)}
					onMouseLeave={e => showSpriteFront(item, e.target)}
				>
					{isDetailsLoaded && (
						<img
							src={getSprite(item)}
							alt={item.displayName}
							title={item.displayName}
							className={classes.sprite}
						/>
					)}
				</div>

				<div className={classes.name}>
					{item.displayName}
				</div>

				<ul className={classes.typeList}>
					{item.typeList?.map(type => (
						<li
							key={type}
							style={{ backgroundColor: theme.types[type] || theme.types.Reset }}
						>
							{type}
						</li>
					))}
				</ul>

				<div className={classes.info}>
					{isDetailsLoaded ? (
						<>
							<span>EXP: {item.base_experience || '0'}</span>
							<span>ID: {item.id}</span>
						</>
					) : (
						<>&nbsp;</>
					)}
				</div>
			</div>
		</NavLink>
	);
}

const { string } = PropTypes;

ListItem.propTypes = {
	name: string.isRequired,
};

export default React.memo(ListItem);
