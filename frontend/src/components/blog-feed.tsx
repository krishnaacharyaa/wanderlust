import LatestPostCard from "../components/latest-post-card";
import FeaturedPostCard from "../components/featured-post-card";
import { CATEGORIES } from "../constants/categories";
import axios from "axios";
import { useState, useEffect } from "react";
export default function BlogFeed() {
	const [selectedCategory, setSelectedCategory] = useState("featured");
	const [posts, setPosts] = useState([]);
	const [latestPosts, setLatestPosts] = useState([]);

	useEffect(() => {
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
							{CATEGORIES.map((category) => (
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
