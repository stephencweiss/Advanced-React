const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createServer = require("./createServer");

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so that we can get the user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});
// TODO: Use express middleware to populate current user

server.start(
  {
    cors: { credentials: true, origin: process.env.FRONTEND_URL }
  },
  result =>
    console.log(`Server is now running on port http://localhost:${result.port}`)
);
