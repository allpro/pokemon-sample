import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import startCase from 'lodash/startCase';

import { useDetails } from 'data';
import { getSprite } from 'helpers';
import { theme } from 'styles'
import 'styles/progressbar.css';

import styles from './styles';

const useStyles = createUseStyles(styles);


function Details({ name }) {
	const classes = useStyles();
	const navigate = useNavigate();

	/**
	 * Hook will load the Pokémon details onMount if not already loaded.
	 * If details is not loaded then the list-item is provided so can display the Pokémon name.
	 * This component will rerender when the details finish loading, if not already.
	 */
	const { item, isDetailsLoaded } = useDetails({ name, loadOnMount: true });

  return (
    <section className={classes.wrapper}>
			<nav
				className={classes.closeIcon}
				onClick={() => navigate('/')}
			>
				X
			</nav>

			<div className={classes.imageWrapper}>
				{isDetailsLoaded && (
					<img
						src={getSprite(item, 'large', 'front')}
						alt={item.displayName}
					/>
				)}
			</div>

			<div className={classes.info}>
				{isDetailsLoaded ? (
					<>
						<span>Experience: {item.base_experience || '0'}</span>
						<span>ID: {item.id}</span>
					</>
				) : (
					<>&nbsp;</>
				)}
			</div>

			<ul className={classes.typeList}>
				{isDetailsLoaded ? (
					item.typeList?.map(type => (
						<li
							key={type}
							style={{ backgroundColor: theme.types[type] || theme.types.Reset }}
						>
							{type}
						</li>
					))
				) : (
					<li key="loading" style={{ backgroundColor: theme.mediumBackground }}>
						&nbsp;
					</li>
				)}
			</ul>

			<h1 className={classes.title}>
				{item ? item.displayName : <>&nbsp;</>}
			</h1>

			{/* Skip section if has no Abilities */}
			{item?.abilityList?.length > 0 && (
				<>
					<h2>Abilities</h2>

					<ul className={classes.bulletList}>
						{item.abilityList.map(ability => (
							<li key={ability}>{ability}</li>
						))}
					</ul>
				</>
			)}

			{/* Skip section if has no Held Items */}
			{item?.heldItemList?.length > 0 && (
				<>
					<h2>Held Items</h2>

					<ul className={classes.bulletList}>
						{item?.heldItemList?.map(item => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</>
			)}

			{isDetailsLoaded && (
				<>
					<h2>Stats</h2>

					<div className={classes.statsGrid}>
						{item?.stats?.map(child => (
							<Fragment key={child.stat.name}>
								<div>{child.base_stat}</div>
								<div>{startCase(child.stat.name)}</div>
								<div>
									<div className="progressbar meter orange">
										<span style={{ width: `${Math.min(100, child.base_stat / 2.5)}%` }} />
									</div>
								</div>
							</Fragment>
						))}
					</div>
				</>
			)}
		</section>
  );
}

const { string } = PropTypes;

Details.propTypes = {
	name: string.isRequired,
};

export default Details;
