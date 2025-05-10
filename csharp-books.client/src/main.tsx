import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './layouts/HomePage/Homepage.tsx';
import SearchBooks from './layouts/SearchBooks/SearchBooks.tsx';
import ErrorPage from './layouts/ErrorPage/ErrorPage.tsx';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage.tsx';
import LoginWidget from './auth/LoginWidget.jsx';
import { oktaConfig } from './lib/oktaConfig.ts';
import { LoginCallback } from '@okta/okta-react';
import ReviewListPage from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage.tsx';
import UsersBooksPage from './layouts/UsersBooksPage/UsersBooksPage.tsx';
import SecureRoute from './layouts/utils/SecureRoute.tsx';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage.tsx';
import ManageLibraryPage from './layouts/ManageLibraryPage/ManageLibraryPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Homepage />
			},
			{
				path: 'reviewlist/:bookId',
				element: <ReviewListPage />
			},
			{
				path: 'search',
				element: <SearchBooks />
			},
			{
				path: 'checkout/:bookId',
				element: <BookCheckoutPage />
			},
			{
				path: 'shelf',
				element: (
					<SecureRoute>
						<UsersBooksPage />
					</SecureRoute>
				)
			},
			{
				path: 'messages',
				element: (
					<SecureRoute>
						<MessagesPage />
					</SecureRoute>
				)
			},
			{
				path: 'admin',
				element: (
					<SecureRoute>
						<ManageLibraryPage />
					</SecureRoute>
				)
			},
			{
				path: 'login',
				element: <LoginWidget config={oktaConfig} />
			},
			{
				path: 'login/callback',
				element: <LoginCallback />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
