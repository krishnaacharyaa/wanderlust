import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '@/assets/wanderlustbg.webp';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import sun from "../assets/svg/yellow-sun.svg";
import moon from "../assets/svg/dark-moon.svg";
function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const toggleTheme = () => {
    // Toggle between dark and light themes
    setIsDarkTheme((prevTheme) => (prevTheme === null ? true : !prevTheme));
  };
  useEffect(() => {
    // Check if the user has set a theme preference in local storage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on local storage or system preference
    setIsDarkTheme(storedTheme === 'dark' || (!storedTheme && prefersDark) || null);
  }, []);

  useEffect(() => {
    // Apply dark or light theme based on isDarkTheme state
    if (isDarkTheme !== null) {
      document.documentElement.classList.toggle('dark', isDarkTheme);
      
      // Save the user's theme preference to local storage
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative -mt-2 h-[460px] bg-cover bg-fixed bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-8 py-8 text-slate-50 md:px-16">
          <div className="flex w-full justify-between">
            <div className="text-2xl font-semibold">WanderLust</div>
            <div className='flex justify-between px-2'>
            <div className="flex justify-end py-2 px-20">
              <button onClick={toggleTheme} className="btn btn-square btn-ghost ">
                <label className="swap swap-rotate w-12 h-12">
                    <img
                      src={isDarkTheme ? sun : moon} // Use moon for dark theme and sun for light theme
                      alt={isDarkTheme ? 'light' : 'dark'} // Alt text can also change based on the theme
                      className={`w-12 h-12 ${isDarkTheme ? 'swap-off' : 'swap-on'} rounded-full border p-2 ${isDarkTheme ? 'border-yellow-500' : 'border-black'}` }
                      style={{ fill: isDarkTheme ? '' : 'yellow' }} 
                    />
                </label>
              </button>
            </div>
            <button
              className="rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              Create post
            </button>
            </div>
          </div>
          <div className="mb-8 flex max-w-3xl flex-1 flex-col justify-end text-slate-50">
            <h1 className="text-2xl font-bold md:text-4xl">Journey Beyond Horizons</h1>
            <p className="my-4 md:text-xl">
              Dive into the world of travel with stories that transport you to far-off lands.
              Adventure awaits around every corner. It's time to explore the world!
            </p>
            <div className="text-xl font-semibold">Let's go!</div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="text-2xl font-semibold dark:text-dark-primary">All Posts</h1>
        <div className="flex flex-wrap">
          {posts.length === 0
            ? Array(8)
                .fill(0)
                .map((_, index) => <PostCardSkeleton key={index} />)
            : posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
