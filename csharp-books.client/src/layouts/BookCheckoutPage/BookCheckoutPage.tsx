import { useEffect, useRef, useState } from 'react';
import { BookModel } from '../../models/BookModel';
import { ReviewModel } from '../../models/ReviewModel';
import {
	fetchBook,
	fetchBookReviews,
	fetchUserCheckedOutBook,
	fetchUserCurrentLoansCount,
	fetchUserReviewBook
} from '../utils/API';
import Spinner from '../utils/Spinner';
import defaultBook from '../../Images/BooksImages/book-luv2code-1000.png';
import StarRating from '../utils/StarRating';
import CheckoutAndReview from './CheckoutAndReview';
import LatestReviews from './LatestReviews';
import { useOktaAuth } from '@okta/okta-react';
import { ReviewRequestModel } from '../../models/ReviewRequestModel';

const BookCheckoutPage = () => {
	const [book, setBook] = useState<BookModel>();
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [rating, setRating] = useState(0);
	const [reviews, setReviews] = useState<ReviewModel[]>([]);
	const [currentLoansCount, setCurrentLoansCount] = useState(0);
	const [isCheckedOut, setIsCheckedOut] = useState(false);
	const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);

	const baseAPIUrl = import.meta.env.VITE_API;
	console.log('BookCheckoutPage ~ baseAPIUrl:', baseAPIUrl);

	const { authState } = useOktaAuth();

	const bookId = window.location.pathname.split('/')[2];

	const weightedStarReviews = useRef<number>(0);

	// Fetch book details
	useEffect(() => {
		const query = `/${bookId}`;

		fetchBook(query)
			.then((singleBook) => {
				setBook(singleBook);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, [bookId, isCheckedOut]);

	// Fetch book reviews
	useEffect(() => {
		fetchBookReviews(bookId)
			.then((reviews) => {
				let totalRating = 0;
				reviews.forEach((review) => {
					totalRating += review.rating;
					// console.log(totalRating);
				});
				weightedStarReviews.current = totalRating;

				if (reviews.length > 0) {
					const avgRating = totalRating / reviews.length;
					const rounded = Math.floor(avgRating * 2) / 2;
					setRating(Number(rounded));
				}

				setReviews(reviews);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, [bookId, isAlreadyReviewed]);

	// Fetch user review status
	useEffect(() => {
		fetchUserReviewBook(authState, bookId)
			.then((review) => {
				setIsAlreadyReviewed(review);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, [authState, bookId]);

	// Fetch users current loans count
	useEffect(() => {
		const clcAuthState = authState;

		if (clcAuthState && clcAuthState.isAuthenticated) {
			fetchUserCurrentLoansCount(clcAuthState)
				.then((count) => {
					setCurrentLoansCount(count);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					setHttpError(error.message);
				});
		} else {
			setCurrentLoansCount(0);
			setIsLoading(false);
		}
	}, [authState, isCheckedOut]);

	// Fetch user checkout status
	useEffect(() => {
		fetchUserCheckedOutBook(authState, bookId)
			.then((book) => {
				setIsCheckedOut(book);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, [authState, bookId]);

	if (isLoading) {
		return <Spinner />;
	}

	if (httpError) {
		return (
			<div className="container mx-auto my-5" style={{ height: 550 }}>
				<p>{httpError}</p>
			</div>
		);
	}

	// Handles the book checkout process
	const checkoutBook = async () => {
		const url = `${baseAPIUrl}/books/secure/checkout?bookId=${book?.id}`;
		const requestOptions = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url, requestOptions);
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		setIsCheckedOut(true);
	};

	// Handles the submission of a new review
	const submitReview = async (starInput: number, reviewDescription: string) => {
		let bookId: number = 0;

		if (book?.id) {
			bookId = book.id;
		}

		const reviewRequestModel = new ReviewRequestModel(
			starInput,
			bookId,
			reviewDescription
		);
		const url = `${baseAPIUrl}/reviews/secure`;
		const requestOptions = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(reviewRequestModel)
		};

		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		setIsAlreadyReviewed(true);
	};

	return (
		<div>
			<div className="container flex flex-col md:mx-auto">
				<div className="flex md:flex-row flex-col md:justify-evenly md:items-start justify-center items-center mt-5">
					<div className="sm:w-1/6 md:w-1/6">
						{book?.img ? (
							<img src={book.img} width="226" height="349" alt="book image" />
						) : (
							<img
								src={defaultBook}
								width="226"
								height="349"
								alt="defaut book image"
							/>
						)}
					</div>

					<div className="container w-11/12 md:w-1/3 mt-4 md:mt-0">
						<div className="ml-2">
							<h2 className="text-3xl font-semibold">{book?.title}</h2>
							<h5 className="text-xl">{book?.author}</h5>
							<p className="text-lg my-4">{book?.description}</p>
							<StarRating rating={rating} />
						</div>
					</div>
					<CheckoutAndReview
						book={book}
						currentLoansCount={currentLoansCount}
						isCheckedOut={isCheckedOut}
						checkoutBook={checkoutBook}
						isAlreadyReviewed={isAlreadyReviewed}
						submitReview={submitReview}
					/>
				</div>
				<div className="divider "></div>
				<LatestReviews reviews={reviews} bookId={book?.id} />
			</div>
		</div>
	);
};

export default BookCheckoutPage;
