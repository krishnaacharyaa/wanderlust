import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export default function connectDB() {
  const url = process.env.MONGODB_URI;

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
