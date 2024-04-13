import { useLocation, useNavigate, useParams } from 'react-router-dom';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailsPage() {
  const { state } = useLocation();
  const [post, setPost] = useState(state?.post);
  const initialVal = post === undefined;
  const [loading, setIsLoading] = useState(initialVal);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostById = async () => {
      try {
        await axios.get(import.meta.env.VITE_API_PATH + `/api/posts/${postId}`).then((response) => {
          console.log(response.data);
          setIsLoading(false);
          setPost(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (post === undefined) {
      getPostById();
    }
  }, [post]);

  if (!loading)
    return (
      <div className="flex-grow bg-light dark:bg-dark">
        <div className="relative flex flex-col">
          <img src={post.imageLink} alt={post.title} className="h-80 w-full object-cover md:h-96" />
          <div className="absolute left-0 top-0 h-full w-full bg-slate-950/60"></div>
          <div className="absolute top-12 w-full cursor-pointer justify-start px-2 text-lg text-slate-50 md:top-20 md:px-8 md:text-xl lg:px-12 lg:text-2xl">
            <img
              src={navigateBackWhiteIcon}
              className="active:scale-click h-5 w-10"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="absolute bottom-6 w-full max-w-xl px-4 text-slate-50 md:bottom-8 md:max-w-3xl md:px-8 lg:bottom-12 lg:max-w-5xl lg:px-12">
            <div className="mb-4 flex space-x-2">
              {post.categories.map((category: string, idx: number) => (
                <CategoryPill key={idx} category={category} />
              ))}
            </div>
            <h1 className="mb-4 text-xl font-semibold md:text-2xl lg:text-3xl">{post.title}</h1>
            <p className="text-xs font-semibold text-dark-secondary md:text-sm">
              {post.authorName}
            </p>
            <p className="text-xs text-dark-secondary/80 md:text-sm">
              {formatPostTime(post.timeOfPost)}
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-y-4 px-4 py-10">
          <div>
            <p className="leading-7 text-light-secondary dark:text-dark-secondary md:text-lg">
              {post.description}
            </p>
          </div>
        </div>
      </div>
    );
  else return <h1>Loading...</h1>;
}
