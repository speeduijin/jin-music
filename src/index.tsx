import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import Layout from './Layout';
import Login from './routes/Login';
import Root from './routes/Root';
import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Root /> }],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
