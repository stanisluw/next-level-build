import { lazy } from 'react';

import { createBrowserRouter } from 'react-router';

import { ROUTE_NAMES } from '#shared/config';

const HomePage = lazy(() => import('#pages/home'));

export const router = createBrowserRouter([{ path: ROUTE_NAMES.HOME, element: <HomePage /> }]);
