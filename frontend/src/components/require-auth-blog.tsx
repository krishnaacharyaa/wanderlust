import { Navigate, Outlet } from 'react-router-dom';
import { AddBlogPostSkeleton } from './skeletons/add-blog-post-skeleton';
import useAuthData from '@/hooks/useAuthData';

function RequireAuthBlog({ allowedRole }: { allowedRole: string[] }) {
  const { role, token, loading } = useAuthData();

  if (loading) {
    return (
      <>
        <AddBlogPostSkeleton />
      </>
    ); // Render a loading indicator
  }

  return token && allowedRole.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : (
    <Navigate to={'/signin'} />
  );
}

export default RequireAuthBlog;
