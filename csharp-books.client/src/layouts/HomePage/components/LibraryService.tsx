import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

const LibraryService = () => {
	const { authState } = useOktaAuth();

	return (
		<div className="container mx-auto m-10 ">
			<div className="flex flex-wrap p-4 justify-center border shadow-lg">
				<div className="lg:7/12 p-3">
					<h1 className="text-3xl font-bold">
						Can't find what you're looking for?
					</h1>
					<p className="text-lg font-light my-4">
						If you cannot find what you are looking for, send our library
						admin's a personal message!
					</p>
					<div className="grid gap-2 md:justify-start mb-4 lg:mb-3">
						{authState?.isAuthenticated ? (
							<Link
								to="messages"
								className="w-max main-color text-white py-3 px-6 text-lg rounded-lg hover:bg-teal-500/75"
							>
								Library Services
							</Link>
						) : (
							<Link
								to="login"
								className="w-28 main-color text-white py-3 px-6 text-lg rounded-lg hover:bg-teal-500/75"
							>
								Sign up
							</Link>
						)}
					</div>
				</div>
				<div className="w-full lg:w-1/3 lg:ml-1/12 shadow-lg lost-image"></div>
			</div>
		</div>
	);
};

export default LibraryService;
