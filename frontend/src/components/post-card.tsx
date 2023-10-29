import { useNavigate } from "react-router-dom";
import Post from "../types/post-type";
import formatPostTime from "../utils/format-post-time";
import { categoryProps } from "../utils/category-props";

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 cursor-pointer"
      onClick={() => navigate("/details-page", { state: { post } })}
    >
      <div className="bg-white rounded-lg shadow-md">
        <img
          src={post.imageLink}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="p-4">
          <div className="text-gray-500 text-xs mb-2">
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-2">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span key={index} className={categoryProps(category)}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
