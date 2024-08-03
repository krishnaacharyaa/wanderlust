import RotatingGlobe from '../rotating-globe';

function Loader() {
  return (
    <div
      role="status"
      className="bg-slate-5 flex items-center justify-center pb-[15rem] pt-[8rem] dark:bg-dark-card md:pb-[8rem] md:pt-[8rem]"
    >
      <div className="w-[25rem] dark:mix-blend-soft-light dark:invert">
        <RotatingGlobe />
      </div>
      <div>
        <div className="text-lg font-extralight text-gray-500 dark:text-gray-700 md:text-3xl">
          Please wait...
        </div>
        <div className="w-[70%] text-xl text-gray-600 dark:text-gray-500 md:text-4xl">
          While we get things ready for you
        </div>
      </div>
    </div>
  );
}

export default Loader;
