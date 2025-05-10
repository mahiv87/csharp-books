/* eslint-disable @typescript-eslint/no-explicit-any */
const Pagination: React.FC<{
	currentPage: number;
	totalPages: number;
	paginate: any;
}> = ({ currentPage, totalPages, paginate }) => {
	const pageNumbers = [];
	const range = 2;

	const startPage = Math.max(1, currentPage - range);
	const endPage = Math.min(totalPages, currentPage + range);

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav aria-label="...">
			<ul className="flex justify-center gap-1 text-xs font-medium">
				<li onClick={() => paginate(1)}>
					<a
						href="#"
						className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
					>
						First
					</a>
				</li>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						className={
							currentPage === number
								? ' border border-solid border-teal-600 rounded-md'
								: ''
						}
					>
						<a
							href="#"
							className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
						>
							{number}
						</a>
					</li>
				))}
				<li onClick={() => paginate(totalPages)}>
					<a
						href="#"
						className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
					>
						Last
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
