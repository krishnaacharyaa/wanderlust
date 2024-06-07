import app from './app';
import connectDB from './config/db';
import { PORT } from './config/utils';
import { connectToRedis } from './services/redis';

const port = PORT || 8080;

// Connect to redis
connectToRedis();

//Connect to Mongodb
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error);
  });
