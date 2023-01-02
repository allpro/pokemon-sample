import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	// createHashRouter,
	RouterProvider,
} from 'react-router-dom'

import 'styles/normalize.css';

import sitemap from './sitemap';

// Dynamic basename so sitemap works when hosted at github-pages URL
const basename = document.querySelector('base')?.getAttribute('href') || undefined;

// When published in a sub-folder, use a hash-router so pages can refresh correctly
// const createRouter = basename.length < 2 ? createBrowserRouter : createHashRouter;
const createRouter = createBrowserRouter;

const router = createRouter(sitemap, { basename });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);
