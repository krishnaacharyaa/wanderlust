import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '@/assets/svg/navigate-back-black.svg';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import ModalComponent from '@/components/modal';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';

import { FieldValues, useForm } from 'react-hook-form';

type FormData = {
  title: string;
  authorName: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
};
function AddBlog() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modal, setmodal] = useState(false);
  const [imageLink, setImageLink] = useState<string>(''); // Define imageLink state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>(); // Initialize React Hook Form

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    setImageLink('');
    reset();
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleselector = () => {
    setImageLink(selectedImage);
    setmodal(false);
  };
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.length >= 3 && !selectedCategories.includes(category)) {
      toast.error('You can only select up to three categories.');
      return;
    }

    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isValidCategory = (category: string): boolean => {
    return selectedCategories.length >= 3 && !selectedCategories.includes(category);
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-5/6 lg:w-2/3">
          <div className="mb-2 flex items-center">
            <label className="flex items-center">
              <span className="px-2 text-base font-medium text-light-secondary dark:text-dark-secondary">
                Is this a featured blog?
              </span>
              <input
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
              type="text"
              {...register('title', { required: true })}
              placeholder="Travel Bucket List for this Year"
              autoComplete="off"
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
            {errors.title && <span className="text-red-600">Title is required.</span>}
          </div>

          <div className="mb-1">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Blog content <Asterisk />
            </div>
            <textarea
              {...register('description', { required: true })}
              placeholder="Start writing here&hellip;"
              rows={5}
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
            {errors.description && <span className="text-red-600">Description is required</span>}
          </div>

          <div className="mb-2">
            <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
              Author name <Asterisk />
            </div>
            <input
              type="text"
              {...register('authorName', { required: true })}
              placeholder="Shree Sharma"
              className="w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary"
            />
            {errors.authorName && <span className="text-red-600">authorName is required</span>}
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
              type="url"
              id="imagelink"
              {...register('imageLink', { required: true })}
              placeholder="https://&hellip;"
              autoComplete="off"
              className="w-3/4 rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-card dark:text-slate-50 dark:placeholder:text-dark-tertiary lg:w-10/12"
              value={imageLink}
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
          {/* {imageLink && <span className="mx-2 my-4 text-red-600">Image link is required.</span>} */}
          <div className="mb-4 flex flex-col">
            <label className="px-2 pb-1 font-medium text-light-secondary dark:text-dark-secondary md:mr-4 md:w-fit">
              Categories
              <span className="text-xs tracking-wide text-dark-tertiary">
                &nbsp;(max 3 categories)&nbsp;
              </span>
              <Asterisk />
            </label>
            <div className="flex flex-wrap gap-3 rounded-lg p-2 dark:bg-dark-card dark:p-3">
              {categories.map((category, index) => (
                <span key={`${category}-${index}`} onClick={() => handleCategoryClick(category)}>
                  <CategoryPill
                    category={category}
                    selected={selectedCategories.includes(category)}
                    disabled={isValidCategory(category)}
                  />
                </span>
              ))}
            </div>
          </div>

          <button
            disabled={isSubmitting}
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
