import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import ThemeToggle from '@/components/theme-toggle-button';

function ErrorPage() {
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
    <>
      <div className="z-10 flex w-full items-center justify-between bg-dark px-14 py-7  text-white">
        <div className="flex cursor-text items-center justify-center text-2xl font-semibold">
          WanderLust
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-end px-2 py-2 sm:px-20" onClick={toggleTheme}>
            <ThemeToggle />
          </div>
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
