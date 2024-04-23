import PenIcon from '@/assets/svg/pen-icon';
import TrasnIcon from '@/assets/svg/trash-icon';
import { imageUrls } from '@/constants/images';

const AdminBlogs = () => {
  return (
    <div className="w-full p-5 sm:p-12">
      <h1 className="text-2xl font-bold text-light-title dark:text-dark-title">Blogs</h1>
      <div className="mt-7 sm:mt-12 flex flex-col">
        <div className="flex flex-col justify-between gap-2 rounded-lg bg-light px-3 py-3 shadow-md dark:bg-dark-card md:flex-row md:items-center md:gap-7">
          <img
            src={imageUrls[1]}
            className="h-48 w-full rounded-xl object-cover shadow-lg md:h-24 md:w-28"
            alt=""
          />
          <div className="flex grow flex-col justify-between gap-2">
            <h4 className="text-2xl font-semibold text-light-title dark:text-dark-title">
              A Serene Escape to Bali's Hidden Beaches
            </h4>
            <p className="text-sm  text-light-description dark:text-dark-description">
              Explore Bali's tranquil shores and discover the best-hidden beaches the island has to
              offer. Dive into the crystal-clear water
            </p>
            <p className="text-sm font-semibold text-[#6941C6] dark:text-dark-secondary">
              Drew Cano • 1 Jan 2023
            </p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0 ">
            <button className="h-fit rounded-xl border-0 text-xl font-semibold text-light-title dark:text-dark-title">
              <PenIcon />
            </button>
            <button className="h-fit rounded-xl border-0 text-xl font-semibold text-light-title dark:text-dark-title ">
              <TrasnIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
