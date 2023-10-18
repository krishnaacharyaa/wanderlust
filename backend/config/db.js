import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default function connectDB() {
	const url = process.env.MONGODB_URI;

	try {
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}

	const dbConnection = mongoose.connection;

	dbConnection.once("open", (_) => {
		console.log(`Database connected: ${url}`);
	});

	dbConnection.on("error", (err) => {
		console.error(`connection error: ${err}`);
	});
	return;
}
