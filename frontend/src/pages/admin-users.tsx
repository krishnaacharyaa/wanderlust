import axiosInstance from '@/helpers/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  _id: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
  email: string;
}

enum role {
  admin = 'ADMIN',
  user = 'USER',
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/user');
      setUsers(response?.data?.users);
    } catch (error) {
      toast.error('Something went wrong! Please try again!');
    }
  };

  const handleClick = async (userId: string, role: role) => {
    try {
      const response = await axiosInstance.patch('/api/user/' + userId, { role: role });
      if (response.status === 200) {
        fetchData();
        toast.success('User updated successfully!');
      }
    } catch (error) {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full p-3 px-5 sm:p-12">
        <h1 className="absolute left-16 top-3 text-2xl font-bold text-light-title dark:text-dark-title  sm:static">
          Users
        </h1>
        <div className="mt-2 sm:mt-12">
          {users?.map((user: User) => {
            return (
              <div
                key={user?._id}
                className="mb-3  flex  w-full flex-row items-center justify-between  gap-5 rounded-lg border-b border-gray-300 bg-light px-3 py-4 shadow-md dark:border-gray-700 dark:bg-dark-card"
              >
                <div className="flex flex-col gap-[10px] ">
                  <p className="text-base font-medium text-light-title dark:text-dark-title">
                    {user?.fullName}
                  </p>
                  <p className="text-base font-medium text-light-description dark:text-dark-description">
                    {user?.email}
                  </p>
                </div>
                {user.role === 'ADMIN' && (
                  <button
                    onClick={() => handleClick(user._id, role.user)}
                    className="h-fit rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white"
                  >
                    Admin
                  </button>
                )}
                {user.role === 'USER' && (
                  <button
                    onClick={() => handleClick(user._id, role.admin)}
                    className="h-fit rounded-xl border border-black bg-transparent px-4 py-2 text-sm font-semibold text-white"
                  >
                    Admin
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
