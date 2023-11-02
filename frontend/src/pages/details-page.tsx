import { useLocation, useNavigate } from 'react-router-dom';
import formatPostTime from '../utils/format-post-time';
import Post from '../types/post-type';
import leftarrow from '../assets/left-arrow.png'

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
        <div className="top-16 px-4 md:px-8 lg:px-16 md:top-24 w-full justify-start  text-lg md:text-xl lg:text-2xl text-white absolute cursor-pointer">
          <img src={leftarrow}  style={{height:20, width:40}}onClick={() => navigate(-1)} />
        </div>
        <div className=" px-4 md:px-8 lg:px-16 w-full absolute bottom-4 md:bottom-8  lg:bottom-16  text-white">
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
      <div className="px-4 md:px-8 lg:px-16 pt-4 md:pt-8 lg:pt-16  text-left w-full flex flex-col gap-y-4">
        <div>
          <p className=" text-gray-700 ">{post.description}</p>
        </div>
        <div className="">
          <p className=" font-semibold text-gray-600">By {post.authorName}</p>
          <p className="text-sm">{formatPostTime(post.timeOfPost)}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
