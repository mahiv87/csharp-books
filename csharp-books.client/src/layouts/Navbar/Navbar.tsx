import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../utils/Spinner';

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);
	const { oktaAuth, authState } = useOktaAuth();

	if (!authState) {
		return <Spinner />;
	}

	const handleLogout = async () => oktaAuth.signOut();
	// console.log(authState);

	return (
		<header className="bg-teal-500">
			<div className="mx-auto flex h-24 max-w-screen-xl justify-between items-center gap-8 px-4 sm:px-6 lg:px-8">
				<span className="block text-2xl md:text-3xl font-bold text-white">
					React Spring Library
				</span>
				<div
					className={
						navOpen
							? 'absolute z-10 top-20 left-0 bg-teal-500 w-full flex flex-col items-center text-center animate-slide-down'
							: 'flex flex-1 items-center justify-end md:justify-between'
					}
				>
					<nav
						aria-label="Global"
						className={navOpen ? 'block' : 'hidden md:block'}
					>
						<ul
							className={
								navOpen
									? 'flex flex-col mx-auto gap-2 px-4 sm:px-6 font-semibold'
									: 'flex items-center gap-6 text-lg font-semibold'
							}
						>
							<li>
								<Link
									className="text-gray-100 transition hover:text-gray-100/75"
									to="/"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-100 transition hover:text-gray-100/75"
									to="/search"
								>
									Search Books
								</Link>
							</li>
							{authState.isAuthenticated && (
								<li>
									<Link
										className="text-gray-100 transition hover:text-gray-100/75"
										to="/shelf"
									>
										Your Books
									</Link>
								</li>
							)}
							{authState.isAuthenticated &&
								authState?.accessToken?.claims.userType === 'admin' && (
									<li>
										<Link
											className="text-gray-100 transition hover:text-gray-100/75"
											to="/admin"
										>
											Admin
										</Link>
									</li>
								)}
						</ul>
					</nav>
					<div className="flex items-center gap-4">
						<div
							className={
								navOpen
									? 'flex flex-col gap-4 my-4 px-4 sm:px-6'
									: 'sm:flex sm:gap-4'
							}
						>
							{!authState.isAuthenticated ? (
								<>
									<Link
										className={
											navOpen
												? 'block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75'
												: 'hidden md:block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75'
										}
										to="/login"
									>
										Login
									</Link>
								</>
							) : (
								<button
									className={
										navOpen
											? 'block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75'
											: 'hidden md:block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75'
									}
									onClick={handleLogout}
								>
									Logout
								</button>
							)}
						</div>
					</div>
				</div>
				<button
					className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
					onClick={() => setNavOpen(!navOpen)}
				>
					<span className="sr-only">Toggle menu</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
};

export default Navbar;
