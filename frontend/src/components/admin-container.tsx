import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin-sidebar';

const AdminContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-grow flex-col bg-light dark:bg-dark md:flex-row">
      <AdminSidebar />
      {children}
    </div>
  );
};

export default AdminContainer;
