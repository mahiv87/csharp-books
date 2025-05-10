import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminMessages from './components/AdminMessages';
import AddNewBook from './components/AddNewBook';
import ChangeBooksQty from './components/ChangeBooksQty';

const ManageLibraryPage = () => {
	const { authState } = useOktaAuth();
	const [changeQtyOfBooksClick, setChangeQtyOfBooksClick] = useState(false);
	const [messagesClick, setMessagesClick] = useState(false);

	const handleAddBook = () => {
		setChangeQtyOfBooksClick(false);
		setMessagesClick(false);
	};

	const handleChangeQty = () => {
		setChangeQtyOfBooksClick(true);
		setMessagesClick(false);
	};

	const handleMessages = () => {
		setChangeQtyOfBooksClick(false);
		setMessagesClick(true);
	};

	if (authState?.accessToken?.claims.userType === undefined)
		return <Navigate to="/" />;

	return (
		<div className="container mx-auto">
			<div className="mt-3">
				<div role="tablist" className="tabs tabs-lifted tabs-lg ml-4 w-full">
					<input
						onClick={handleAddBook}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Add Book"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-2 ">
						<AddNewBook />
					</div>

					<input
						onClick={handleChangeQty}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Change Quantity"
					/>
					<div role="tabpanel" className="tab-content p-2">
						{changeQtyOfBooksClick ? <ChangeBooksQty /> : <></>}
					</div>

					<input
						onClick={handleMessages}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Messages"
					/>
					<div role="tabpanel" className="tab-content p-2">
						{messagesClick ? <AdminMessages /> : <></>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageLibraryPage;
