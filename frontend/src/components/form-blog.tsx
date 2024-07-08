import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '@/assets/svg/navigate-back-black.svg';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import ModalComponent from '@/components/modal';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';
import userState from '@/utils/user-state';
import axiosInstance from '@/helpers/axios-instance';
import { AxiosError, isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { TFormBlogSchema, formBlogSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Post from '@/types/post-type';
import useAuthData from '@/hooks/useAuthData';

interface FormBlogPropType {
  type: 'new' | 'edit';
  postId?: string;
  post?: Post;
}

function FormBlog({ type, postId, post }: FormBlogPropType) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm<TFormBlogSchema>({
    resolver: zodResolver(formBlogSchema),
    defaultValues: {
      title: post?.title || '',
      authorName: post?.authorName || '',
      imageLink: post?.imageLink || '',
      categories: post?.categories || [],
      description: post?.description || '',
      isFeaturedPost: false,
    },
  });
  const formData = watch();
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const [modal, setmodal] = useState(false);
  const userData = useAuthData();

  //checks the length of the categories array and if the category is already selected
  const isValidCategory = (category: string): boolean => {
    return formData.categories.length >= 3 && !formData.categories.includes(category);
  };

  const handleCategoryClick = (category: string) => {
    if (isValidCategory(category)) return;

    if (formData.categories.includes(category)) {
      setValue(
        'categories',
        formData.categories.filter((cat) => cat !== category)
      );
    } else {
      setValue('categories', [...formData.categories, category]);
    }
    trigger('categories');
  };

  const handleselector = () => {
    setValue('imageLink', selectedImage);
    setmodal(false);
  };
  const handleCheckboxChange = () => {
    setValue('isFeaturedPost', !formData.isFeaturedPost);
  };
  const onSumbit = async () => {
    try {
      let postPromise;
      if (type === 'new') {
        postPromise = axiosInstance.post('/api/posts/', formData);
      }

      if (type === 'edit' && postId) {
        if (userData?.role === 'ADMIN') {
          postPromise = axiosInstance.patch(`/api/posts/admin/${postId}`, formData);
        } else {
          postPromise = axiosInstance.patch(`/api/posts/${postId}`, formData);
        }
      }
      if (postPromise)
        toast.promise(postPromise, {
          pending: 'Creating blog post...',
          success: {
            render() {
              reset();
              navigate('/');
              return 'Blog created successfully';
            },
          },
          error: {
            render({ data }) {
              if (data instanceof AxiosError) {
                if (data?.response?.data?.message) {
                  return data?.response?.data?.message;
                }
              }
              return 'Blog creation failed';
            },
          },
        });
      if (postPromise) return (await postPromise).data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        navigate('/');
        userState.removeUser();
        console.error(error.response?.data?.message);
      } else {
        console.log(error);
      }
    }
  };
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  function Asterisk() {
    return <span className="dark:text-dark-tertiary">*</span>;
  }

  return (
    <div className="flex-grow cursor-default bg-slate-50 px-6 py-8 dark:bg-dark-card">
      <div className="mb-4 flex justify-center">
        <div className="flex w-[32rem] items-center justify-start space-x-4 sm:w-5/6 lg:w-4/6 ">
          <div className="w-fit cursor-pointer">
            <img
              alt="theme"
              src={isDarkMode ? navigateBackWhiteIcon : navigateBackBlackIcon}
              onClick={() => navigate(-1)}
              className="active:scale-click h-5 w-10"
            />
          </div>
          <h2 className="cursor-text text-lg font-semibold text-light-primary dark:text-dark-primary sm:text-xl lg:text-2xl">
            Create Blog
          </h2>
        </div>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSumbit)} className="sm:w-5/6 lg:w-2/3">
          <div className="mb-2 flex items-center">
            <label className="flex items-center">
              <span className="px-2 text-base font-medium text-light-secondary dark:text-dark-secondary">
                Is this a featured blog?
              </span>
              <input
                {...register('isFeaturedPost')}
                type="checkbox"
                className="ml-2 h-5 w-5 cursor-pointer rounded-full accent-purple-400"
                checked={formData.isFeaturedPost}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className="mb-2">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Blog title <Asterisk />
            </div>
            <input
              {...register('title')}
              type="text"
              placeholder="Travel Bucket List for this Year"
              autoComplete="off"
              className="dark:text-textInField mb-1 w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
              value={formData.title}
            />
            {errors.title && (
              <span className="p-2 text-sm text-red-500">{`${errors.title.message}`}</span>
            )}
          </div>

          <div className="mb-1">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Blog content <Asterisk />
            </div>
            <textarea
              {...register('description')}
              placeholder="Start writing here&hellip;"
              rows={5}
              className="dark:text-textInField w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
              value={formData.description}
            />
            {errors.description && (
              <span className="p-2 text-sm text-red-500">{`${errors.description.message}`}</span>
            )}
          </div>
          <div className="mb-2">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Author name <Asterisk />
            </div>
            <input
              {...register('authorName')}
              type="text"
              placeholder="Shree Sharma"
              className="dark:text-textInField mb-1 w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
              value={formData.authorName}
            />
            {errors.authorName && (
              <span className="p-2 text-sm text-red-500">{`${errors.authorName.message}`}</span>
            )}
          </div>

          <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
            Blog cover image
            <span className="text-xs tracking-wide text-dark-tertiary">
              &nbsp;(jpg/png/webp)&nbsp;
            </span>
            <Asterisk />
          </div>
          <div>
            <div className="mb-1 flex justify-between gap-2 sm:gap-4">
              <input
                {...register('imageLink')}
                type="url"
                id="imagelink"
                name="imageLink"
                placeholder="https://&hellip;"
                autoComplete="off"
                className="dark:text-textInField w-3/4 rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary lg:w-10/12"
                value={formData.imageLink}
              />
              <button
                name="openModal"
                type="button"
                className="lg:text-md active:scale-click w-1/4 rounded-lg bg-light-primary text-xs text-slate-50 hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 sm:text-sm lg:w-2/12 lg:px-4 lg:py-3"
                onClick={() => {
                  setmodal(true);
                }}
              >
                Pick image
              </button>
            </div>
            {errors.imageLink && (
              <span className="p-2 text-sm text-red-500">{`${errors.imageLink.message}`}</span>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label className="px-2 pb-1 font-medium text-light-secondary dark:text-dark-secondary sm:mr-4 sm:w-fit">
              Categories
              <span className="text-xs tracking-wide text-dark-tertiary">
                &nbsp;(max 3 categories)&nbsp;
              </span>
              <Asterisk />
            </label>
            <div>
              <div className="flex flex-wrap gap-3 rounded-lg p-2 dark:bg-dark-card dark:p-3">
                {categories.map((category, index) => (
                  <span key={`${category}-${index}`} onClick={() => handleCategoryClick(category)}>
                    <CategoryPill
                      category={category}
                      selected={formData.categories.includes(category)}
                      disabled={isValidCategory(category)}
                    />
                  </span>
                ))}
              </div>
              {errors.categories && (
                <span className="p-2 text-sm text-red-500">{`${errors.categories.message}`}</span>
              )}
            </div>
          </div>

          <button
            name="post-blog"
            type="submit"
            className="active:scale-click flex w-full items-center justify-center rounded-lg bg-light-primary px-12 py-3 text-base font-semibold text-light hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 sm:mx-1 sm:w-fit"
          >
            {type === 'new' ? 'Post Blog' : 'Update Blog'}
          </button>
        </form>
        <ModalComponent
          selectedImage={selectedImage}
          handleImageSelect={handleImageSelect}
          handleSelector={handleselector}
          setModal={setmodal}
          modal={modal}
        />
      </div>
    </div>
  );
}

export default FormBlog;
