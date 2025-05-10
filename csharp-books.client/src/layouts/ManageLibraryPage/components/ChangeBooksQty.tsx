import { useEffect, useState } from 'react';
import { BookModel } from '../../../models/BookModel';
import Spinner from '../../utils/Spinner';
import Pagination from '../../utils/Pagination';
import ChangeBook from './ChangeBook';

const ChangeBooksQty = () => {
	const [books, setBooks] = useState<BookModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [booksPerPage] = useState(5);
	const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [bookDelete, setBookDelete] = useState(false);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Fetch book details
	useEffect(() => {
		const fetchBooks = async () => {
			const url: string = `${baseAPIUrl}/books?page=${
				currentPage - 1
			}&size=${booksPerPage}`;

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

			const responseJson = await response.json();
			const responseData = responseJson._embedded.books;

			setTotalAmountOfBooks(responseJson.page.totalElements);
			setTotalPages(responseJson.page.totalPages);

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

			setBooks(loadedBooks);
			setIsLoading(false);
		};
		fetchBooks().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, [currentPage, bookDelete]);

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

	const indexOfLastBook: number = currentPage * booksPerPage;
	const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
	const lastItem =
		booksPerPage * currentPage <= totalAmountOfBooks
			? booksPerPage * currentPage
			: totalAmountOfBooks;

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const delBook = () => setBookDelete(!bookDelete);

	return (
		<div className="container mt-5">
			{totalAmountOfBooks > 0 ? (
				<>
					<div className="mt-3">
						<h3>Number of results: ({totalAmountOfBooks}) </h3>
					</div>
					<p>
						{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} books:
					</p>

					{books.map((book) => (
						<ChangeBook book={book} key={book.id} deleteBook={delBook} />
					))}
				</>
			) : (
				<h5>Add a book before changing quantity</h5>
			)}

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

export default ChangeBooksQty;
