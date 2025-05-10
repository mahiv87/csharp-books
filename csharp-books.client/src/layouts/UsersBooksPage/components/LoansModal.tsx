/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersCurrentLoans } from '../../../models/UsersCurrentLoans';

export const LoansModal: React.FC<{
	usersCurrentLoans: UsersCurrentLoans;
	returnBook: any;
	renewLoan: any;
}> = ({ usersCurrentLoans, returnBook, renewLoan }) => {
	return (
		<div className="modal-box bg-white" key={usersCurrentLoans.book.id}>
			<h3 className="font-bold text-2xl text-neutral-500 mb-2">Loan Options</h3>
			<hr />
			<div className="container">
				<div className="mt-3">
					<div className="flex justify-between items-center">
						<div className="w-1/6">
							{usersCurrentLoans.book?.img ? (
								<img
									src={usersCurrentLoans.book?.img}
									width="56"
									height="87"
									alt="Book"
								/>
							) : (
								<img
									src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
									width="56"
									height="87"
									alt="Book"
								/>
							)}
						</div>
						<div className="w-4/6 text-neutral-500 ">
							<h4 className="text-xl font-semibold">
								{usersCurrentLoans.book.title}
							</h4>
							<h6 className="text-lg italic">
								{usersCurrentLoans.book.author}
							</h6>
						</div>
					</div>
					<div className="my-3 font-semibold">
						<hr />
						{usersCurrentLoans.daysLeft > 0 && (
							<p className="text-neutral-500">
								Due in {usersCurrentLoans.daysLeft} days.
							</p>
						)}
						{usersCurrentLoans.daysLeft === 0 && (
							<p className="text-emerald-700">Due Today.</p>
						)}
						{usersCurrentLoans.daysLeft < 0 && (
							<p className="text-rose-500">
								Past due by {usersCurrentLoans.daysLeft} days.
							</p>
						)}
						<div className="flex flex-col w-5/6 md:w-3/4 mx-auto mt-3">
							<button
								onClick={() => returnBook(usersCurrentLoans.book.id)}
								className="btn my-2 border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white"
							>
								Return Book
							</button>
							{usersCurrentLoans.daysLeft > 0 ? (
								<button
									onClick={
										usersCurrentLoans.daysLeft < 0
											? (e) => e.preventDefault()
											: () => renewLoan(usersCurrentLoans.book.id)
									}
									className="btn my-2 border-teal-500 bg-teal-500 hover:bg-teal-500/80 hover:border-teal-500/80 text-white"
								>
									Renew book for 7 days
								</button>
							) : (
								<p className="text-lg text-rose-500 font-semibold mx-auto mt-3">
									Late books cannot be renewed
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="modal-action">
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn bg-neutral-500 border-neutral-500 text-white hover:bg-neutral-500/80 hover:border-neutral-500/80">
						Close
					</button>
				</form>
			</div>
		</div>
	);
};
