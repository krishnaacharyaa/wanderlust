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
        className=" p-4  md:hidden"
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <BarIcons />
      </button>
      <div
        className={`absolute md:h-auto h-full w-64 origin-left rounded-b-xl rounded-r-xl border border-[#D9D9D9]  bg-white transition-transform md:relative ${
          isSidebarOpen ? 'scale-x-1' : 'scale-x-0'
        }`}
      >
        <button
          className=" p-4  md:hidden"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <CloseIcon />
        </button>
        <div className="border-b border-[#D9D9D9]  bg-[#FAFAFA] py-3 px-6 md:p-6 ">
          <h1 className="text-xl font-medium">WanderLust</h1>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <NavLink
            to={'/admin/users'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl bg-white px-3 py-[10px] text-sm font-medium text-[#5C5E64] ${
                isActive && '!bg-black text-white'
              }`
            }
          >
            <UserIcon /> Users
          </NavLink>
          <NavLink
            to={'/admin/blogs'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl bg-white px-3 py-[10px] text-sm font-medium text-[#5C5E64] ${
                isActive && '!bg-black !text-white'
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
