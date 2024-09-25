import { Navigate, Outlet } from 'react-router-dom';
import useAuthData from '@/hooks/useAuthData';
import Loader from './skeletons/loader';

function RequireAuth({ allowedRole }: { allowedRole: string[] }) {
  const { role, token, loading } = useAuthData();

  if (loading) {
    return (
      <>
        <Loader />
      </>
    ); // Render a loading indicator
  }

  return token && allowedRole.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : (
    <Navigate to={'/signin'} />
  );
}

export default RequireAuth;
