import { Router } from "express";
const router = Router();
import Post from "../models/post.js";

// Create a new post
router.post("/", async (req, res) => {
	try {
		const post = new Post(req.body);
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get featured posts
router.get("/featured-posts", async (req, res) => {
	try {
		const featuredPosts = await Post.find({ isFeaturedPost: true });
		res.json(featuredPosts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get posts by category
router.get("/category/:category", async (req, res) => {
	const category = req.params.category;
	try {
		const categoryPosts = await Post.find({ categories: category });
		res.json(categoryPosts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route for fetching the latest posts
router.get("/latestposts", async (req, res) => {
	try {
		const latestPosts = await Post.find().sort({ timeOfPost: -1 });
		res.json(latestPosts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
// Get a specific post by ID
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.json(post);
	} catch (err) {
		res.status(404).json({ message: "Post not found" });
	}
});

// Update a post by ID
router.patch("/:id", async (req, res) => {
	try {
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: "Post not found" });
	}
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
	try {
		await Post.findByIdAndRemove(req.params.id);
		res.json({ message: "Post deleted" });
	} catch (err) {
		res.status(404).json({ message: "Post not found" });
	}
});

export default router;
