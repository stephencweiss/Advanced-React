const cookieParser = require("cookie-parser");
const {getUser} = require('./middleware/getUser')
require("dotenv").config();
const createServer = require("./createServer");

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so that we can get the user id on each request
server.express.use(getUser);
// TODO: Use express middleware to populate current user

server.start(
  {
    cors: { credentials: true, origin: process.env.FRONTEND_URL }
  },
  result =>
    console.log(`Server is now running on port http://localhost:${result.port}`)
);
