import { useEffect, useState } from 'react';
import { ReviewModel } from '../../../models/ReviewModel';
import Spinner from '../../utils/Spinner';
import Pagination from '../../utils/Pagination';
import Review from '../../utils/Review';

const ReviewListPage = () => {
	const [reviews, setReviews] = useState<ReviewModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewsPerPage] = useState(5);
	const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const baseAPIUrl = import.meta.env.VITE_API;

	const bookId = window.location.pathname.split('/')[2];

	// Fetches reviews from the API based on the bookId and currentPage
	useEffect(() => {
		const fetchBookReviews = async () => {
			const url: string = `${baseAPIUrl}/reviews/search/findByBookId?bookId=${bookId}&page=${
				currentPage - 1
			}&size=${reviewsPerPage}`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			const responseJson = await response.json();

			const responseData = responseJson._embedded.reviews;

			setTotalAmountOfReviews(responseJson.page.totalElements);
			setTotalPages(responseJson.page.totalPages);

			const loadedReviews = responseData.map((review: ReviewModel) => ({
				id: review.id,
				userEmail: review.userEmail,
				date: review.date,
				rating: review.rating,
				book_id: review.bookId,
				reviewDescription: review.reviewDescription
			}));

			setReviews(loadedReviews);
			setIsLoading(false);
		};

		fetchBookReviews().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, [currentPage]);

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

	const indexOfLastReview: number = currentPage * reviewsPerPage;
	const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

	const lastItem =
		reviewsPerPage * currentPage <= totalAmountOfReviews
			? reviewsPerPage * currentPage
			: totalAmountOfReviews;

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="container mx-auto m-5 p-2">
			<div className="flex justify-between mb-5">
				<h3 className="text-xl font-semibold mb-2">
					Comments: ({reviews.length})
				</h3>
				<p className="">
					{indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews}{' '}
					reviews
				</p>
			</div>

			<div className="flex flex-col">
				{reviews.map((review) => (
					<Review review={review} key={review.id} />
				))}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					paginate={paginate}
				/>
			)}
		</div>
	);
};

export default ReviewListPage;
