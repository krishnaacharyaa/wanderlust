import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { createSlug } from '@/utils/slug-generator';

import { ThumbsUp } from 'lucide-react';

import { useAuthContext } from '@/context/authContext';

type PostCardProps = {
  post: Post;
  testId: string;
  onLike: (postId: string) => void;
};

export default function FeaturedPostCard({ post, onLike, testId }: PostCardProps) {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const slug = createSlug(post.title);

  return (
    <div
      className={` flex h-auto cursor-pointer flex-col gap-2 rounded-lg border bg-slate-50 dark:border-none dark:bg-dark-card sm:h-48 sm:flex-row`}
      data-testid={testId}
    >
      <div className="w-full overflow-hidden sm:w-1/3">
        <img
          onClick={() => navigate(`/details-page/${slug}/${post._id}`, { state: { post } })}
          src={post.imageLink}
          alt={post.title}
          className={`sm:group-hover:scale-hover h-48 w-full rounded-lg object-cover shadow-lg transition-transform ease-in-out sm:h-full`}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-2 p-3 sm:w-2/3">
        <div className="line-clamp-1 text-base font-semibold text-light-title dark:text-dark-title">
          {post.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <div className="line-clamp-2 sm:line-clamp-3">
          <p className="overflow-ellipsis text-light-description dark:text-dark-description">
            {post.description}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-between text-xs text-light-info dark:text-dark-info">
          <div>
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
          <div className="mr-4 flex items-center justify-center gap-1">
            <div className="text-sm">
              <p>{post.numberOfLikes + ' ' + (post.numberOfLikes === 1 ? 'like' : 'likes')}</p>
            </div>
            <div className="rounded-full bg-transparent p-1 hover:bg-red-900">
              <button
                type="button"
                onClick={() => onLike(post._id)}
                className={`text-gray-400 hover:text-blue-500 ${user.id && post.likes.includes(user.id) && '!text-blue-500'}`}
              >
                <ThumbsUp className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
