import { useLocation, useNavigate } from "react-router-dom";
import formatPostTime from "../utils/format-post-time";
import Post from "../types/post-type";
import { FiArrowLeft } from "react-icons/fi";

const DetailsPage = () => {
	const { state } = useLocation();
	const post: Post = state?.post;
	const navigate = useNavigate();
	return (
		<div className="font-[Poppins]">
			<div className="relative">
				<img
					src={post.imageLink}
					alt={post.title}
					className="h-[460px] object-cover w-full "
				/>

				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
				<div className="px-64 text-white absolute top-16 left-0 cursor-pointer">
					<FiArrowLeft
						style={{ fontSize: "36px" }}
						onClick={() => navigate(-1)}
					/>
				</div>
				<div className="px-64 absolute bottom-16  text-white">
					<div className="flex space-x-2 mb-6">
						{post.categories.map((category, index) => (
							<div
								key={index}
								className="bg-gray-500 text-white rounded-full px-3 py-1 text-sm"
							>
								{category}
							</div>
						))}
					</div>
					<h1 className="text-4xl font-semibold ">{post.title}</h1>
				</div>
			</div>
			<div className="px-64">
				<div className="mt-4">
					<p className=" text-gray-700">{post.description}</p>
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
