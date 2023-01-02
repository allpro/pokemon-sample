import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import Filterbar from 'components/Filterbar';
import List from 'components/List';

import styles from './styles';

const useStyles = createUseStyles(styles);


function AppLayout() {
	const classes = useStyles();
	const navigate = useNavigate();
	const { hash } = window.location;

	/**
	 * Hack to handle page refreshes on github-pages.
	 * @see related script in 404.html
	 */
	useEffect(() => {
		if (!hash) return;
		const path = [window.location.pathname.replace(/\/$/, ''), hash.slice(1)].join('/');
		navigate(path, { replace: true });
	}, [hash, navigate]);

	if (hash) return null;

	return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        Pokemon App
      </header>

			<Filterbar />

			<main className={classes.main}>
				<List />
				<Outlet />
			</main>
    </div>
  );
}

export default AppLayout;
