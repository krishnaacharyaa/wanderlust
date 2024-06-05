import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import arrowRightIcon from '@/assets/svg/arrow-right.svg';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '@/types/post-type';
import axiosInstance from '@/helpers/axios-instance';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import PostCard from '@/components/post-card';
import PostMobileViewComponent from '@/components/PostMobileViewComponent';

export default function DetailsPage() {
  const { state } = useLocation();
  const [post, setPost] = useState<Post>(state?.post);
  const initialVal = post === undefined;
  const [loading, setIsLoading] = useState(initialVal);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [relatedCategoryPosts, setRelatedCategoryPosts] = useState<Post[]>([]);
  const [relatedPostsLoading, setRelatedPostsLoading] = useState<boolean>(false);

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
    if (post === undefined || post !== state.post) {
      getPostById();
    }
  }, [state.post]);

  useEffect(() => {
    const fetchRelatedCategoryPosts = async () => {
      try {
        setRelatedPostsLoading(true);
        const res = await axiosInstance.get('/api/posts/related-posts-by-category', {
          params: {
            categories: post.categories,
          },
        });
        setRelatedCategoryPosts(res.data);
        setRelatedPostsLoading(false);
      } catch (err) {
        setRelatedPostsLoading(false);
      }
    };
    fetchRelatedCategoryPosts();
  }, [post.categories]);

  if (!loading)
    return (
      <div className="flex-grow bg-light dark:bg-dark">
        <div className="relative flex flex-col">
          <img src={post.imageLink} alt={post.title} className="h-80 w-full object-cover sm:h-96" />
          <div className="absolute left-0 top-0 h-full w-full bg-slate-950/60"></div>
          <div className="absolute top-12 w-full cursor-pointer justify-start px-2 text-lg text-slate-50 sm:top-20 sm:px-8 sm:text-xl lg:px-12 lg:text-2xl">
            <img
              alt="white"
              src={navigateBackWhiteIcon}
              className="active:scale-click h-5 w-10"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="absolute bottom-6 w-full max-w-xl px-4 text-slate-50 sm:bottom-8 sm:max-w-3xl sm:px-8 lg:bottom-12 lg:max-w-5xl lg:px-12">
            <div className="mb-4 flex space-x-2">
              {post.categories.map((category: string, idx: number) => (
                <CategoryPill key={idx} category={category} />
              ))}
            </div>
            <h1 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">{post.title}</h1>
            <p className="text-xs font-semibold text-dark-secondary sm:text-sm">
              {post.authorName}
            </p>
            <p className="text-xs text-dark-secondary/80 sm:text-sm">
              {formatPostTime(post.timeOfPost)}
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-y-4 px-4 py-10">
          <div>
            <p className="leading-7 text-light-secondary dark:text-dark-secondary sm:text-lg">
              {post.description}
            </p>
          </div>
        </div>
        <div className="container mx-auto flex flex-col px-4 py-6 text-white">
          <div className="ml-4 flex justify-between text-2xl font-semibold  ">
            <div>Related Blogs</div>
            <div className="mr-10 flex  cursor-pointer items-center gap-1 text-gray-400 hover:underline">
              <Link to="/">
                <div className="text-sm">see more blogs</div>
              </Link>
              <img
                alt="arrow-right"
                src={arrowRightIcon}
                className="active:scale-click h-10 w-10 "
              />
            </div>
          </div>
          <div className="block space-y-4 sm:hidden">
            {relatedPostsLoading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <PostCardSkeleton key={index} />)
              : relatedCategoryPosts
                  .slice(0, 3)
                  .map((post) => <PostMobileViewComponent key={post._id} post={post} />)}
          </div>
          <div className="hidden sm:flex sm:flex-wrap sm:p-3">
            {relatedPostsLoading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => <PostCardSkeleton key={index} />)
              : relatedCategoryPosts
                  .slice(0, 4)
                  .map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    );
  else return <h1>Loading...</h1>;
}
