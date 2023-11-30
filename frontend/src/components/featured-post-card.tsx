import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import { categoryProps } from '@/utils/category-props';

export default function FeaturedPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-48 cursor-pointer gap-4 rounded-lg bg-slate-50 dark:bg-dark-card"
      onClick={() => navigate('/details-page', { state: { post } })}
    >
      <div className="w-1/3">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex h-full w-2/3 flex-col gap-2">
        <div className="text-xl font-semibold dark:text-dark-title">{post.title}</div>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <span key={index} className={categoryProps(category)}>
              {category}
            </span>
          ))}
        </div>
        <div className="line-clamp-2 text-slate-700">
          <p className="overflow-ellipsis dark:text-dark-description">{post.description}</p>
        </div>
        <div className="mb-1 flex flex-1 items-end text-xs text-slate-600 dark:text-dark-info">
          {post.authorName} • {formatPostTime(post.timeOfPost)}
        </div>
      </div>
    </div>
  );
}
