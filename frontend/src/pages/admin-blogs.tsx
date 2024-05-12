import PenIcon from '@/assets/svg/pen-icon';
import TrasnIcon from '@/assets/svg/trash-icon';
import { imageUrls } from '@/constants/images';

const AdminBlogs = () => {
  return (
    <>
      <div className="w-full p-3 px-5 sm:p-12">
        <h1 className="absolute left-16 top-3 text-2xl font-bold text-light-title dark:text-dark-title  sm:static">
          Blogs
        </h1>
        <div className="mt-2 flex flex-col sm:mt-12">
          <div className="flex  flex-row items-center justify-between gap-2 rounded-lg bg-light px-3 py-3 shadow-md dark:bg-dark-card sm:gap-5">
            <img
              src={imageUrls[1]}
              className=" h-16 w-16 rounded-xl object-cover shadow-lg sm:h-24 sm:w-24"
              alt=""
            />
            <div className="flex w-12 flex-1 grow flex-col justify-between gap-2">
              <h4 className="w-full truncate text-base font-semibold text-light-title dark:text-dark-title sm:text-xl">
                A Serene Escape to Bali's Hidden Beaches
              </h4>
              <p className="hidden w-full truncate text-sm text-light-description dark:text-dark-description sm:inline">
                Explore Bali's tranquil shores and discover the best-hidden beaches the island has
                to offer. Dive into the crystal-clear water
              </p>
              <p className="text-sm font-semibold text-[#6941C6] dark:text-dark-secondary">
                Drew Cano • 1 Jan 2023
              </p>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row ">
              <button className="h-fit rounded-xl border-0 text-base font-semibold text-light-title dark:text-dark-title sm:text-xl">
                <PenIcon />
              </button>
              <button className="h-fit rounded-xl border-0 text-base font-semibold text-light-title dark:text-dark-title sm:text-xl ">
                <TrasnIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBlogs;
