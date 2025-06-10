import app from '../app.js';
import connectDB from '../config/db.js';
import { connectToRedis } from '../services/redis.js';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToRedis();
  await connectDB();

  app(req, res); // Express handles it as a request
}
