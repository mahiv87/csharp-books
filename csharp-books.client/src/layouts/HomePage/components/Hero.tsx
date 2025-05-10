import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

const Hero = () => {
	const { authState } = useOktaAuth();

	return (
		<div>
			<div className="hidden lg:block 3xl:container w-full mx-auto">
				<div className="flex flex-wrap gap-0 mt-5">
					<div className="sm:w-1/2 md:w-1/2">
						<div className="col-image-left"></div>
					</div>
					<div className="sm:w-1/2 md:w-1/2 container flex justify-center items-center">
						<div className="w-2/3 m-2">
							<h1 className="text-3xl">What have you been reading?</h1>
							<p className="text-lg font-light my-4">
								The library team would love to know what you have been reading.
								Whether it is to learn a new skill or grow within one, we will
								be able to provide the top content for you!
							</p>
							{authState?.isAuthenticated ? (
								<Link
									className="hidden lg:block w-max main-color text-white py-3 px-6 text-lg rounded-lg hover:bg-teal-500/75"
									to="search"
								>
									Explore top books
								</Link>
							) : (
								<Link
									className="hidden lg:block w-28 main-color text-white py-3 px-6 text-lg rounded-lg hover:bg-teal-500/75"
									to="login"
								>
									Sign up
								</Link>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-0">
					<div className="sm:w-1/2 md:w-1/2 container flex justify-center items-center">
						<div className="w-2/3 m-2">
							<h1 className="text-3xl">Our collection is always changing!</h1>
							<p className="text-lg font-light my-4">
								Try to check in daily as our collection is always changing! We
								work nonstop to provide the most accurate book selection
								possible for our Luv 2 Read students! We are diligent about our
								book selection and our books are always going to be our top
								priority.
							</p>
						</div>
					</div>
					<div className="sm:w-1/2 md:w-1/2">
						<div className="col-image-right"></div>
					</div>
				</div>
			</div>

			{/* Mobile  */}
			<div className="lg:hidden pb-4">
				<div className="container mx-auto px-4">
					<div className="m-2">
						<div className="col-image-left"></div>
						<div className="my-4">
							<h1 className="text-2xl">What have you been reading?</h1>
							<p className="text-lg font-light">
								The library team would love to know what you have been reading.
								Whether it is to learn a new skill or grow within one, we will
								be able to provide the top content for you!
							</p>
						</div>
					</div>
					<div className="m-2">
						<div className="col-image-right"></div>
						<div className="my-4">
							<h1 className="text-2xl">Our collection is always changing!</h1>
							<p className="text-lg font-light">
								Try to check in daily as our collection is always changing! We
								work nonstop to provide the most accurate book selection
								possible for our Luv 2 Read students! We are diligent about our
								book selection and our books are always going to be our top
								priority.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
