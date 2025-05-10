import { ReactNode } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Spinner from './Spinner';
import { Navigate } from 'react-router-dom';

interface SecureRouteProps {
	children: ReactNode;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ children }) => {
	const { authState } = useOktaAuth();

	if (!authState) {
		return <Spinner />;
	}

	return authState.isAuthenticated ? children : <Navigate to="/login" />;
};

export default SecureRoute;
