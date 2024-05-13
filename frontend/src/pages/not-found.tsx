import AddIcon from '@/assets/svg/add-icon-white.svg';
import LogOutIcon from '@/assets/svg/logout-icon.svg';
import LogInIcon from '@/assets/svg/login-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import userState from '@/utils/user-state';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import ThemeToggle from '@/components/theme-toggle-button';

function ErrorPage() {
  const navigate = useNavigate();

  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => (prevTheme === null ? true : !prevTheme));
  };

  const [accessToken, setAccessToken] = useState<string | null>(userState.getUser());

  useLayoutEffect(() => {
    if (isDarkTheme !== null) {
      document.documentElement.classList.toggle('dark', isDarkTheme);

      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const storedAccessToken = userState.getUser();

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, [accessToken, userState]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_PATH + '/api/auth/signout');

      if (response.status === 200) {
        toast.success(response.data.message);
        userState.setUser(null);
        setAccessToken(null);
        navigate('/');
      } else {
        toast.error('Error: ' + response.data.message);
      }
    } catch (err: any) {
      console.log('Error :', err.message);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <div className="z-10 flex w-full items-center justify-between bg-dark px-14 py-7  text-white">
        <div className="flex cursor-text items-center justify-center text-2xl font-semibold">
          WanderLust
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-end px-2 py-2 sm:px-20" onClick={toggleTheme}>
            <ThemeToggle />
          </div>
          {accessToken ? (
            <div className="flex gap-2 ">
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 sm:inline-block"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                Create post
              </button>
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 sm:inline-block"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
              <button
                className="px-2 py-2 hover:bg-slate-500/25 sm:hidden"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                <img className="h-10 w-10" src={AddIcon} />
              </button>
              <button
                className="py-2 hover:bg-slate-500/25 sm:hidden sm:px-2"
                onClick={() => {
                  handleLogout();
                }}
              >
                <img className="h-9 w-9" src={LogOutIcon} />
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 sm:inline-block"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Login
              </button>
              <button
                className="py-2 hover:bg-slate-500/25 sm:hidden sm:px-2"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                <img className="h-9 w-9" src={LogInIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="justify-centerp-5 flex w-full flex-col items-center bg-light text-dark dark:bg-dark dark:text-light ">
        <div className=" w-full bg-light dark:bg-dark">
          <Particles
            id="tsparticles"
            options={{
              fullScreen: {
                enable: true,
                zIndex: -10,
              },
              background: {
                color: {
                  value: 'transparent',
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: 'repulse',
                  },
                },
                modes: {
                  repulse: {
                    distance: 100,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: isDarkTheme ? '#fff' : '#000',
                },
                links: {
                  color: isDarkTheme ? '#fff' : '#000',
                  distance: 150,
                  enable: true,
                  opacity: 0.8,
                  width: 1,
                },
                move: {
                  direction: 'none',
                  enable: true,
                  outModes: {
                    default: 'bounce',
                  },
                  random: false,
                  speed: 6,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 100,
                },
                opacity: {
                  value: 0.8,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        <div className="-mt-5 flex flex-col items-center justify-center py-44 text-center">
          <h1 className="py-4 text-9xl">404</h1>
          <h2 className="py-4 text-3xl">Not Found!</h2>
          <Link to={'/'}>
            <button
              className="mt-3 rounded-lg border-2 border-solid border-sky-500 px-6 py-3
          hover:bg-slate-500/25 active:bg-slate-500/25"
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
