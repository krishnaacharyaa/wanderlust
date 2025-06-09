import app from '../app';
import connectDB from '../config/db';
import { connectToRedis } from '../services/redis';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToRedis();
  await connectDB();

  app(req, res); // Express handles it as a request
}
