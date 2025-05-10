/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOktaAuth } from '@okta/okta-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AddBookRequest } from '../../../models/AddBookRequest';

const AddNewBook = () => {
	const { authState } = useOktaAuth();
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [description, setDescription] = useState('');
	const [copies, setCopies] = useState(0);
	const [category, setCategory] = useState('Category');
	const [image, setImage] = useState<any>(null);
	const [displayWarning, setDisplayWarning] = useState(false);
	const [displaySuccess, setDisplaySuccess] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Sets the selected category and toggles the dropdown menu
	const categoryField = (value: string) => {
		setCategory(value);
		toggleDropdown();
	};

	// Toggles the visibility of the category dropdown menu
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// Converts the selected image file to a base64 encoded string
	const convertImages = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			getBase64(e.target.files[0]);
		}
	};

	// Reads the file as a base64 encoded string and sets the image state
	const getBase64 = (file: File) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = function () {
			setImage(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error', error);
		};
	};

	const handleClear = () => {
		setTitle('');
		setAuthor('');
		setDescription('');
		setCopies(0);
		setCategory('Category');
		setImage(null);
	};

	// Handles form submission by sending a POST request to the API with the book details
	const submitNewBook = async (e: FormEvent) => {
		e.preventDefault();
		const url = `${baseAPIUrl}/admin/secure/add/book`;

		if (
			authState?.isAuthenticated &&
			title !== '' &&
			author !== '' &&
			category !== 'Category' &&
			description !== '' &&
			copies >= 0
		) {
			const book: AddBookRequest = new AddBookRequest(
				title,
				author,
				description,
				copies,
				category
			);
			book.img = image;

			const requestOptions = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${authState.accessToken?.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(book)
			};

			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			setTitle('');
			setAuthor('');
			setDescription('');
			setCopies(0);
			setCategory('Category');
			setImage(null);
			setDisplayWarning(false);
			setDisplaySuccess(true);
		} else {
			setDisplayWarning(true);
			setDisplaySuccess(false);
		}
	};

	return (
		<div className="container max-w-7xl mx-auto my-5">
			<div className="card">
				<h3 className="text-2xl font-semibold">Add a new book</h3>

				<div className="card-body">
					<form method="POST" className="mb-0 mt-8 space-y-4">
						{displayWarning && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								All fields must be filled out
							</div>
						)}
						{displaySuccess && (
							<div
								className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
								role="alert"
							>
								Book added successfully
							</div>
						)}

						<div className="flex justify-evenly items-center">
							<div className="md:w-1/2">
								<label htmlFor="title" className="">
									Title
								</label>

								<div className="relative">
									<input
										id="title"
										type="text"
										className="w-11/12 rounded-md bg-gray-200 border-gray-200 p-3 text-md text-black shadow-sm"
										onChange={(e) => setTitle(e.target.value)}
										value={title}
									/>
								</div>
							</div>

							<div className="md:w-1/3">
								<label htmlFor="author" className="">
									Author
								</label>

								<div className="relative">
									<input
										id="author"
										type="text"
										className="w-full rounded-md bg-gray-200 border-gray-200 p-3 text-md text-black shadow-sm"
										onChange={(e) => setAuthor(e.target.value)}
										value={author}
									/>
								</div>
							</div>

							<div className="md:w-1/5 text-center mt-2 md:mt-0">
								<details className="dropdown" onToggle={toggleDropdown}>
									<summary className="w-24 btn bg-teal-500 text-white border-solid border-teal-500 list-none hover:bg-teal-500/80 hover:text-white hover:border-teal-500">
										{category}
									</summary>
									<ul className="menu dropdown-content bg-gray-100 rounded-lg z-[1] w-52 p-2 absolute left-1/2 transform -translate-x-1/2 shadow-lg">
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

						<div>
							<label htmlFor="question" className="">
								Description
							</label>

							<div className="overflow-hidden">
								<textarea
									id="question"
									className="w-full resize-none border-x-0 border-t-0 bg-gray-200 border-gray-200 text-black p-4 align-top sm:text-sm"
									rows={4}
									onChange={(e) => setDescription(e.target.value)}
									value={description}
								></textarea>
							</div>
						</div>

						<div className="md:1/4 mb-3">
							<label htmlFor="copies">Copies</label>

							<div className="relative">
								<input
									id="copies"
									name="Copies"
									type="number"
									className="rounded-md bg-gray-200 border-gray-200 p-3 text-md text-black shadow-sm"
									onChange={(e) => setCopies(Number(e.target.value))}
									value={copies}
									required
								/>
							</div>
						</div>

						<div className="relative">
							<label className="block">
								<span className="sr-only">Choose profile photo</span>
								<input
									type="file"
									className="block text-sm text-slate-500 file:mt-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
									onChange={(e) => convertImages(e)}
								/>
							</label>
						</div>

						<div className="flex items-center justify-end gap-2 py-3">
							<button
								type="button"
								className="rounded bg-amber-200 px-3 py-1.5 text-sm font-medium text-amber-700 hover:text-amber-600"
								onClick={handleClear}
							>
								Clear
							</button>
						</div>

						<div className="flex items-center justify-center">
							<button
								type="submit"
								className="inline-block w-1/2 btn border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white"
								onClick={submitNewBook}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddNewBook;
