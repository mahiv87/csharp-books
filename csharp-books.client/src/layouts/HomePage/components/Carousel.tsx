import { useEffect, useState } from 'react';
import ReturnBook from './ReturnBook';
import { BookModel } from '../../../models/BookModel';
import Spinner from '../../utils/Spinner';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../utils/API';

const Carousel = () => {
	const [books, setBooks] = useState<BookModel[]>([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);

	// Fetch book details
	useEffect(() => {
		const query = '?page=0size=9';
		fetchBooks(query)
			.then((loadedBooks) => {
				setBooks(loadedBooks);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, []);

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

	// Handles previous page action
	const handlePrevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
	};

	// Handles next page action
	const handleNextSlide = () => {
		setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
	};

	// Set books per slide
	const booksPerSlide = 3;
	const slides = [
		books.slice(0, booksPerSlide),
		books.slice(booksPerSlide, booksPerSlide * 2),
		books.slice(booksPerSlide * 2, booksPerSlide * 3)
	];

	return (
		<div
			className="container flex flex-col w-full mx-auto justify-center items-center my-10"
			style={{ height: 600 }}
		>
			<div className="homepage-carousel-title text-center pb-4">
				<h3 className="text-2xl text-neutral-900 pb-4">
					Find your next "I stayed up too late reading" book
				</h3>
			</div>

			<div className="carousel rounded-box w-11/12 hidden md:flex">
				{slides.map((slideBooks, index) => (
					<div
						key={index}
						className={`carousel-item relative w-full justify-center items-center ${
							index === currentSlide ? 'flex' : 'hidden'
						}`}
					>
						{slideBooks.map((book) => (
							<ReturnBook book={book} key={book.id} />
						))}
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between text-center">
							<a
								href="#"
								className="text-xl text-neutral-500 hover:text-neutral-500/50"
								onClick={(e) => {
									e.preventDefault();
									handlePrevSlide();
								}}
							>
								❮
							</a>
							<a
								href="#"
								className="text-xl text-neutral-500 hover:text-neutral-500/50"
								onClick={(e) => {
									e.preventDefault();
									handleNextSlide();
								}}
							>
								❯
							</a>
						</div>
					</div>
				))}
			</div>

			{/* Single Book View */}
			<div className="carousel rounded-box w-11/12 md:hidden">
				{books.slice(0, 3).map((book, index) => (
					<div
						key={index}
						className={`carousel-item relative w-full justify-center items-center ${
							index === currentSlide ? 'block' : 'hidden'
						}`}
					>
						<ReturnBook book={book} key={book.id} />
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between text-center">
							<a
								href="#"
								className="text-xl text-neutral-500 hover:text-neutral-500/50"
								onClick={(e) => {
									e.preventDefault();
									handlePrevSlide();
								}}
							>
								❮
							</a>
							<a
								href="#"
								className="text-xl text-neutral-500 hover:text-neutral-500/50"
								onClick={(e) => {
									e.preventDefault();
									handleNextSlide();
								}}
							>
								❯
							</a>
						</div>
					</div>
				))}
			</div>

			<div className="homepage-carousel-title mt-4">
				<Link
					className="py-3 px-6 text-lg border border-solid rounded-lg hover:bg-neutral-500/50 hover:text-white"
					to="/search"
				>
					View More
				</Link>
			</div>
		</div>
	);
};

export default Carousel;
