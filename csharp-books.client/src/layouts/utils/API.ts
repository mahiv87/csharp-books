/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState } from '@okta/okta-auth-js';
import { BookModel } from '../../models/BookModel';
import { ReviewModel } from '../../models/ReviewModel';

const baseAPIUrl = import.meta.env.VITE_API;

// Fetch books for Carousel
export const fetchBooks = async (query: string): Promise<BookModel[]> => {
	const baseUrl: string = `${baseAPIUrl}/books`;
	const url: string = `${baseUrl}${query}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Something went wrong...');
	}

	const responseJson = await response.json();
	const responseData = responseJson._embedded.books;

	const loadedBooks = responseData.map((book: BookModel) => ({
		id: book.id,
		title: book.title,
		author: book.author,
		description: book.description,
		copies: book.copies,
		copiesAvailable: book.copiesAvailable,
		category: book.category,
		img: book.img
	}));

	return loadedBooks;
};

// Fetch a single book by id
export const fetchBook = async (query: string): Promise<BookModel> => {
	const baseUrl: string = `${baseAPIUrl}/books`;
	const url: string = `${baseUrl}${query}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Something went wrong...');
	}

	const responseJson = await response.json();

	const singleBook: BookModel = {
		id: responseJson.id,
		title: responseJson.title,
		author: responseJson.author,
		description: responseJson.description,
		copies: responseJson.copies,
		copiesAvailable: responseJson.copiesAvailable,
		category: responseJson.category,
		img: responseJson.img
	};

	return singleBook;
};

// Fetch Reviews
export const fetchBookReviews = async (
	bookId: string
): Promise<ReviewModel[]> => {
	const url: string = `${baseAPIUrl}/reviews/search/findByBookId?bookId=${bookId}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Something went wrong...');
	}

	const responseJsonReviews = await response.json();
	const responseData = responseJsonReviews._embedded.reviews;

	const loadedReviews = responseData.map((review: ReviewModel) => ({
		id: review.id,
		userEmail: review.userEmail,
		date: review.date,
		rating: review.rating,
		book_id: review.bookId,
		reviewDescription: review.reviewDescription
	}));

	return loadedReviews;
};

// Fetch users current loans
export const fetchUserCurrentLoans = async (authState: AuthState | null) => {
	if (authState && authState.isAuthenticated) {
		const url = `${baseAPIUrl}/books/secure/currentloans`;
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authState.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const responseJson = await response.json();

		return responseJson;
	}
};

// Fetch a users current loan count
export const fetchUserCurrentLoansCount = async (
	authState: AuthState | null
) => {
	if (authState && authState.isAuthenticated) {
		const url = `${baseAPIUrl}/books/secure/currentloans/count`;
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authState.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};

		const responseCLC = await fetch(url, requestOptions);

		if (!responseCLC.ok) {
			throw new Error('Something went wrong');
		}

		const responseJsonCLC = await responseCLC.json();

		return responseJsonCLC;
	}
};

// Fetch to see if book is already checked out by user
export const fetchUserCheckedOutBook = async (
	authState: AuthState | null,
	bookId: string
): Promise<any> => {
	if (authState && authState.isAuthenticated) {
		const url = `${baseAPIUrl}/books/secure/ischeckedout/byuser?bookId=${bookId}`;
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authState.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};
		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const responseJson = await response.json();

		return responseJson;
	}
};

// Fetch to see if user has reviewed book
export const fetchUserReviewBook = async (
	authState: AuthState | null,
	bookId: string
): Promise<any> => {
	if (authState && authState.isAuthenticated) {
		const url = `${baseAPIUrl}/reviews/secure/user/book?bookId=${bookId}`;
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authState.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const responseJson = await response.json();

		return responseJson;
	}
};
