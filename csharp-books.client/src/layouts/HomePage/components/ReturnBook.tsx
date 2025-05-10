import { Link } from 'react-router-dom';
import { BookModel } from '../../../models/BookModel';
import bookImg from './../../../Images/BooksImages/book-luv2code-1000.png';

const ReturnBook: React.FC<{ book: BookModel }> = ({ book }) => {
	return (
		<div className="flex flex-col justify-center items-center">
			{book.img ? (
				<img src={book.img} className="w-1/2" alt="Image of book" />
			) : (
				<img src={bookImg} className="w-1/2" alt="Image of book" />
			)}
			<h6 className="mt-2">{book.title}</h6>
			<p>{book.author}</p>
			<Link
				to={`checkout/${book.id}`}
				className="main-color text-white py-3 px-6 my-2 text-lg rounded-lg hover:bg-teal-500/75"
			>
				Reserve
			</Link>
		</div>
	);
};

export default ReturnBook;
