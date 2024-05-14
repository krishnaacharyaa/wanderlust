import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import LogInIcon from '@/assets/svg/login-icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '@/components/hero';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '@/helpers/axios-instance';
import { useEffect, useState } from 'react';
import Loader from '@/components/skeletons/loader';
function header() {
  const navigate = useNavigate();
  const location = useLocation()
  const [data, setData] = useState({
    _id: localStorage.getItem("userId") || '',
    token: '',
    loading: true
  })


  const handleLogout = async () => {
    try {
      const response = axiosInstance.post('/api/auth/signout')
      toast.promise(response, {
        pending: 'Wait ...',
        success: {
          render({ data }) {
            localStorage.removeItem("userId")
            localStorage.removeItem("role")
            navigate('/');
            return data?.data?.message
          },
        },
        error: {
          render({ data }) {
            if (data instanceof AxiosError) {
              if (data?.response?.data?.message) {
                return data?.response?.data?.message;
              }
            }
            return "Signout failed"
          },
        },
      }
      )

      return (await response).data
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data?.message || 'An error occurred');
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`)
        setData({
          ...data,
          token: res.data?.data,
          loading: false
        })
      } catch (error) {
        setData({
          ...data,
          token: '',
          loading: false
        })
      }
    }
    fetchToken()
  }, [location])

  return (
    <div className="relative -mt-2 h-[460px] bg-[url('./assets/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
        <div className="flex w-full justify-between">
          <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
            WanderLust
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-end md:pr-20">
              <ThemeToggle />
            </div>
            <div>
              {data.loading ? (
                <Loader />
              ) : data.token ? (
                <div className="flex gap-2 ">
                  <button
                    className="active:scale-click rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                    onClick={() => {
                      navigate('/add-blog');
                    }}
                  >
                    Create post
                  </button>
                  <button
                    className="active:scale-click rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
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
                    className="active:scale-click rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
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
