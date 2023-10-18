import express from "express";
import postsRouter from "./routes/posts.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// API route
app.use("/posts", postsRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
