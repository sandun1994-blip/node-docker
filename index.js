const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_PORT,
  REDIS_URL,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
var session = require('express-session')
const app = express();
const RedisStore = require("connect-redis").default




let redisClient = createClient({url:'redis://redis:6379'})
redisClient.connect().catch(console.error)
let redisStore = new RedisStore({
  client: redisClient
})





app.use(express.json());
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`; 

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {})
    .then(() => {
      console.log("sucessfully conected DB ", MONGO_USER);
    })
    .catch((err) => {
      console.log(err);

      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// let redisClient = createClient({ url: 'redis://redis:6379'});


// redisClient.connect().catch((err) => {
//   console.log(err);
// });



// // Initialize store.
// let redisStore = new RedisStore({
//   client: redisClient,
// });

app.enable('trust proxy');

// Initialize session storage.

app.use(session({
  store: redisStore,
  secret: 'keyboard cat',
  resave: false,
  secret: SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
          secure: false,
           resave: false,
           httpOnly: true,
          maxAge: 300000,
         },
}))

let i =0

app.get("/api/v1", (req, res) => {
  console.log('yt it ran');
  res.send({ name: "sandun  5 " }); 
  i++
  console.log('yt it ran',i);
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log("port listen ", port); 
});
