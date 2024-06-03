import { useAuthContext } from '@/context/authContext';
import axiosInstance from '@/helpers/axios-instance';
import useAuthData from '@/hooks/useAuthData';
import { AxiosError, isAxiosError } from 'axios';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import LogInIcon from '@/assets/svg/login-icon.svg';
import { toast } from 'react-toastify';

type UserData = {
  _id: string;
  userName: string;
  email: string;
};

export function UserProfile() {
  const { _id } = useAuthData();
  const [userData, setUserData] = useState<UserData>();
  const { token, loading } = useAuthData();
  const { addAuth } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [updateName, setupdateName] = useState('');
  const [updateEmail, setupdateEmail] = useState('');
  const [updatePassword, setupdatePassword] = useState('');

  // getUserInfo
  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axiosInstance.get(`api/user/${_id}`);
      setUserData(data);
    };
    fetchUserData();
  }, [_id]);

  const handleLogout = async () => {
    try {
      const response = axiosInstance.post('/api/auth/signout');
      toast.promise(response, {
        pending: 'Wait ...',
        success: {
          render({ data }) {
            addAuth({
              email: '',
              id: '',
              role: '',
              token: '',
            });
            navigate('/');
            return data?.data?.message;
          },
        },
        error: {
          render({ data }) {
            if (data instanceof AxiosError) {
              if (data?.response?.data?.message) {
                return data?.response?.data?.message;
              }
            }
            return 'Signout failed';
          },
        },
      });

      return (await response).data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message || 'An error occurred');
      } else {
        console.error(error);
      }
    }
  };

  const handleEdit = async () => {
    setisLoading(true);
    try {
      await axiosInstance.patch(`/api/user/update/${_id}`, {
        username: updateName,
        email: updateEmail,
        password: updatePassword,
      });
      toast.success('succesfully updated post');
      setisLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response?.data?.message) {
          setisLoading(false);
          console.log(err?.response?.data?.message);
        }
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/api/user/${_id}`);
      console.log(res);
      navigate('/signin');
      toast.success('your account has been deleted');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          toast.error('something went wrong');
        }
      }
      toast.error("couldn't delete your account right now,try again after sometime");
    }
  };

  return (
    <div className="flex flex-col bg-blue-950">
      <div className="flex items-center justify-between border border-b-2 p-5 text-white">
        <Link to="/">
          <div className="ml-5 text-xl font-bold">Wanderlust</div>
        </Link>
        <div className="mr-5">
          {loading ? (
            <Loader />
          ) : token ? (
            <div className="flex items-center gap-4">
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                onClick={() => {
                  navigate('/Your-Posts');
                }}
              >
                Posts
              </button>
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                Create post
              </button>
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
              <button
                className="px-2 py-2 hover:bg-slate-500/25 md:hidden"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                <img className="h-10 w-10" src={AddIcon} alt="Add Icon" />
              </button>
              <button
                className="py-2 hover:bg-slate-500/25 md:hidden md:px-2"
                onClick={() => {
                  handleLogout();
                }}
              >
                <img className="h-9 w-9" src={LogOutIcon} alt="Logout Icon" />
              </button>
            </div>
          ) : (
            <div className="flex">
              {' '}
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Login
              </button>
              <button
                className="py-2 hover:bg-slate-500/25 md:hidden md:px-2"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                <img className="h-9 w-9" src={LogInIcon} alt="Login Icon" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex min-h-screen  items-center justify-center bg-blue-950">
        <div className="h-fit w-1/3 rounded-lg bg-white p-4">
          <div className="flex flex-col space-y-2">
            <div className="text-center text-3xl font-bold">Profile</div>
            <div className="ml-3 flex flex-col gap-2">
              <label htmlFor="username">username:</label>
              <input
                name="username"
                type="text"
                id="username"
                defaultValue={userData?.userName}
                onChange={(e) => setupdateName(e.target.value)}
                className="rounded-full border border-black p-3"
              />
            </div>
            <div className="ml-3 flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                defaultValue={userData?.email}
                onChange={(e) => setupdateEmail(e.target.value)}
                className="rounded-full border border-black p-3"
              />
            </div>
            <div className="ml-3 flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="*********"
                onChange={(e) => setupdatePassword(e.target.value)}
                className="rounded-full border border-black p-3"
              />
            </div>
            <div className="flex justify-end space-x-3 p-3">
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-700 p-3 text-white hover:opacity-90"
              >
                delete
              </button>
              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="rounded-lg bg-green-700 p-3 text-white hover:opacity-90"
              >
                {isLoading ? 'updating...' : 'update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
