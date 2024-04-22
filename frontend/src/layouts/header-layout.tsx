import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/hero';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useUserContext from '@/context/user-context';
function header() {
  const navigate = useNavigate();

  const { setUser }: any = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // Retrieve authentication status on page load
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_PATH + '/api/auth/signout');

      if (response.status === 200) {
        toast.success(response.data.message);
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      } else {
        toast.error('Error: ' + response.data.message);
      }
    } catch (err: any) {
      toast.error('Error: ' + err.message);
    }
  };
  return (
    <div className="relative -mt-2 h-[460px] bg-[url('./assets/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
        <div className="flex w-full justify-between">
          <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
            WanderLust
          </div>
          <div className="flex justify-between">
            <div className="flex items-center justify-end px-2 py-2 md:px-20">
              <ThemeToggle />
            </div>
            {isLoggedIn ? (
              <div className="flex gap-2 ">
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
                  <img className="h-10 w-10" src={AddIcon} />
                </button>
                <button
                  className="py-2 hover:bg-slate-500/25 md:hidden md:px-2"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOutIcon />
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
                  <LogInIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <Hero />
      </div>
    </div>
  );
}

export default header;
