import { ReviewModel } from '../../models/ReviewModel';
import StarRating from './StarRating';

const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
	const date = new Date(review.date);

	const longMonth = date.toLocaleString('en-us', { month: 'long' });
	const day = date.getDate();
	const year = date.getFullYear();

	const fullDate = `${longMonth} ${day}, ${year} `;

	return (
		<div>
			<div className="sm:w-2/3">
				<h5 className="font-semibold">{review.userEmail}</h5>
				<div className="flex justify-between items-center md:w-1/3">
					<div className="italic">{fullDate}</div>
					<div>
						<StarRating rating={review.rating} />
					</div>
				</div>
				<div className="mt-2">
					<p>{review.reviewDescription}</p>
				</div>
			</div>
			<div className="divider"></div>
		</div>
	);
};

export default Review;
