import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import { categoryProps } from '@/utils/category-props';

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full cursor-pointer p-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
      onClick={() => navigate('/details-page', { state: { post } })}
    >
      <div className="rounded-lg bg-slate-50 shadow-md dark:bg-dark-card">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-48 w-full rounded-lg object-cover"
        />
        <div className="p-4">
          <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
          <h2 className="mb-2 line-clamp-1 text-xl font-semibold dark:text-slate-50">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-slate-600 dark:text-dark-description">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span key={index} className={categoryProps(category)}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
