import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useEffect, useRef } from 'react';
import { oktaConfig } from '../lib/oktaConfig';

// Okta's Sign-In Widget for authentication.
// Displays a sign-in form using Okta's widget and handles authentication
const OktaSignInWidget = ({ onSuccess, onError }) => {
	const widgetRef = useRef();

	useEffect(() => {
		if (!widgetRef.current) {
			return false;
		}

		const widget = new OktaSignIn(oktaConfig);

		widget
			.showSignInToGetTokens({
				el: widgetRef.current
			})
			.then(onSuccess)
			.catch(onError);

		return () => widget.remove();
	}, [onSuccess, onError]);

	return <div ref={widgetRef}></div>;
};

export default OktaSignInWidget;
