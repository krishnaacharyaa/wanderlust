import app from "./app.js";
import connectDB from './config/db.js'
import { PORT } from "./config/utils.js";
import { connectToRedis } from "./services/redis.js";

const port = PORT || 5000

//Connect to Mongodb
connectDB()
  .then(() => {
    // Connect to redis
    connectToRedis()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      });
  });