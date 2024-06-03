import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/authContext';

function UnprotectedRoute() {
  const { user } = useAuthContext();

  return user.token ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute;
