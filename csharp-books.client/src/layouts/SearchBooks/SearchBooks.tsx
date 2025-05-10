import { useEffect, useState, useRef } from 'react';
import { BookModel } from '../../models/BookModel';
import Spinner from '../utils/Spinner';
import SearchBook from './components/SearchBook';
import Pagination from '../utils/Pagination';

const SearchBooks = () => {
	const [books, setBooks] = useState<BookModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [booksPerPage] = useState(5);
	const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [search, setSearch] = useState('');
	const [searchUrl, setSearchUrl] = useState('');
	const [categorySelection, setCategorySelection] = useState('Category');
	const [isOpen, setIsOpen] = useState(false);
	const detailsRef = useRef<HTMLDetailsElement>(null);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Fetch book details
	useEffect(() => {
		const fetchBooks = async () => {
			const baseUrl: string = `${baseAPIUrl}/books`;
			let url: string = '';

			if (searchUrl === '') {
				url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
			} else {
				const searchWithPage = searchUrl.replace(
					'<pageNumber>',
					`${currentPage - 1}`
				);
				url = baseUrl + searchWithPage;
			}

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
		window.scrollTo(0, 0);
	}, [currentPage, searchUrl]);

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

	const searchHandleChange = () => {
		setCurrentPage(1);
		if (search === '') {
			setSearchUrl('');
		} else {
			setSearchUrl(
				`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
			);
		}
		setCategorySelection('Category');
	};

	const categoryField = (value: string) => {
		setCurrentPage(1);
		if (
			value.toLowerCase() === 'fe' ||
			value.toLowerCase() === 'be' ||
			value.toLowerCase() === 'data' ||
			value.toLowerCase() === 'devops'
		) {
			setCategorySelection(value);
			setSearchUrl(
				`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`
			);
			setIsOpen(false);

			if (detailsRef.current) {
				detailsRef.current.removeAttribute('open');
			}
		} else {
			setCategorySelection('All');
			setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
			setIsOpen(false);

			if (detailsRef.current) {
				detailsRef.current.removeAttribute('open');
			}
		}
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const indexOfLastBook: number = currentPage * booksPerPage;
	const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
	const lastItem =
		booksPerPage * currentPage <= totalAmountOfBooks
			? booksPerPage * currentPage
			: totalAmountOfBooks;

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div>
			<div className="container mx-auto my-5">
				<div>
					<div className="flex flex-col md:flex-row justify-center items-center mt-5">
						<div className="w-1/2">
							<div className="flex flex-col md:flex-row justify-center items-center ">
								<input
									type="search"
									className="form-input w-80 h-12 text-neutral-500 text-lg mr-2 bg-white border border-solid border-teal-500 rounded-lg pl-2"
									placeholder="Search"
									aria-labelledby="Search"
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									onClick={() => searchHandleChange()}
									className="w-24 btn bg-teal-500 text-white border-solid border-teal-500 mt-2 md:mt-0 hover:bg-teal-500/80 hover:border-teal-500 hover:text-white"
								>
									Search
								</button>
							</div>
						</div>
						<div className="md:w-1/3 text-center mt-2 md:mt-0">
							<details
								className="dropdown"
								ref={detailsRef}
								onToggle={toggleDropdown}
							>
								<summary className="w-24 btn bg-teal-500 text-white border-solid border-teal-500 list-none hover:bg-teal-500/80 hover:text-white hover:border-teal-500">
									{categorySelection}
								</summary>
								<ul className="menu dropdown-content bg-gray-100 rounded-lg z-[1] w-52 p-2 absolute left-1/2 transform -translate-x-1/2 shadow-lg">
									<li onClick={() => categoryField('All')}>
										<a>All</a>
									</li>
									<li onClick={() => categoryField('fe')}>
										<a>Front End</a>
									</li>
									<li onClick={() => categoryField('be')}>
										<a>Back End</a>
									</li>
									<li onClick={() => categoryField('data')}>
										<a>Data</a>
									</li>
									<li onClick={() => categoryField('devops')}>
										<a>DevOps</a>
									</li>
								</ul>
							</details>
						</div>
					</div>

					{totalAmountOfBooks > 0 ? (
						<>
							<div className="text-neutral-500 font-semibold mt-3">
								<h5>Number of results: ({totalAmountOfBooks})</h5>
							</div>
							<p className="flex justify-end text-neutral-500">
								{indexOfFirstBook + 1} - {lastItem} of {totalAmountOfBooks}{' '}
								books
							</p>
							{books.map((book) => (
								<SearchBook book={book} key={book.id} />
							))}
						</>
					) : (
						<div className="container flex flex-col justify-start items-center mt-20 mx-5">
							<h3 className="text-3xl font-semibold text-neutral-600">
								Can't find what you're looking for?
							</h3>
							<a
								href="#"
								type="button"
								className="btn bg-neutral-500 border-neutral-500 mt-4 hover:bg-neutral-500/80 hover:border-neutral-500 text-white"
							>
								Library Services
							</a>
						</div>
					)}
				</div>
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						paginate={paginate}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchBooks;
