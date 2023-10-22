import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type FormData = {
	title: string;
	authorName: string;
	imageLink: string;
	categories: string[];
	description: string;
	isFeaturedPost: boolean;
};

const predefinedCategories = [
	"Adventure",
	"Food",
	"Nature",
	"Culture",
	"Travel Tips",
];

function AddBlog() {
	const [formData, setFormData] = useState<FormData>({
		title: "",
		authorName: "",
		imageLink: "",
		categories: [],
		description: "",
		isFeaturedPost: false,
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleCategoryClick = (category: string) => {
		if (formData.categories.includes(category)) {
			setFormData({
				...formData,
				categories: formData.categories.filter((cat) => cat !== category),
			});
		} else {
			setFormData({
				...formData,
				categories: [...formData.categories, category],
			});
		}
	};

	const handleCheckboxChange = () => {
		setFormData({ ...formData, isFeaturedPost: !formData.isFeaturedPost });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		console.log("API PATH", import.meta.env.VITE_API_PATH);
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_PATH + "/api/posts/",
				formData
			);

			if (response.status === 200) {
				console.log("Blog post successfully created!");
			} else {
				console.error("Error:", response.data.message);
			}
		} catch (err: any) {
			console.error("Error:", err.message);
		}
	};
	const navigate = useNavigate();
	return (
		<div className="p-4 px-16 bg-white shadow">
			<h2 className="text-2xl font-bold mb-4">Create Post</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						type="text"
						name="title"
						placeholder="Title"
						className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
						value={formData.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-4">
					<input
						type="text"
						name="authorName"
						placeholder="Author Name"
						className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
						value={formData.authorName}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-4">
					<input
						type="text"
						name="imageLink"
						placeholder="Image URL"
						className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
						value={formData.imageLink}
						onChange={handleInputChange}
					/>
				</div>

				<div className="mb-4">
					<textarea
						name="description"
						placeholder="Description"
						className="w-full p-2 rounded-lg bg-gray-50 placeholder:text-gray-800 "
						value={formData.description}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-4 flex items-center ">
					<label className="block font-semibold mb-2 mr-8">Categories</label>
					<div>
						{predefinedCategories.map((category, index) => (
							<span
								key={category}
								className={`mr-4 px-3 py-2 rounded-3xl cursor-pointer  ${
									formData.categories.includes(category)
										? getSelectedCategoryBackgroundColor(index)
										: getCategoryBackgroundColor(index)
								}`}
								onClick={() => handleCategoryClick(category)}
							>
								{category}
							</span>
						))}
					</div>
				</div>
				<div className="mb-4 flex items-center">
					<label className="flex items-center">
						<input
							type="checkbox"
							name="isFeaturedPost"
							className="mr-2 h-5 w-5 text-indigo-600 border rounded focus:ring-indigo-400"
							checked={formData.isFeaturedPost}
							onChange={handleCheckboxChange}
						/>
						<span className="text-gray-800 text-base font-medium">
							Featured Post
						</span>
					</label>
				</div>

				<button
					type="submit"
					className="bg-black text-white p-2 rounded-lg hover:bg-gray-800"
					onClick={() => navigate("/")}
				>
					Create Blog
				</button>
			</form>
		</div>
	);
}

function getCategoryBackgroundColor(index: number): string {
	const colors = [
		"bg-pink-100",
		"bg-green-100",
		"bg-yellow-100",
		"bg-blue-100",
		"bg-purple-100",
	];
	return colors[index % colors.length];
}

function getSelectedCategoryBackgroundColor(index: number): string {
	const colors = [
		"bg-pink-500",
		"bg-green-500",
		"bg-yellow-500",
		"bg-blue-500",
		"bg-purple-500",
	];
	return colors[index % colors.length];
}
export default AddBlog;
