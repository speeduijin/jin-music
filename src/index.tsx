import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import Default from './layouts/Default';
import Root from './routes/Root';
import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const isProduction = process.env.NODE_ENV === 'production';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [{ index: true, element: <Root /> }],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

root.render(
  isProduction ? (
    <RouterProvider router={router} />
  ) : (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  ),
);
