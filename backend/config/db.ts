import mongoose, { AnyArray } from 'mongoose';
import { MONGODB_URI } from './utils.js';
import logger from './logger.js';

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI as string, {
      dbName: 'wanderlust',
    });
    logger.info(`Database connected: ${MONGODB_URI}`);
  } catch (err: any) {
    logger.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err) => {
    logger.error(`connection error: ${err}`);
  });
  return;
}
