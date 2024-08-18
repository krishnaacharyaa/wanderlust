import app from './app';
import connectDB from './config/db';
import { PORT } from './config/utils';
import { connectToRedis } from './services/redis.js';

const server = () => {
  const port = PORT || 8080;

  // Redis connection
  connectToRedis();
  // mongodb connection
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.log('MongoDB connection failed:', error);
    });
};
server();

export default server;
