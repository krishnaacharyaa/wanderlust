import { useLocation, useNavigate } from 'react-router-dom';
import formatPostTime from '../utils/format-post-time';
import Post from '../types/post-type';
import { FiArrowLeft } from 'react-icons/fi';

const DetailsPage = () => {
  const { state } = useLocation();
  const post: Post = state?.post;
  const navigate = useNavigate();
  return (
    <div className="w-full font-[Poppins] ">
      <div className="relative flex flex-col">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-[360px] md:h-[460px] object-cover w-full"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="top-16 pl-10 md:top-24 md:pl-32 w-full justify-start lg:px-64 text-lg md:text-xl lg:text-2xl text-white absolute cursor-pointer">
          <FiArrowLeft onClick={() => navigate(-1)} />
        </div>
        <div className="md:px-32 lg:px-64 px-8 w-full absolute bottom-16 md:bottom-40 p-4 lg:bottom-16  text-white">
          <div className="flex space-x-2 mb-6">
            {post.categories.map((category, index) => (
              <div key={index} className="bg-gray-500 text-white rounded-full px-3 py-1 text-sm">
                {category}
              </div>
            ))}
          </div>
          <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold ">{post.title}</h1>
        </div>
      </div>
      <div className="md:pl-32 lg:px-64  text-left w-full p-6">
        <div className="mt-4">
          <p className=" text-gray-700 ">{post.description}</p>
        </div>
        <div className="mt-4 ">
          <p className=" font-semibold text-gray-600">By {post.authorName}</p>
          <p className="text-sm">{formatPostTime(post.timeOfPost)}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
