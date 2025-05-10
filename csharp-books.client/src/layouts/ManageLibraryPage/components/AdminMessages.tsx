import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { MessageModel } from '../../../models/MessageModel';
import Spinner from '../../utils/Spinner';
import Pagination from '../../utils/Pagination';
import AdminMessage from './AdminMessage';
import { AdminMessageRequest } from '../../../models/AdminMessageRequest';

const AdminMessages = () => {
	const { authState } = useOktaAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [messages, setMessages] = useState<MessageModel[]>([]);
	const [messagesPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [btnSubmit, setBtnSubmit] = useState(false);

	const baseAPIUrl = import.meta.env.VITE_API;

	// Fetch messages
	useEffect(() => {
		const fetchUserMessages = async () => {
			if (authState && authState.isAuthenticated) {
				const url = `${baseAPIUrl}/messages/search/findByClosed?closed=false&page=${
					currentPage - 1
				}&size=${messagesPerPage}`;
				const requestOptions = {
					method: 'GET',
					headers: {
						Authoriztion: `Bearer ${authState.accessToken?.accessToken}`,
						'Content-Type': 'application/json'
					}
				};

				const response = await fetch(url, requestOptions);

				if (!response.ok) {
					throw new Error('Something went wrong');
				}

				const responseJson = await response.json();

				setMessages(responseJson._embedded.messages);
				setTotalPages(responseJson.page.totalPages);
			}
			setIsLoading(false);
		};
		fetchUserMessages().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
		window.scrollTo(0, 0);
	}, [authState, currentPage, btnSubmit]);

	if (isLoading) {
		return <Spinner />;
	}

	if (httpError) {
		return (
			<div className="container mx-auto my-5" style={{ height: 550 }}>
				<p>{httpError}</p>
			</div>
		);
	}

	// Submits an admin's response to a specific message
	const submitResponse = async (id: number, adminResponse: string) => {
		const url = `${baseAPIUrl}/messages/secure/admin/message`;

		if (
			authState &&
			authState.isAuthenticated &&
			id !== null &&
			adminResponse !== ''
		) {
			const messageAdminRequestModel: AdminMessageRequest =
				new AdminMessageRequest(id, adminResponse);

			const requestOptions = {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(messageAdminRequestModel)
			};

			const response = await fetch(url, requestOptions);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			setBtnSubmit(!btnSubmit);
		}
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="container mt-3">
			{messages.length > 0 ? (
				<>
					<h3 className="text-2xl font-semibold">Pending Messages:</h3>
					{messages.map((message) => (
						<AdminMessage
							message={message}
							submitResponse={submitResponse}
							key={message.id}
						/>
					))}
				</>
			) : (
				<h3>No pending Messages</h3>
			)}
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					paginate={paginate}
				/>
			)}
		</div>
	);
};

export default AdminMessages;
