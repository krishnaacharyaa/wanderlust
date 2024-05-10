import userState from '@/utils/user-state';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoute({ allowedRole }: { allowedRole: Array<string> }) {
    const { role } = userState.getUser()
    const token = Cookies.get('authToken');
    return token && allowedRole.find((myRole) => myRole === role) ? (
        <Outlet />
    ) : <Navigate to={'/login'} />
}

export default ProtectedRoute
