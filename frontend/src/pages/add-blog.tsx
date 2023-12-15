import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '@/assets/svg/navigate-back-black.svg';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import ModalComponent from '@/components/modal';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';

import { zodResolver } from '@hookform/resolvers/zod';

import { FormDataSchema, TFormData } from '@/lib/blog.zod';

function AddBlog() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modal, setmodal] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<TFormData>({
    resolver: zodResolver(FormDataSchema),
  });

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setValue('imageLink', imageUrl);
  };

  const handleCategoryClick = (category: string) => {
    const currentCategories = getValues('categories') || [];
    if (currentCategories.includes(category)) {
      setValue(
        'categories',
        currentCategories.filter((cat: string) => cat !== category)
      );
    } else {
      setValue('categories', [...currentCategories, category]);
    }
  };

  const handleselector = () => {
    setValue('imageLink', selectedImage);
    setmodal(false);
  };

  const formSubmit = async (formData: TFormData) => {
    console.log('error', errors);

    console.log('From adad', formData);

    if (isValid) {
      try {
        const response = await axios.post(import.meta.env.VITE_API_PATH + '/api/posts/', formData);
        if (response.status === 200) {
          toast.success('Blog post successfully created!');
          navigate('/');
        } else {
          toast.error('Error: ' + response.data.message);
        }
      } catch (error: any) {
        toast.error('Error: ' + error.message);
      }
    }
  };

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addListener(handleThemeChange);

    return () => {
      -mediaQuery.removeListener(handleThemeChange);
    };
  }, []);

  function Asterisk() {
    return <span className="dark:text-dark-tertiary">*</span>;
  }

  return (
    <div className="min-h-screen cursor-default bg-slate-50 px-6 py-8 dark:bg-dark">
      <div className="mb-4 flex justify-center">
        <div className="flex w-[32rem] items-center justify-start space-x-4 md:w-5/6 lg:w-4/6 ">
          <div className="w-fit cursor-pointer">
            <img
              src={isDarkMode ? navigateBackWhiteIcon : navigateBackBlackIcon}
              onClick={() => navigate(-1)}
              className="h-5 w-10"
            />
          </div>
          <h2 className="text-lg font-semibold text-light-primary dark:text-dark-primary md:text-xl lg:text-2xl">
            Create Blog
          </h2>
        </div>
      </div>
      <div className="flex justify-center ">
        <form onSubmit={handleSubmit(formSubmit)} className="md:w-5/6 lg:w-2/3">
          <div className="mb-2 flex items-center">
            <label className="flex items-center">
              <span className="px-2 text-base font-medium text-light-secondary dark:text-dark-secondary">
                Is this a featured blog?
              </span>
              <input
                {...register('isFeaturedPost')}
                type="checkbox"
                name="isFeaturedPost"
                className="ml-2 h-5 w-5 rounded-full accent-purple-400 "
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
              name="title"
              placeholder="Travel Bucket List for this Year"
              autoComplete="off"
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
            {errors.title ? <p className="mt-2 text-red-500">{`${errors.title.message}`}</p> : null}
          </div>

          <div className="mb-1">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Blog content <Asterisk />
            </div>
            <textarea
              {...register('description')}
              name="description"
              placeholder="Start writing here&hellip;"
              rows={5}
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
          </div>

          <div className="mb-2">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Author name <Asterisk />
            </div>
            <input
              {...register('authorName')}
              type="text"
              name="authorName"
              placeholder="Shree Sharma"
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
            {errors.authorName ? (
              <p className="mt-2 text-red-500">{`${errors.authorName.message}`}</p>
            ) : null}
          </div>

          <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
            Blog cover image
            <span className="text-xs tracking-wide text-dark-tertiary">
              &nbsp;(jpg/png/webp)&nbsp;
            </span>
            <Asterisk />
          </div>
          <div className="mb-4 flex justify-between gap-2 md:gap-4">
            <input
              {...register('imageLink')}
              type="url"
              id="imagelink"
              name="imageLink"
              placeholder="https://&hellip;"
              autoComplete="off"
              className="w-3/4 rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary lg:w-10/12"
            />
            <button
              type="button"
              className="lg:text-md w-1/4 rounded-lg bg-light-primary text-xs text-slate-50 hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 md:text-sm lg:w-2/12 lg:px-4 lg:py-3"
              onClick={() => {
                setmodal(true);
              }}
            >
              Pick image
            </button>
          </div>
          <div className="block">
            {errors.imageLink ? (
              <p className="mb-1 mt-2 text-red-500">{`${errors.imageLink.message}`}</p>
            ) : null}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="px-2 pb-1 font-medium text-light-secondary dark:text-dark-secondary md:mr-4 md:w-fit">
              Categories <Asterisk />
            </label>

            <div className="flex flex-wrap gap-3 rounded-lg p-2 dark:bg-dark-card dark:p-3">
              {categories.map((category, index) => (
                <span key={`${category}-${index}`} onClick={() => handleCategoryClick(category)}>
                  <CategoryPill
                    category={category}
                    selected={getValues('categories')?.includes(category)}
                  />
                </span>
              ))}
            </div>
            {errors.categories ? <p className="mt-2 text-red-500">Select up to 3 tags</p> : null}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-light-primary px-12 py-3 text-base font-semibold text-light hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 md:mx-1 md:w-fit"
          >
            Post blog
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

export default AddBlog;
