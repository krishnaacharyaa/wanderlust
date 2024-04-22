import { NavLink } from 'react-router-dom';
import UserIcon from '@/assets/svg/user-icon';
import BlogIcon from '@/assets/svg/blog-icon';
import BarIcons from '@/assets/svg/bars-icon';
import { useState } from 'react';
import CloseIcon from '@/assets/svg/close-icon';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <>
      <button
        className=" p-4  text-light-title dark:text-dark-title md:hidden "
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <BarIcons />
      </button>
      <div
        className={`absolute h-full w-64 origin-left rounded-b-xl rounded-r-xl border border-[#D9D9D9] bg-light transition-transform   dark:border-gray-700 dark:bg-dark md:relative md:h-auto ${
          isSidebarOpen ? 'scale-x-1' : 'scale-x-0'
        }`}
      >
        <button
          className=" p-4  text-light-title dark:text-dark-title md:hidden "
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <CloseIcon />
        </button>
        <div className="border-b border-[#D9D9D9] bg-light  px-6 py-3 dark:border-gray-700 dark:bg-dark md:p-6 ">
          <h1 className="text-xl font-medium text-light-title dark:text-dark-title">WanderLust</h1>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <NavLink
            to={'/admin/users'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl bg-light px-3 py-[10px] text-sm font-medium text-light-title dark:bg-dark dark:text-dark-title ${
                isActive && '!bg-black text-dark-title dark:!bg-dark-card dark:text-dark-title '
              }`
            }
          >
            <UserIcon /> Users
          </NavLink>
          <NavLink
            to={'/admin/blogs'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl bg-light px-3 py-[10px] text-sm font-medium text-light-title dark:bg-dark dark:text-dark-title ${
                isActive && '!bg-black text-dark-title dark:!bg-dark-card dark:text-dark-title '
              }`
            }
          >
            <BlogIcon /> Blogs
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
