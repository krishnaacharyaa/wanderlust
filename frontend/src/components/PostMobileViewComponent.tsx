import Post from '@/types/post-type';
import CategoryPill from './category-pill';
import formatPostTime from '@/utils/format-post-time';
import { useNavigate } from 'react-router-dom';
import { createSlug } from '@/utils/slug-generator';

export default function PostMobileViewComponent({
  post,
  testId = 'postMobileViewCard',
}: {
  post: Post;
  testId?: string;
}) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);
  return (
    <div
      className="active:scale-click group flex h-fit cursor-pointer rounded-lg border bg-slate-50 dark:border-none dark:bg-dark-card"
      onClick={() => {
        navigate(`/details-page/${slug}/${post._id}`, { state: { post } });
      }}
      data-testid={testId}
    >
      <div className="flex h-fit w-full gap-2 p-3">
        <div className="w-1/3 overflow-hidden">
          <img
            src={post.imageLink}
            className="group-hover:scale-hover h-32 w-32 rounded-lg object-cover shadow-lg transition-transform ease-in-out"
          />
        </div>
        <div className="flex h-full w-2/3 flex-col gap-2 ">
          <div className="line-clamp-1 text-base font-semibold text-light-title dark:text-dark-title">
            {post.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <CategoryPill key={`${category}-${index}`} category={category} />
            ))}
          </div>
          <div className="line-clamp-2 ">
            <p className="overflow-ellipsis text-light-description dark:text-dark-description">
              {post.description}
            </p>
          </div>
          <div className="text-xs text-light-info dark:text-dark-info">
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
        </div>
      </div>
    </div>
  );
}
