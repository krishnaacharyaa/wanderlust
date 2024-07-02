import axios from 'axios';
import { useEffect, useState } from 'react';
import FeaturedPostCard from '@/components/featured-post-card';
import LatestPostCard from '@/components/latest-post-card';
import { FeaturedPostCardSkeleton } from '@/components/skeletons/featured-post-card-skeleton';
import { LatestPostCardSkeleton } from '@/components/skeletons/latest-post-card-skeleton';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryEndpoint =
      selectedCategory === 'featured'
        ? '/api/posts/featured'
        : `/api/posts/categories/${selectedCategory}`;

    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_PATH + categoryEndpoint)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts/latest')
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 sm:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What's hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === 'featured'
              ? 'Featured Posts'
              : `Posts related to "${selectedCategory}"`}
          </h1>
          <div className="flex flex-col gap-6">
            {posts.length === 0 || loading == true
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <FeaturedPostCardSkeleton key={index} />)
              : posts
                  .slice(0, 5)
                  .map((post, index) => <FeaturedPostCard key={index} post={post} />)}
          </div>
        </div>
        <div className="w-full p-4 sm:w-1/3">
          <div className="mb-6">
            <div className="-mb-1 cursor-text text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Discover by topic
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  name="category"
                  key={category}
                  aria-label={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category ? 'featured' : category)
                  }
                >
                  <CategoryPill category={category} selected={selectedCategory === category} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              What's new?
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Latest Posts
            </h2>
            <div className="flex flex-col gap-4">
              {latestPosts.length === 0
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <LatestPostCardSkeleton key={index} />)
                : latestPosts
                    .slice(0, 5)
                    .map((post, index) => <LatestPostCard key={index} post={post} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
