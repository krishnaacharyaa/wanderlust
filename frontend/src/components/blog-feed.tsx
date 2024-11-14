import axios from 'axios';
import { useEffect, useState } from 'react';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';
import PostsComponent from './posts';
import { PostType } from '@/types/post-type';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [selectedTitleCategory, setTitleSelectedCategory] = useState('Featured Posts');
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latesloading, setLatestLoading] = useState(true);

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
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => setLoading(false));
      selectedCategory === 'featured'
              ? setTitleSelectedCategory('Featured Posts')
              : setTitleSelectedCategory(`Posts related to "${selectedCategory}"`)
  }, [selectedCategory]);

  useEffect(() => {
    setLatestLoading(true);
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts/latest')
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => setLatestLoading(false));
  }, []);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 sm:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What's hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedTitleCategory}
          </h1>
          <div className="flex flex-col gap-6">
            <PostsComponent 
              loading={loading}
              posts={posts}
              skeletonCount={5}
              noPostValidation={<>Not found post for <p className="underline underline-offset-8 decoration-2  decoration-sky-500">{selectedTitleCategory}</p></>}
              type={PostType.FEATURE}
            />
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
                <PostsComponent 
                  loading={latesloading}
                  posts={latestPosts}
                  skeletonCount={5}
                  noPostValidation={<p>Not data</p>}
                  type={PostType.LATEST}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
