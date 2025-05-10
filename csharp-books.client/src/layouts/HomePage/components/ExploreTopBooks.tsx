import { Link } from 'react-router-dom';

const ExploreTopBooks = () => {
	return (
		<>
			<div className="p5 mb-4 bg-neutral-900 header">
				<div className="w-full py-20 text-white flex justify-center items-center">
					<div className="pl-4">
						<h1 className="font-bold text-5xl">Find your next adventure</h1>
						<p className="md:w-8/12 text-2xl mt-4 mb-8">
							Where would you like to go next?
						</p>
						<Link
							to="/search"
							className="main-color text-white py-3 px-6 text-lg rounded-lg"
							type="button"
						>
							Explore top books
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExploreTopBooks;
