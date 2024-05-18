import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import ThemeToggle from '@/components/theme-toggle-button';

function NotFound() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(true);
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => (prevTheme === null ? true : !prevTheme));
  };

  useLayoutEffect(() => {
    if (isDarkTheme !== null) {
      document.documentElement.classList.toggle('dark', isDarkTheme);

      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  return (
    <div>
      <div className="relative -mt-2 ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col bg-white px-4 py-8 text-black dark:bg-dark  dark:text-slate-50 sm:px-16">
          <div className="flex w-full justify-between">
            <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
              WanderLust
            </div>
            <div className="flex justify-between">
              <div
                className="flex items-center justify-end px-2 py-2 sm:px-20"
                onClick={toggleTheme}
              >
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text:black -mt-12 flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-dark dark:text-dark ">
        <div className=" flex flex-col items-center justify-center bg-white text-black first-letter:text-center dark:bg-dark dark:text-white">
          <h1 className="py-4 text-9xl">404</h1>
          <h2 className="py-4 text-3xl">Page Not Found!</h2>
          <Link to={'/'}>
            <button
              className="mt-3 rounded-lg border-2 border-solid border-sky-500 px-8 py-4
          hover:bg-slate-500/25 active:bg-slate-500/25"
            >
              Go To Home
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full">
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
                value: isDarkTheme ? '#bbb' : '#000',
              },
              links: {
                color: isDarkTheme ? '#999' : '#000',
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
                speed: 1.5,
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
    </div>
  );
}

export default NotFound;
