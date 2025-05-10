import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import Spinner from '../../utils/Spinner';
import { HistoryModel } from '../../../models/HistoryModel';
import { Link } from 'react-router-dom';
import Pagination from '../../utils/Pagination';

export const HistoryPage = () => {
	const { authState } = useOktaAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [histories, setHistories] = useState<HistoryModel[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Fetch books user has previously checked out
	useEffect(() => {
		const fetchUserHistory = async () => {
			if (authState && authState.isAuthenticated) {
				const url = `${baseAPIUrl}/histories/search/findBooksByUserEmail?userEmail=${
					authState.accessToken?.claims.sub
				}&page=${currentPage - 1}&size=5`;

				const requestOptions = {
					method: 'Get',
					headers: {
						'Content-Type': 'application/json'
					}
				};

				const response = await fetch(url, requestOptions);

				if (!response.ok) {
					throw new Error('Something went wrong');
				}

				const responseJson = await response.json();

				setHistories(responseJson._embedded.histories);
				setTotalPages(responseJson.page.totalPages);
			}
			setIsLoading(false);
		};
		fetchUserHistory().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, [authState, currentPage]);

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

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="mt-2 text-neutral-500">
			{histories.length > 0 ? (
				<>
					<h3 className="font-bold text-2xl mb-5">Recent History:</h3>

					{histories.map((history) => (
						<div key={history.id}>
							<div className="card flex my-3 md:w-2/3 container mx-auto shadow-xl">
								<div className="flex flex-col md:flex-row justify-center items-center gap-0">
									<div className="flex flex-col w-1/2 md:w-1/4 justify-center items-center">
										<div className="block">
											{history.img ? (
												<img
													src={history.img}
													width="123"
													height="196"
													alt="Book"
												/>
											) : (
												<img
													src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
													width="123"
													height="196"
													alt="Book"
												/>
											)}
										</div>
									</div>

									<div className="flex flex-col md:w-3/4">
										<div className="card-body">
											<h4 className="font-semibold text-xl">{history.title}</h4>
											<h5 className="italic text-lg ">{history.author}</h5>
											<p>{history.description}</p>
											<hr />
											<p className="font-semibold">
												<span className="text-main-color">Checked out on:</span>{' '}
												{history.checkoutDate}
											</p>
											<p className="font-semibold">
												<span className=" text-main-color">Returned on:</span>{' '}
												{history.returnedDate}{' '}
											</p>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>
					))}
				</>
			) : (
				<>
					<h3 className="my-3">Currently no history: </h3>
					<Link
						to={'search'}
						className="btn border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white"
					>
						Search for a new book
					</Link>
				</>
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
