import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'styles/normalize.css';

import sitemap from './sitemap';

// Dynamic basename so sitemap works when hosted at github-pages URL
const basename = document.querySelector('base')?.getAttribute('href') ?? '/';

const router = createBrowserRouter(sitemap, { basename });
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);
