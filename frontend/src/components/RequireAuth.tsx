import userState from '@/utils/user-state';
import { Navigate, Outlet } from 'react-router-dom'

function RequireAuth({ allowedRole }: { allowedRole: string[] }) {
    const { role } = userState.getUser()
    const token = document.cookie.includes('access_token');
    return token && allowedRole.find((myRole) => myRole === role) ? (
        <Outlet />
    ) : <Navigate to={'/login'} />
}

export default RequireAuth
