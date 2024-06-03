import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import LogInIcon from '@/assets/svg/login-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '@/components/hero';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '@/helpers/axios-instance';

import { useAuthContext } from '@/context/authContext';
import { Loader, User } from 'lucide-react';
import { useState } from 'react';
import useAuthData from '@/hooks/useAuthData';

function header() {
  const navigate = useNavigate();
  const { addAuth } = useAuthContext();
  const [isopen, setisOpen] = useState(false);
  const { token, role, _id, loading } = useAuthData();
  console.log({
    token,
    _id,
    role,
  });

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

  console.log(isopen);

  return (
    <div className="relative -mt-2 h-[460px] bg-[url('./assets/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col px-8 py-8 text-slate-50 sm:px-16">
        <div className="flex w-full justify-between">
          <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
            WanderLust
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-end px-4 sm:px-20">
              <ThemeToggle />
            </div>
            <div>
              {loading ? (
                <Loader />
              ) : token ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <div
                      onMouseEnter={() => setisOpen(true)}
                      onMouseLeave={() => setisOpen(false)}
                      className="relative rounded-full border border-gray-300 p-3  hover:bg-gray-400"
                    >
                      <User />
                    </div>
                    {isopen && (
                      <div className="top-15% absolute flex items-center ">
                        <div className="w-18 flex h-8 items-center whitespace-nowrap  ">
                          <div>profile</div>
                        </div>
                      </div>
                    )}
                  </Link>
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
        </div>
        <Hero />
      </div>
    </div>
  );
}

export default header;
