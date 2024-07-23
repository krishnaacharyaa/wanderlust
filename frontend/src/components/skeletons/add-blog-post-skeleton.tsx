import { useState, useEffect } from 'react';
import navigateBackBlackIcon from '@/assets/svg/navigate-back-black.svg';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';

export const AddBlogPostSkeleton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  return (
    <div className="flex-grow cursor-default bg-slate-50 px-6 py-8 dark:bg-dark-card">
      <div className="mb-4 flex justify-center">
        <div className="flex w-[32rem] items-center justify-start space-x-4 sm:w-5/6 lg:w-4/6 ">
          <div className="w-fit">
            <img
              alt="theme"
              src={isDarkMode ? navigateBackWhiteIcon : navigateBackBlackIcon}
              className="active:scale-click h-5 w-10"
            />
          </div>
          <h2 className="cursor-text text-lg font-semibold text-light-primary dark:text-dark-primary sm:text-xl lg:text-2xl">
            Create Blog
          </h2>
        </div>
      </div>
      <div className="flex justify-center">
        <form className="sm:w-5/6 lg:w-2/3">
          <div className="mb-2 flex items-center">
            <label className="flex items-center">
              <span className="h-[1.4rem] w-[10rem] animate-pulse rounded-sm bg-slate-300 px-2 dark:bg-slate-700"></span>
            </label>
          </div>

          <div className="mb-2">
            <div className="mb-4 h-[1rem] w-[16rem] animate-pulse rounded-sm bg-slate-300 dark:bg-slate-700"></div>
            <div className="mb-1 h-[3rem] w-[100%] animate-pulse rounded-lg bg-slate-200 p-3 dark:bg-dark-field"></div>
          </div>

          <div className="mb-1">
            <div className="mb-2 h-[1rem] w-[6rem] animate-pulse rounded-sm bg-slate-300 dark:bg-slate-700"></div>
            <div className="mb-1 h-[10rem] w-[100%] animate-pulse rounded-lg bg-slate-200 p-3 dark:bg-dark-field"></div>
          </div>
          <div className="mb-2">
            <div className="mb-2 h-[1rem] w-[6rem] bg-slate-300 dark:bg-slate-700"></div>
            <div className="mb-1 h-[3rem] w-[100%] animate-pulse rounded-lg bg-slate-200 p-3 dark:bg-dark-field"></div>
          </div>

          <div className="mb-4 h-[1rem] w-[12rem] animate-pulse rounded-sm bg-slate-300 dark:bg-slate-700"></div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-2 sm:gap-4">
              <div className="mb-1 h-[3rem] w-[100%] animate-pulse rounded-lg bg-slate-200 p-3 dark:bg-dark-field"></div>
              <div className="active:scale-click flex h-[2.8rem] w-[3.5rem] animate-pulse items-center justify-center rounded-lg bg-slate-300 px-12 py-3 dark:bg-slate-700 sm:mx-1 sm:w-fit"></div>
            </div>
          </div>

          <div className="mb-8 h-[1rem] w-[17rem] animate-pulse rounded-sm bg-slate-300 dark:bg-slate-700"></div>

          <div className="active:scale-click flex h-[2.5rem] w-[1.5rem] animate-pulse items-center justify-center rounded-lg bg-slate-300 px-12 py-3 dark:bg-slate-700 sm:mx-1 sm:w-fit"></div>
        </form>
      </div>
    </div>
  );
};
