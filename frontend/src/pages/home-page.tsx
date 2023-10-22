import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from "../types/post-type";
import PostCard from "../components/post-card";
import LatestPostCard from "../components/latest-post-card";
import FeaturedPostCard from "../components/featured-post-card";

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
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	const navigate = useNavigate();
	return (
		<div className="font-[Poppins] container mx-auto ">
			<div className="relative h-[460px] bg-cover mt-[-8px] bg-fixed bg-center bg-[url('https://get.wallhere.com/photo/landscape-sea-beach-hotel-swimming-pool-resort-tropical-lagoon-Caribbean-vacation-estate-leisure-villa-225624.jpg')]">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="absolute inset-0 flex flex-col px-16 py-8 text-white">
					<div className="flex justify-between w-full ">
						<div className="text-2xl font-semibold">WanderLust</div>
						<button
							className="border border-white rounded px-4 py-2"
							onClick={() => {
								navigate("/add-blog");
							}}
						>
							Create post
						</button>
					</div>
					<div className="flex flex-1 flex-col justify-end pb-8 max-w-5xl">
						<h1 className="text-4xl font-bold">Journey Beyond Horizons</h1>
						<p className="text-xl my-4">
							Dive into the World of Travel with Stories That Transport You to
							Far-Off Lands. Adventure awaits around every corner. It's time to
							explore the world!
						</p>
						<div className="   text-xl font-semibold">Let's Go !!!</div>
					</div>
				</div>
			</div>
			<div className="px-16">
				<PostList />
				<h1 className="text-3xl font-semibold ">All Blog Posts</h1>
				<div className="flex flex-wrap -mx-4">
					{posts.map((post) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			</div>
		</div>
	);
}

export default HomePage;
