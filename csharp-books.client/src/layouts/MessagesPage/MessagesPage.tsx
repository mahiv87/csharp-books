import { useState } from 'react';
import { PostMessage } from './components/PostMessage';
import { Messages } from './components/Messages';

export const MessagesPage = () => {
	const [messagesClick, setMessagesClick] = useState(false);

	return (
		<div className="container mx-auto">
			<div className="mt-3">
				<div role="tablist" className="tabs tabs-lifted tabs-lg ml-4">
					<input
						onClick={() => setMessagesClick(false)}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Submit Question"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-2 ">
						<PostMessage />
					</div>

					<input
						onClick={() => setMessagesClick(true)}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Messages"
					/>
					<div role="tabpanel" className="tab-content p-2">
						{messagesClick ? <Messages /> : <></>}
					</div>
				</div>
			</div>
		</div>
	);
};
