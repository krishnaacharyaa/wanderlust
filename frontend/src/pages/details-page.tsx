import { useLocation } from "react-router-dom";
interface Post {
	_id: string;
	authorName: string;
	title: string;
	imageLink: string;
	timeOfPost: string;
	description: string;
	categories: string[];
}
const DetailsPage = () => {
	const { state } = useLocation();
	const post: Post = state?.post;
	return (
		<div className="font-[Poppins]">
			<div className="relative">
				<img
					src={post.imageLink}
					alt={post.title}
					className="h-[460px] object-cover w-full "
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
				<div className="px-64 absolute bottom-16 left-4 text-white">
					<h1 className="text-3xl font-semibold">{post.title}</h1>
					<div className="flex space-x-2 mt-6">
						{post.categories.map((category, index) => (
							<div
								key={index}
								className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
							>
								{category}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="px-64">
				<div className="mt-4">
					<p className="text-gray-700">{post.description}</p>
				</div>
				<div className="mt-4 text-gray-600">
					<p>
						{post.authorName} • {post.timeOfPost}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DetailsPage;
