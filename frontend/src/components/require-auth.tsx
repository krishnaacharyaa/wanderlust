import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@/context/authContext';

function RequireAuth({ allowedRole }: { allowedRole: string[] }) {
  // const { role, token, loading } = useAuthData();
  const { user } = useAuthContext();

  // if (loading) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   ); // Render a loading indicator
  // }

  return user.token && allowedRole.find((myRole) => myRole === user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={'/signin'} />
  );
}

export default RequireAuth;
