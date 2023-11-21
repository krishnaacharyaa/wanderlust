import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '@/assets/wanderlustbg.webp';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
function HomePage() {
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
  const navigate = useNavigate();
  return (
    <div className="w-full font-[Poppins]">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative mt-[-8px] h-[460px] bg-cover bg-fixed bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-16 py-8 text-white">
          <div className="flex w-full justify-between">
            <div className="text-2xl font-semibold">WanderLust</div>
            <button
              className="rounded border border-white px-4 py-2"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              Create post
            </button>
          </div>
          <div className="flex max-w-5xl flex-1 flex-col justify-end pb-8">
            <h1 className="text-4xl font-bold">Journey Beyond Horizons</h1>
            <p className="my-4 text-xl">
              Dive into the World of Travel with Stories That Transport You to Far-Off Lands.
              Adventure awaits around every corner. It's time to explore the world!
            </p>
            <div className="text-xl font-semibold">Let's Go !!!</div>
          </div>
        </div>
      </div>
      <div className="px-16">
        <BlogFeed />
        <h1 className="text-2xl font-semibold">All Blog Posts</h1>
        <div className="-mx-4 flex flex-wrap">
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
