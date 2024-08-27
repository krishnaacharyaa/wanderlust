import app from './app.js';
import connectDB from './config/db.js';
import { PORT } from './config/utils.js';
import { connectToRedis } from './services/redis.js';

const server = () => {
  const port = PORT || 8080;

  // Redis connections
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
