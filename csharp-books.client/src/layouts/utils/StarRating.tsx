const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	const bookRating = rating;

	const ratingValues = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

	return (
		<div className="rating rating-md rating-half">
			{ratingValues.map((value) => (
				<input
					key={value}
					type="radio"
					name="rating-10"
					className={
						value === 0
							? 'rating-hidden'
							: `mask mask-star-2 ${
									value % 1 === 0.5 ? 'mask-half-1' : 'mask-half-2'
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  } bg-yellow-400 pointer-events-none`
					}
					data-type={value}
					disabled
					defaultChecked={bookRating === value}
				/>
			))}
		</div>
	);
};

export default StarRating;
