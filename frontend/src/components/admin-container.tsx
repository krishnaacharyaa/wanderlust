import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin-sidebar';

const AdminContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex-grow flex md:flex-row flex-col relative'>
        <AdminSidebar />
      {children}
    </div>
  );
}

export default AdminContainer;
