/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { BookModel } from '../../../models/BookModel';
import { useOktaAuth } from '@okta/okta-react';

import defaultImg from '../../../Images/BooksImages/book-luv2code-1000.png';

const ChangeBook: React.FC<{ book: BookModel; deleteBook: any }> = ({
	book,
	deleteBook
}) => {
	const { authState } = useOktaAuth();

	const [qty, setQty] = useState<number>(0);
	const [remaining, setRemaining] = useState<number>(0);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Updates the qty and remaining state variables when the book prop changes. Sets the initial values based on book.copies and book.copiesAvailable
	useEffect(() => {
		setQty(book.copies || 0);
		setRemaining(book.copiesAvailable || 0);
	}, [book.copies, book.copiesAvailable]);

	// Sends a request to increase the book's quantity by 1
	const increaseQty = async () => {
		const url = `${baseAPIUrl}/admin/secure/increase/book/quantity?bookId=${book.id}`;

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

		setQty(qty + 1);
		setRemaining(remaining + 1);
	};

	// Sends a request to decrease the book's quantity by 1
	const decreaseQty = async () => {
		const url = `${baseAPIUrl}/admin/secure/decrease/book/quantity?bookId=${book.id}`;

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

		setQty(qty - 1);
		setRemaining(remaining - 1);
	};

	// Sends a request to delete the book
	const delBook = async () => {
		const url = `${baseAPIUrl}/admin/secure/delete/book?bookId=${book.id}`;

		const requestOptions = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		deleteBook();
	};

	return (
		<div className="card lg:card-side md:w-2/3 md:mx-auto mx-5 my-5 shadow-xl">
			<figure className="lg:w-1/3 lg:mx-auto">
				{book.img ? (
					<img src={book.img} width="123" height="196" alt="Book" />
				) : (
					<img src={defaultImg} width="123" height="196" alt="Book" />
				)}
			</figure>

			<div className="card-body lg:w-2/3 lg:mx-auto">
				<h2 className="card-title font-bold text-2xl text-neutral-500">
					{book.title}
				</h2>
				<h4 className="text-lg italic text-neutral-500/80 font-semibold">
					{book.author}
				</h4>
				<p>{book.description}</p>

				<div className="mt-10 mb-3 md:w-1/3">
					<div className="flex justify-center items-center">
						<p className="text-xl text-neutral-500">
							Total Quantity: <b className="text-neutral-700">{qty}</b>
						</p>
					</div>
					<div className="flex justify-center items-center">
						<p className="text-xl text-neutral-500">
							Total Remaining: <b className="text-neutral-700">{remaining}</b>
						</p>
					</div>
				</div>

				<div className="mt-3">
					<div className="flex justify-end">
						<button
							className="btn bg-rose-500 border-rose-500 hover:bg-rose-500/80 hover:border-rose-500 text-white text-lg"
							onClick={delBook}
						>
							Delete
						</button>
					</div>
				</div>

				<button
					className="btn bg-main-color border-main-color hover:bg-main-color/80 hover:border-main-color text-white text-lg"
					onClick={increaseQty}
				>
					Add Quantity
				</button>
				<button
					className="btn bg-amber-500 border-amber-500 hover:bg-amber-500/80 hover:border-amber-500 text-white text-lg"
					onClick={decreaseQty}
				>
					Decrease Quantity
				</button>
			</div>
		</div>
	);
};

export default ChangeBook;
