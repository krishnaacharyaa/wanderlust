import { useNavigate } from "react-router-dom";
import Post from "../types/post-type";
import formatPostTime from "../utils/format-post-time";
import { categoryProps } from "../utils/category-props";

export default function FeaturedPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg  h-48 flex gap-4 cursor-pointer"
      onClick={() => navigate("/details-page", { state: { post } })}
    >
      <div className="w-1/3">
        <img
          src={post.imageLink}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-2/3 flex flex-col gap-2 h-full ">
        <div className="text-xl font-semibold">{post.title}</div>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <span key={index} className={categoryProps(category)}>
              {category}
            </span>
          ))}
        </div>
        <div className=" text-gray-600  line-clamp-2  ">
          <p className="overflow-ellipsis">{post.description}</p>
        </div>
        <div className=" text-gray-500 text-xs mb-1 flex-1 flex items-end  ">
          {post.authorName} • {formatPostTime(post.timeOfPost)}
        </div>
      </div>
    </div>
  );
}
