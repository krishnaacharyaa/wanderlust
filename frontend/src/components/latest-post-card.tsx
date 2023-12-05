import { useNavigate } from 'react-router-dom';
import linkIcon from '@/assets/svg/link.svg';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
export default function LatestPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-none dark:bg-dark-card"
      onClick={() => navigate('/details-page', { state: { post } })}
    >
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <img src={linkIcon} className="h-3 w-3" onClick={() => navigate(-1)} />
      </div>
      <div className="mb-2 line-clamp-2 font-semibold text-light-title dark:text-dark-title">
        {post.title}
      </div>
      <div className="text-xs text-light-info dark:text-dark-info">
        {post.authorName} • {formatPostTime(post.timeOfPost)}
      </div>
    </div>
  );
}
