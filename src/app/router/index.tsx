import { lazy } from 'react';

import { createBrowserRouter } from 'react-router';

import { AppLayout, AuthLayout, Layout } from '#app/ui';
import { ROUTE_NAMES } from '#shared/config';

import ResourcePage from '#pages/resource';

const HomePage = lazy(() => import('#pages/home'));
const ProjectsPage = lazy(() => import('#pages/projects'));
const ProjectPage = lazy(() => import('#pages/project'));
const EmployeesPage = lazy(() => import('#pages/employees'));
const EmployeePage = lazy(() => import('#pages/employee'));
const SignInPage = lazy(() => import('#pages/sign-in'));
const SignUpPage = lazy(() => import('#pages/sign-up'));
const NotFoundPage = lazy(() => import('#pages/not-found'));

export const router = createBrowserRouter([
	{
		path: ROUTE_NAMES.HOME,
		element: <Layout />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: ROUTE_NAMES.PROJECTS, element: <ProjectsPage /> },
					{ path: ROUTE_NAMES.PROJECT, element: <ProjectPage /> },
					{ path: ROUTE_NAMES.EMPLOYEES, element: <EmployeesPage /> },
					{ path: ROUTE_NAMES.EMPLOYEE, element: <EmployeePage /> },
					{ path: ROUTE_NAMES.RESOURCE, element: <ResourcePage /> },
				],
			},
			{
				path: ROUTE_NAMES.AUTH,
				element: <AuthLayout />,
				children: [
					{ path: ROUTE_NAMES.SIGN_IN, element: <SignInPage /> },
					{ path: ROUTE_NAMES.SIGN_UP, element: <SignUpPage /> },
				],
			},
			{ path: ROUTE_NAMES.NOT_FOUND, element: <NotFoundPage /> },
		],
	},
]);
