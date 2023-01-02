import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createHashRouter,
	RouterProvider,
} from 'react-router-dom'

import 'styles/normalize.css';

import sitemap from './sitemap';

// Dynamic basename so sitemap works when hosted at github-pages URL
const basename = document.querySelector('base')?.getAttribute('href') || undefined;
// if (basename) basename = `${basename}/`; // Needed?

// When published on gh-pages, use a HashRouter so child-paths can refreshed without a 404 error
// TODO: Implement HashRouter when the React Router bug is fixed!
const createRouter = false && basename ? createHashRouter : createBrowserRouter;

const router = createRouter(sitemap, { basename });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);
