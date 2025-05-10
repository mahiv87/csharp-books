import { useOktaAuth } from '@okta/okta-react';
import { FormEvent, useState } from 'react';
import { MessageModel } from '../../../models/MessageModel';

export const PostMessage = () => {
	const { authState } = useOktaAuth();
	const [title, setTitle] = useState('');
	const [question, setQuestion] = useState('');
	const [displayWarning, setDisplayWarning] = useState(false);
	const [displaySuccess, setDisplaySuccess] = useState(false);

	const baseAPIUrl = import.meta.env.VITE_API;

	const submitQuestion = async (e: FormEvent) => {
		e.preventDefault();
		const url = `${baseAPIUrl}/messages/secure/add/message`;

		if (authState?.isAuthenticated && title !== '' && question !== '') {
			const messageRequestModel: MessageModel = new MessageModel(
				title,
				question
			);

			const requestOptions = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${authState.accessToken?.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(messageRequestModel)
			};

			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			setTitle('');
			setQuestion('');
			setDisplayWarning(false);
			setDisplaySuccess(true);
		} else {
			setDisplayWarning(true);
			setDisplaySuccess(false);
		}
	};

	const handleClear = () => {
		setTitle('');
		setQuestion('');
	};

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl text-neutral-500">
					Ask our team a question!
				</h1>
			</div>

			<form method="POST" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
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
						Question successfully submitted
					</div>
				)}

				<div>
					<label htmlFor="title" className="sr-only">
						Title
					</label>

					<div className="relative">
						<input
							id="title"
							type="text"
							className="w-full rounded-md bg-gray-200 border-gray-200 p-4 pr-12 text-md text-black shadow-sm"
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
						/>
					</div>
				</div>

				<div>
					<label htmlFor="question" className="sr-only">
						Question
					</label>

					<div className="overflow-hidden">
						<textarea
							id="question"
							className="w-full resize-none border-x-0 border-t-0 bg-gray-200 border-gray-200 text-black p-4 align-top sm:text-sm"
							rows={4}
							placeholder="Enter question or message here..."
							onChange={(e) => setQuestion(e.target.value)}
							value={question}
						></textarea>

						<div className="flex items-center justify-end gap-2 py-3">
							<button
								type="button"
								className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
								onClick={handleClear}
							>
								Clear
							</button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<button
						type="submit"
						className="inline-block w-full btn border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white"
						onClick={submitQuestion}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
