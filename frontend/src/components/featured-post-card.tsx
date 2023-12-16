import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { createSlug } from '@/utils/slug-generator';

export default function FeaturedPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <div
      className="flex h-auto md:h-48 cursor-pointer gap-2 rounded-lg bg-light dark:bg-dark-card flex-col md:flex-row"
      onClick={() => navigate(`/details-page/${slug}/${post._id}`, { state: { post } })}
    >
      <div className="w-full md:w-1/3">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-48 w-full rounded-lg object-cover shadow-lg "
        />
      </div>
      <div className="flex h-full w-full md:w-1/7 flex-col gap-2 p-2">
        <div className="text-xl font-semibold text-light-title dark:text-dark-title max-sm:line-clamp-2">
          {post.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <div className={ `line-clamp-2`}>
          <p className="overflow-ellipsis max-sm:text-sm text-light-description dark:text-dark-description">
            {post.description}
          </p>
        </div>
        <div className="flex flex-1 items-end text-xs text-light-info dark:text-dark-info">
          {post.authorName} • {formatPostTime(post.timeOfPost)}
        </div>
      </div>
    </div>
  );
}
