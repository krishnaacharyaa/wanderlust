import { Router } from 'express'
const router = Router()
import Post from '../models/post.js'

// Create a new post
router.post('/', async (req, res, next) => {
	console.log('Create new post triggered')
	try {
		const { authorName, title, imageLink, categories, description } = req.body
		if (!authorName || !title || !imageLink || categories.length < 1 || !description) {
			req.clientError = true
			throw 'Missing one or more details'
		}
		const post = new Post(req.body)
		const savedPost = await post.save()
		res.json(savedPost)
	} catch (err) {
		next(err)
	}
})

// Get all posts
router.get('/', async (_, res, next) => {
	console.log('Get all posts triggered')
	try {
		const posts = await Post.find()
		console.log(posts)
		res.json(posts)
	} catch (err) {
		next(err)
	}
})

// Route to get featured posts
router.get('/featured-posts', async (req, res, next) => {
	console.log('Get featured posts triggered')
	try {
		const featuredPosts = await Post.find({ isFeaturedPost: true })
		res.json(featuredPosts)
	} catch (err) {
		next(err)
	}
})

// Route to get posts by category
router.get('/category/:category', async (req, res, next) => {
	console.log('Get category post triggered')
	const category = req.params.category
	try {
		const categoryPosts = await Post.find({ categories: category })
		res.json(categoryPosts)
	} catch (err) {
		req.from = 'Category'
		next(err)
	}
})

// Route for fetching the latest posts
router.get('/latestposts', async (_, res, next) => {
	console.log('Get latest post triggered')
	try {
		const latestPosts = await Post.find().sort({ timeOfPost: -1 })
		res.json(latestPosts)
	} catch (err) {
		next(err)
	}
})
// Get a specific post by ID
router.get('/:id', async (req, res, next) => {
	console.log('Get post triggered')
	try {
		const post = await Post.findById(req.params.id)
		res.json(post)
	} catch (err) {
		req.from = 'Post'
		next(err)
	}
})

// Update a post by ID
router.patch('/:id', async (req, res, next) => {
	console.log('Update post triggered')
	try {
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		})
		res.json(updatedPost)
	} catch (err) {
		req.from = 'Post'
		next(err)
	}
})

// Delete a post by ID
router.delete('/:id', async (req, res, next) => {
	console.log('Delete post triggered')
	try {
		await Post.findByIdAndRemove(req.params.id)
		res.json({ message: 'Post deleted' })
	} catch (err) {
		req.from = 'Post'
		next(err)
	}
})

export default router
