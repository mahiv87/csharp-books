import { Link } from 'react-router-dom';
import { ReviewModel } from '../../models/ReviewModel';
import Review from '../utils/Review';

const LatestReviews: React.FC<{
	reviews: ReviewModel[];
	bookId: number | undefined;
}> = ({ reviews, bookId }) => {
	return (
		<div className="mt-3 mx-3 md:flex md:mt-5">
			<div className="sm:w-1/6 md:mx-3 mb-3">
				<h2 className="text-3xl font-semibold">Latest Reviews:</h2>
			</div>
			<div className="sm:w-5/6">
				{reviews.length > 0 ? (
					<>
						{reviews.slice(0, 3).map((review) => (
							<Review review={review} key={review.id}></Review>
						))}

						<div className="m-3">
							<Link
								to={`/reviewlist/${bookId}`}
								type="button"
								className="btn bg-neutral-500 border-neutral-500 hover:bg-neutral-500/80 hover:border-neutral-500/80 text-white"
							>
								Reach all reviews
							</Link>
						</div>
					</>
				) : (
					<div className="m-3">
						<p className="font-light text-lg my-4">
							There are currently no reviews for this book.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default LatestReviews;
