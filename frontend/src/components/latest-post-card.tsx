import { useNavigate } from 'react-router-dom';
import linkIcon from '@/assets/svg/link.svg';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { createSlug } from '@/utils/slug-generator';
import { TestProps } from '@/types/test-props';

export default function LatestPostCard({
  post,
  testId = 'latestpostcards',
}: { post: Post } & TestProps) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);
  return (
    <div
      className={`active:scale-click cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-none dark:bg-dark-card`}
      onClick={() => navigate(`/details-page/${slug}/${post._id}`, { state: { post } })}
      data-testid={testId}
    >
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <img src={linkIcon} alt={post.title} className="h-4 w-4 dark:invert" />
      </div>
      <div className="mb-2 line-clamp-1 font-semibold text-light-title dark:text-dark-title">
        {post.title}
      </div>
      <div className="text-xs text-light-info dark:text-dark-info">
        {post.authorName} • {formatPostTime(post.timeOfPost)}
      </div>
    </div>
  );
}
