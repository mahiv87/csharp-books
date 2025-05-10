import { useState } from 'react';
import { HistoryPage } from './components/HistoryPage';
import Loans from './components/Loans';

const UsersBooksPage = () => {
	const [historyClick, setHistoryClick] = useState(false);

	return (
		<div className="container mx-auto">
			<div className="mt-3">
				<div role="tablist" className="tabs tabs-lifted tabs-lg ml-4">
					<input
						onClick={() => setHistoryClick(false)}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="Loans"
						defaultChecked
					/>
					<div role="tabpanel" className="tab-content p-2 ">
						<Loans />
					</div>

					<input
						onClick={() => setHistoryClick(true)}
						type="radio"
						name="my_tabs_1"
						role="tab"
						className="tab font-semibold text-main-color [--tab-bg:white] [--tab-border:2px] [--tab-border-color:lightgray]"
						aria-label="History"
					/>
					<div role="tabpanel" className="tab-content p-2">
						{historyClick ? <HistoryPage /> : <></>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersBooksPage;
