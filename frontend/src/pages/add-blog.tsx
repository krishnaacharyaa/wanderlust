import axios from 'axios';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '@/assets/svg/navigate-back-black.svg';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import { CATEGORIES } from '@/constants/categories';
import { categoryProps } from '@/utils/category-props';
import ModalComponent from '@/components/modal';

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

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const [modal, setmodal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authorName: '',
    imageLink: '',
    categories: [],
    description: '',
    isFeaturedPost: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryClick = (category: string) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((cat) => cat !== category),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
  };
  const handleselector = () => {
    setFormData({
      ...formData,
      imageLink: selectedImage,
    });
    setmodal(false);
  };
  const handleCheckboxChange = () => {
    setFormData({ ...formData, isFeaturedPost: !formData.isFeaturedPost });
  };
  const validateFormData = () => {
    if (
      !formData.title ||
      !formData.authorName ||
      !formData.imageLink ||
      !formData.description ||
      formData.categories.length === 0
    ) {
      toast.error('All fields must be filled out.');
      return false;
    }
    const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;
    if (!imageLinkRegex.test(formData.imageLink)) {
      toast.error('Image URL must end with .jpg, .jpeg, .webp or .png');
      return false;
    }
    if (formData.categories.length > 3) {
      toast.error('Select up to three categories.');
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        const response = await axios.post(import.meta.env.VITE_API_PATH + '/api/posts/', formData);

        if (response.status === 200) {
          toast.success('Blog post successfully created!');
          navigate('/');
        } else {
          toast.error('Error: ' + response.data.message);
        }
      } catch (err: any) {
        toast.error('Error: ' + err.message);
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
      mediaQuery.removeListener(handleThemeChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 px-16 font-[Poppins] dark:bg-dark">
      <div className="mb-4 flex items-center justify-start">
        <div className="w-fit cursor-pointer text-base text-black  md:text-lg lg:text-2xl">
          <img
            src={isDarkMode ? navigateBackWhiteIcon : navigateBackBlackIcon}
            onClick={() => navigate(-1)}
            className="h-5 w-10"
          />
        </div>
        <h2 className="ml-4 text-sm font-bold dark:text-white md:text-lg lg:text-2xl">
          Create Post
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full rounded-lg bg-gray-50 p-2 placeholder:text-gray-800 dark:bg-dark-textfield dark:text-white dark:placeholder:text-white"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            className="w-full rounded-lg bg-gray-50 p-2 placeholder:text-gray-800 dark:bg-dark-textfield dark:text-white dark:placeholder:text-white"
            value={formData.authorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex w-8/12">
            <input
              type="text"
              id="imgtext"
              name="imageLink"
              placeholder="Image URL"
              className="w-full rounded-lg bg-gray-50 p-2 placeholder:text-gray-800 dark:bg-dark-textfield dark:text-white dark:placeholder:text-white"
              value={formData.imageLink}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="rounded-lg bg-black px-3 text-white hover:bg-gray-800 dark:bg-white dark:text-black"
            onClick={() => {
              setmodal(true);
            }}
          >
            Pick Image
          </button>
        </div>
        <div className="mb-4 mt-4">
          <textarea
            name="description"
            placeholder="Description"
            className="w-full rounded-lg bg-gray-50 p-2 placeholder:text-gray-800 dark:bg-dark-textfield dark:text-white dark:placeholder:text-white"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4 flex flex-col items-center md:flex-row">
          <label className="mb-2 block w-full font-semibold dark:text-white md:mr-8 md:w-fit">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <span
                key={category}
                className={`cursor-pointer
									${
                    formData.categories.includes(category)
                      ? categoryProps(category, true)
                      : categoryProps(category, false)
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="flex items-center">
            <span className="text-base font-medium text-gray-800 dark:text-white">
              Featured Post
            </span>
            <input
              type="checkbox"
              name="isFeaturedPost"
              className="ml-2 h-5 w-5 rounded border text-indigo-600 focus:ring-indigo-400"
              checked={formData.isFeaturedPost}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-black p-2 text-base text-white hover:bg-gray-800 dark:bg-white dark:text-black md:w-fit"
        >
          Create Blog
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
  );
}

export default AddBlog;
