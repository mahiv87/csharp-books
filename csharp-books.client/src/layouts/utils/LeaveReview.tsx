/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import StarRating from './StarRating';

// Allows users to leave a review for a book
const LeaveReview: React.FC<{ submitReview: any }> = ({ submitReview }) => {
	const [starInput, setStarInput] = useState(0);
	const [displayInput, setDisplayInput] = useState(false);
	const [reviewDescription, setReviewDescription] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const detailsRef = useRef<HTMLDetailsElement>(null);

	// Sets the star rating and manages the display of the review form
	const starValue = (value: number) => {
		setStarInput(value);
		// console.log('rating', starInput);
		setIsOpen(false);

		if (detailsRef.current) {
			detailsRef.current.removeAttribute('open');
		}

		setDisplayInput(true);
	};

	// Toggles the dropdown for selecting star ratings
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<details
				className="dropdown mb-2"
				ref={detailsRef}
				onToggle={toggleDropdown}
			>
				<summary className="w-full btn border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white text-lg">
					Leave a review?
				</summary>
				<ul
					id="submitReviewRating"
					className="menu dropdown-content bg-gray-100 rounded-lg z-[1] w-52 p-2 absolute left-1/2 transform -translate-x-1/2 shadow-lg"
				>
					<li onClick={() => starValue(0)}>
						<p>0</p>
					</li>
					<li onClick={() => starValue(0.5)}>
						<p>0.5</p>
					</li>
					<li onClick={() => starValue(1)}>
						<p>1</p>
					</li>
					<li onClick={() => starValue(1.5)}>
						<p>1.5</p>
					</li>
					<li onClick={() => starValue(2)}>
						<p>2</p>
					</li>
					<li onClick={() => starValue(2.5)}>
						<p>2.5</p>
					</li>
					<li onClick={() => starValue(3)}>
						<p>3</p>
					</li>
					<li onClick={() => starValue(3.5)}>
						<p>3.5</p>
					</li>
					<li onClick={() => starValue(4)}>
						<p>4</p>
					</li>
					<li onClick={() => starValue(4.5)}>
						<p>4.5</p>
					</li>
					<li onClick={() => starValue(5)}>
						<p>5</p>
					</li>
				</ul>
			</details>
			<StarRating rating={starInput} />

			{displayInput && (
				<form method="POST" action="#" className="mt-3">
					<label htmlFor="ReviewDescription" className="sr-only">
						Review Description
					</label>

					<div className="overflow-hidden">
						<textarea
							id="ReviewDescription"
							className="w-full resize-none bg-white border-2 border-gray-200 pl-1 align-top sm:text-sm"
							rows={4}
							placeholder="Leave a review..."
							onChange={(e) => setReviewDescription(e.target.value)}
						></textarea>

						<div className="flex items-center justify-end gap-2 py-3">
							<button
								onClick={() => submitReview(starInput, reviewDescription)}
								type="button"
								className="rounded bg-orange-400 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-500"
							>
								Submit Review
							</button>
						</div>
					</div>
				</form>
			)}
		</>
	);
};

export default LeaveReview;
