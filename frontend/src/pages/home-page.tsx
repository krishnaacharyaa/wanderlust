import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '@/assets/wanderlustbg.webp';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import ThemeToggle from '@/components/theme-toggle-button';
import AddIcon from '@/assets/svg/add-icon-white.svg';

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

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative -mt-2 h-[460px] bg-cover bg-fixed bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-between text-2xl font-semibold">
              WanderLust
            </div>
            <div className="flex justify-between px-2">
              <div className="flex items-center justify-end px-2 py-2 md:px-20">
                <ThemeToggle />
              </div>
              <button
                className="hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
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
          <div className="mb-8 flex max-w-3xl flex-1 flex-col justify-end text-slate-50">
            <h1 className="text-xl font-bold md:text-4xl">Journey Beyond Horizons</h1>
            <p className="my-4 text-base md:text-lg">
              Dive into the world of travel with stories that transport you to far-off lands.
              Adventure awaits around every corner. It's time to explore the world!
            </p>
            <div className="text-sm font-semibold md:text-xl">Let's go!</div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">All Posts</h1>
        <div className="flex flex-wrap mb-[2.8rem]">
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
