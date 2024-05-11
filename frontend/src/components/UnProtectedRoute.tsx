import { Navigate, Outlet } from 'react-router-dom';

function UnprotectedRoute() {
    const token = document.cookie.includes('access_token');
    return token ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute
