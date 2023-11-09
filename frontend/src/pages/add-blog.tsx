import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigateBackBlackIcon from '../assets/svg/navigate-back-black.svg';
import { CATEGORIES } from '../constants/categories';
import { categoryProps } from '../utils/category-props';
const imageUrls = [
  'https://i.ibb.co/3z72vmc/clean-lake-mountains-range-trees-nature-4k.webp',
  'https://i.ibb.co/y8vQnDc/c4fedab1-4041-4db5-9245-97439472cf2c.webp',
  'https://i.ibb.co/BNjv5Nn/London-Skyline-125508655.webp',
  'https://i.ibb.co/d0g42nr/FPO-BOR-100-800x600.webp',
  'https://i.ibb.co/52mk2Yq/sunset-pier.webp',
  'https://i.ibb.co/KLwfZzG/Maldives-1024x767.webp',
  'https://i.ibb.co/qxFMj1H/sunset-horizon-clean-sky-nature.webp',
];
type FormData = {
  title: string;
  authorName: string;
  imageLink: string;
  categories: string[];
  description: string;
  isFeaturedPost: boolean;
};
function AddBlog() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    // const imageLinkRegex = /\.(jpg|jpeg|png)$/i;
    // if (!imageLinkRegex.test(formData.imageLink)) {
    //   toast.error('Image URL must end with .jpg, .jpeg, or .png');
    //   return false;
    // }
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
        <div className='flex'>

        <div className="mb-4 flex flex-1 mr-16">
          <input
            type="text"
            id="imgtext"
            name="imageLink"
            placeholder="Image URL"
            className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
            value={formData.imageLink}
            onChange={handleInputChange}
            />
        </div>
        <button
                 type="button"
                 className="bg-black text-white items-center justify-center text-base p-2 rounded-lg hover:bg-gray-800 w-full md:w-fit flex flex-2"
                 onClick={() => {
                   setmodal(true);
                  }}
                  >
                  Pick Image
        	        </button>
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
      {modal && ( //MODAL STARTS
        <div className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="false"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Select Post Image
                    </h3>
                    <div className="mt-2">
                      <div className="grid grid-cols-3 gap-4">
                        {imageUrls.map((imageUrl) => (
                          <div
                            key={imageUrl}
                            className={`cursor-pointer p-2 border ${
                              selectedImage === imageUrl ? 'border-blue-500' : 'border-gray-300'
                            } rounded-md`}
                            onClick={() => handleImageSelect(imageUrl)}
                          >
                            <img
                              src={imageUrl}
                              alt={`Image ${imageUrl}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  name="imageLink"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    const url = selectedImage;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      imageLink: url,
                    }));
                    setmodal(false);
                  }}
                >
                  Select
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    setmodal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> //MODAL ENDS
    )}
    </div>
  );
}

export default AddBlog;
