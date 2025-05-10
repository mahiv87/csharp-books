import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="main-color">
			<div className="container flex flex-wrap justify-between items-center mx-auto px-2 py-5 main-color">
				<p className="md:w-1/3 mb-0 text-white">© React Spring Library, Inc</p>
				<ul className="md:w-1/3 flex justify-end">
					<li>
						<Link to="/" className="mx-2 px-2 text-white">
							Home
						</Link>
					</li>
					<li>
						<Link to="/search" className="mx-2 px-2 text-white">
							Search Books
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
