import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
	_id: string;
	authorName: string;
	title: string;
	imageLink: string;
	timeOfPost: string;
	description: string;
	categories: string[];
}

function formatPostTime(time: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(time).toLocaleDateString("en-US", options);
}
function PostCard({ post }: { post: Post }) {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 ">
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
					<div className="mt-4">
						{post.categories.map((category, index) => (
							<span
								key={index}
								className={`inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2`}
							>
								{category}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function HomePage() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_PATH + "api/posts")
			.then((response) => {
				setPosts(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="px-16 font-[Poppins] container mx-auto py-6">
			<h1 className="text-3xl font-semibold mb-4">All Blog Posts</h1>
			<div className="flex flex-wrap -mx-4">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}

export default HomePage;
