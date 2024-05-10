import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function UnprotectedRoute() {
    const token = Cookies.get('authToken');
    return token ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute
