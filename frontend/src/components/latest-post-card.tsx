import { useNavigate } from 'react-router-dom';
// import linkIcon from '@/assets/svg/link.svg';
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
        {/* <img src={linkIcon} alt={post.title} className="h-3 w-3" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary h-3 w-3 fill-current dark:text-dark-primary"
          viewBox="0 0 515.283 515.283"
        >
          <path d="M372.149 515.283H85.881c-22.941 0-44.507-8.934-60.727-25.155S.001 452.34.001 429.402V143.134c0-22.94 8.934-44.506 25.154-60.726s37.786-25.154 60.727-25.154h114.507c15.811 0 28.627 12.816 28.627 28.627s-12.816 28.627-28.627 28.627H85.881c-7.647 0-14.835 2.978-20.241 8.384s-8.385 12.595-8.385 20.242v286.268c0 7.647 2.978 14.835 8.385 20.243 5.406 5.405 12.594 8.384 20.241 8.384h286.267c7.647 0 14.835-2.978 20.242-8.386 5.406-5.406 8.384-12.595 8.384-20.242V314.895c0-15.811 12.817-28.626 28.628-28.626s28.628 12.816 28.628 28.626v114.507c0 22.94-8.934 44.505-25.155 60.727-16.221 16.22-37.788 25.154-60.726 25.154zm-171.76-171.762c-7.327 0-14.653-2.794-20.242-8.384-11.179-11.179-11.179-29.306 0-40.485L417.544 57.254H314.896c-15.811 0-28.626-12.816-28.626-28.627S299.085 0 314.896 0h171.761a28.542 28.542 0 0 1 19.997 8.144l.002.002.056.056.017.016.044.044.029.029.032.032.062.062.062.062.031.032.029.029a.62.62 0 0 1 .06.061l.056.057.002.002a28.55 28.55 0 0 1 8.144 19.998v171.761c0 15.811-12.817 28.627-28.628 28.627s-28.626-12.816-28.626-28.627V97.739l-237.4 237.399c-5.585 5.59-12.911 8.383-20.237 8.383z" />
        </svg>
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
