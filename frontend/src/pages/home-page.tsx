import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '@/assets/wanderlustbg.webp';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
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
    <div className="w-full cursor-default bg-slate-50 font-[Poppins] dark:bg-dark">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative -mt-2 h-[460px] bg-cover bg-fixed bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-8 py-8 text-slate-50 md:px-16">
          <div className="flex w-full justify-between">
            <div className="text-2xl font-semibold">WanderLust</div>
            <button
              className="rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              Create post
            </button>
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
