import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const token = Cookies.get('authToken');
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute;
