import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import { categoryProps } from '@/utils/category-props';

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5">
      <div
        className="bg-light m-4 cursor-pointer rounded-lg shadow-md dark:bg-dark-card"
        onClick={() => navigate('/details-page', { state: { post } })}
      >
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-48 w-full rounded-lg object-cover"
        />
        <div className="p-4">
          <div className="text-light-info mb-2 text-xs dark:text-dark-info">
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
          <h2 className="text-light-title mb-2 line-clamp-1 text-xl font-semibold dark:text-dark-title">
            {post.title}
          </h2>
          <p className="text-light-description line-clamp-2 dark:text-dark-description">
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
