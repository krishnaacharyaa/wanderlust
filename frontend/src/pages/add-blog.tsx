import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
type FormData = {
	title: string;
	authorName: string;
	imageLink: string;
	categories: string[];
	description: string;
	isFeaturedPost: boolean;
};
import { FiArrowLeft } from "react-icons/fi";
import { categoryProps } from "../utils/category-props";
import axios from "axios";
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

		try {
			const response = await axios.post(
				import.meta.env.VITE_API_PATH + "/api/posts/",
				formData
			);

			if (response.status === 200) {
				console.log("Blog post successfully created!");
				navigate("/");
			} else {
				console.error("Error:", response.data.message);
			}
		} catch (err: any) {
			console.error("Error:", err.message);
		}
	};
	const navigate = useNavigate();
	return (
		<div className="font-[Poppins] p-4 px-16 bg-white ">
			<div className="flex justify-start items-center mb-4">
				<div className=" text-black cursor-pointer w-fit">
					<FiArrowLeft
						style={{ fontSize: "24px" }}
						onClick={() => navigate(-1)}
					/>
				</div>
				<h2 className="text-2xl font-bold ml-4">Create Post</h2>
			</div>

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
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((category) => (
							<span
								key={category}
								className={`cursor-pointer
									${
										formData.categories.includes(category)
											? categoryProps(category, true)
											: categoryProps(category, false)
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
				>
					Create Blog
				</button>
			</form>
		</div>
	);
}

export default AddBlog;
