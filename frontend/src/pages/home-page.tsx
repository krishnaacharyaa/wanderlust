import { useEffect, useState } from 'react';
import BlogFeed from '@/components/blog-feed';
import Post, { PostType } from '@/types/post-type';
import Header from '@/layouts/header-layout';
import axiosInstance from '@/helpers/axios-instance';
import PostsComponent from '@/components/posts';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get('/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <Header />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="cursor-text pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">
          All Posts
        </h1>
        <div className="flex flex-wrap">
          <PostsComponent 
            loading={loading}
            posts={posts}
            skeletonCount={8}
            noPostValidation="No data"
            type={PostType.POST}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
