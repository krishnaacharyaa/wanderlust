import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogFeed from '../components/blog-feed';
import PostCard from '../components/post-card';
import Post from '../types/post-type';
import bg from '../assets/wanderlustbg.webp'
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
    <div className="font-[Poppins] w-full">
      {/* <img src={bg} alt="" /> */}
      <div style={{backgroundImage: `url(${bg})`}} className="relative h-[460px] bg-cover mt-[-8px] bg-fixed bg-center" >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-16 py-8 text-white">
          <div className="flex justify-between w-full ">
            <div className="text-2xl font-semibold">WanderLust</div>
            <button
              className="border border-white rounded px-4 py-2"
              onClick={() => {
                navigate('/add-blog');
              }}
            >
              Create post
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-end pb-8 max-w-5xl">
            <h1 className="text-4xl font-bold">Journey Beyond Horizons</h1>
            <p className="text-xl my-4">
              Dive into the World of Travel with Stories That Transport You to Far-Off Lands.
              Adventure awaits around every corner. It's time to explore the world!
            </p>
            <div className="   text-xl font-semibold">Let's Go !!!</div>
          </div>
        </div>
      </div>
      <div className="px-16">
        <BlogFeed />
        <h1 className="text-2xl font-semibold ">All Blog Posts</h1>
        <div className="flex flex-wrap -mx-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
