import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      // set database name
      dbName: 'wanderlust',
    });
    console.log(`Database connected: ${MONGODB_URI}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
