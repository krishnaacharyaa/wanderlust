import { useNavigate } from 'react-router-dom';
import linkIcon from '@/assets/svg/link.svg';
import Post from '@/types/post-type';
import { categoryProps } from '@/utils/category-props';
import formatPostTime from '@/utils/format-post-time';
export default function LatestPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-lg bg-slate-50 p-2 py-2 shadow-sm dark:bg-dark-card"
      onClick={() => navigate('/details-page', { state: { post } })}
    >
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <span key={index} className={categoryProps(category)}>
              {category}
            </span>
          ))}
        </div>
        <img src={linkIcon} className="h-3 w-3" onClick={() => navigate(-1)} />
      </div>
      <div className="mb-2 line-clamp-2 text-xl font-semibold dark:text-dark-title">{post.title}</div>
      <div className="text-xs text-slate-500 dark:text-dark-info">
        {post.authorName} • {formatPostTime(post.timeOfPost)}
      </div>
    </div>
  );
}
