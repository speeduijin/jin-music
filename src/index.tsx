import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import Default from './layouts/Default';
import Auth from './layouts/Auth';
import Root from './routes/Root';
import Login from './routes/Login';
import Join from './routes/Join';
import Chart, { chartLoader } from './components/Chart';
import Error from './components/Error';
import { isNotLoggedIn } from './loaders/auth';
import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Chart />,
            errorElement: <Error />,
            loader: chartLoader,
          },
        ],
      },
    ],
  },
  {
    element: <Auth />,
    errorElement: <Error />,
    loader: isNotLoggedIn,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/join', element: <Join /> },
    ],
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
