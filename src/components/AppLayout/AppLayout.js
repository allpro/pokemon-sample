import React from 'react';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import Filterbar from 'components/Filterbar';
import List from 'components/List';

import styles from './styles';

const useStyles = createUseStyles(styles);


function AppLayout() {
	const classes = useStyles();

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
