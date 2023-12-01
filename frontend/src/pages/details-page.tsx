import { useLocation, useNavigate } from 'react-router-dom';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';

const DetailsPage = () => {
  const { state } = useLocation();
  const post: Post = state?.post;
  const navigate = useNavigate();
  return (
    <div className="min-h-screen dark:bg-dark">
      <div className="min-h-min w-full dark:bg-dark">
        <div className="relative flex flex-col">
          <img src={post.imageLink} alt={post.title} className="h-80 w-full object-cover md:h-96" />

          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50"></div>
          <div className="absolute top-16 w-full cursor-pointer justify-start px-4 text-lg text-white md:top-24 md:px-8 md:text-xl lg:px-16 lg:text-2xl">
            <img src={navigateBackWhiteIcon} className="h-5 w-10" onClick={() => navigate(-1)} />
          </div>
          <div className="absolute bottom-4 w-full px-4 text-white md:bottom-8 md:px-8 lg:bottom-16 lg:px-16">
            <div className="mb-6 flex space-x-2">
              {post.categories.map((category, index) => (
                <div key={index} className="rounded-full bg-slate-500 px-3 py-1 text-sm text-white">
                  {category}
                </div>
              ))}
            </div>
            <h1 className="text-lg font-semibold md:text-2xl lg:text-4xl">{post.title}</h1>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4 px-4 pt-4 text-left dark:text-slate-50 md:px-8 md:pt-8 lg:px-16 lg:pt-16">
          <div>
            <p className="text-slate-700 dark:text-slate-50">{post.description}</p>
          </div>
          <div className="">
            <p className="font-semibold text-slate-600 dark:text-slate-50">By {post.authorName}</p>
            <p className="text-sm">{formatPostTime(post.timeOfPost)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
