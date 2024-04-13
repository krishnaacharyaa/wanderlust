import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/hero';
function header() {
  const navigate = useNavigate();

  return (
    <div className="relative -mt-2 h-[460px] bg-[url('./assets/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
        <div className="flex w-full justify-between">
          <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
            WanderLust
          </div>
          <div className="flex justify-between px-2">
            <div className="flex items-center justify-end px-2 py-2 md:px-20">
              <ThemeToggle />
            </div>
            <button
              className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              Create post
            </button>
            <button
              className="px-2 py-2 hover:bg-slate-500/25 md:hidden"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              <img className="h-10 w-10" src={AddIcon} />
            </button>
          </div>
        </div>
        <Hero />
      </div>
    </div>
  );
}

export default header;
