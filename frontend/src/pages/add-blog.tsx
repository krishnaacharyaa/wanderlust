import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '../assets/svg/navigate-back-black.svg';
import { CATEGORIES } from '../constants/categories';
import { categoryProps } from '../utils/category-props';
type FormData = {
  title: string;
  authorName: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
};
function AddBlog() {
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

    const imageLinkRegex = /\.(jpg|jpeg|png)$/i;
    if (!imageLinkRegex.test(formData.imageLink)) {
      toast.error('Image URL must end with .jpg, .jpeg, or .png');
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
  return (
    <div className="font-[Poppins] p-4 px-16 bg-white ">
      <div className="flex justify-start items-center mb-4">
        <div className=" text-black cursor-pointer w-fit  text-base md:text-lg lg:text-2xl">
          <img
            src={navigateBackBlackIcon}
            style={{ height: 20, width: 40 }}
            onClick={() => navigate(-1)}
          />
        </div>
        <h2 className="text-sm md:text-lg  lg:text-2xl font-bold ml-4">Create Post</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
            value={formData.authorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="imageLink"
            placeholder="Image URL"
            className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
            value={formData.imageLink}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4 mb-4 ">
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4 flex items-center flex-col md:flex-row ">
          <label className="block font-semibold mb-2 w-full md:w-fit  md:mr-8">Categories</label>
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
            <span className="text-gray-800 text-base font-medium">Featured Post</span>
            <input
              type="checkbox"
              name="isFeaturedPost"
              className="ml-2 h-5 w-5 text-indigo-600 border rounded focus:ring-indigo-400"
              checked={formData.isFeaturedPost}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-black text-white flex items-center justify-center text-base p-2 rounded-lg hover:bg-gray-800 w-full md:w-fit"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
