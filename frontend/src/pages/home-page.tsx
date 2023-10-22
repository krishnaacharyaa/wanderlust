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
function PostList() {
	const [selectedCategory, setSelectedCategory] = useState("featured");
	const [posts, setPosts] = useState([]);
	const categories = [
		"Travel",
		"Nature",
		"City",
		"Adventure",
		"Beaches",
		"Landmarks",
		"Mountains",
	];
	const [latestPosts, setLatestPosts] = useState([]);

	useEffect(() => {
		// Fetch posts based on selected category (or featured posts if "featured" is selected)
		let categoryEndpoint =
			selectedCategory === "featured"
				? "/api/posts/featured-posts"
				: `/api/posts/category/${selectedCategory}`;

		axios
			.get(import.meta.env.VITE_API_PATH + categoryEndpoint)
			.then((response) => {
				setPosts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [selectedCategory]);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_PATH + "/api/posts/latestposts")
			.then((response) => {
				setLatestPosts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="container mx-auto py-6">
			<div className="flex flex-wrap -mx-4">
				<div className="w-full md:w-2/3 p-4">
					<h1 className="text-2xl font-semibold">
						{selectedCategory === "featured"
							? "Featured Posts"
							: `Posts in ${selectedCategory}`}
					</h1>
					<div className="flex flex-col gap-4">
						{posts.slice(0, 5).map((post) => (
							<FeaturedPostCard post={post} />
						))}
					</div>
				</div>
				<div className="w-full md:w-1/3 p-4">
					<div className="mb-4">
						<h2 className="text-xl font-semibold mb-2">Categories</h2>
						<div className="flex flex-wrap">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() =>
										setSelectedCategory(
											selectedCategory === category ? "featured" : category
										)
									}
									className={`px-2 py-1 rounded-full mr-2 mb-2 ${
										selectedCategory === category
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-700"
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>
					<div>
						<h2 className="text-xl font-semibold mb-2">Latest Posts</h2>
						<div className="flex  flex-col gap-2">
							{latestPosts.slice(0, 5).map((post) => (
								<LatestPostCard post={post} />
							))}
						</div>
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
			.get(import.meta.env.VITE_API_PATH + "/api/posts")
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
			<PostList />
			<h1 className="text-3xl font-semibold mb-4">All Blog Posts</h1>
			<div className="flex flex-wrap -mx-4">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}

function FeaturedPostCard({ post }: { post: Post }) {
	return (
		<div className="bg-white rounded-lg  h-48 flex gap-4 ">
			<div className="w-1/3">
				<img
					src={post.imageLink}
					alt={post.title}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="w-2/3 flex flex-col gap-2 h-full ">
				<div className="text-xl font-semibold">{post.title}</div>
				<div className="flex flex-wrap">
					{post.categories.map((category, index) => (
						<span
							key={index}
							className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
						>
							{category}
						</span>
					))}
				</div>
				<div className=" text-gray-600  line-clamp-2  ">
					<p className="overflow-ellipsis">{post.description}</p>
				</div>
				<div className=" text-gray-500 text-xs mb-1 flex-1 flex items-end  ">
					{post.authorName} • {post.timeOfPost}
				</div>
			</div>
		</div>
	);
}

function LatestPostCard({ post }: { post: Post }) {
	return (
		<div className="bg-white rounded-lg  p-4 shadow-sm">
			<div className="flex flex-wrap mb-2">
				{post.categories.map((category, index) => (
					<span
						key={index}
						className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2"
					>
						{category}
					</span>
				))}
			</div>
			<div className="text-xl font-semibold mb-2 line-clamp-2">
				{post.title}
			</div>
			<div className="text-gray-500 text-xs">
				{post.authorName} • {post.timeOfPost}
			</div>
		</div>
	);
}
export default HomePage;
