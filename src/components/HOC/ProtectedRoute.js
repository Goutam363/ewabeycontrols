import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const ProtectedRoute = (Component) => {
    const Auth = (props) => {
        const { loggedin } = useContext(AuthContext);
        const navigate = useNavigate();

        useEffect(() => {
            if (!loggedin) {
                navigate('/login'); // Redirect to the login page if not authenticated
            }
        }, [loggedin]);

        if (!loggedin) return null; // Return null instead of an empty string

        return <Component {...props}/>;
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default ProtectedRoute;