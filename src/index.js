import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'styles/normalize.css';

import sitemap from './sitemap';

const router = createBrowserRouter(sitemap);
const root = ReactDOM.createRoot(document.getElementById('root'));

// Dynamic basename so sitemap works when hosted at github-pages URL
const basename = document.querySelector('base')?.getAttribute('href') ?? '/';

root.render(
  <RouterProvider basename={basename} router={router} />
);
