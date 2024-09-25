import AdminSidebar from '@/components/admin-sidebar';
import { Outlet } from 'react-router-dom';

const AdminContainer = () => {
  return (
    <div className="relative flex flex-grow flex-col bg-light dark:bg-dark sm:flex-row">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminContainer;
