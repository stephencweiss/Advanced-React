const cookieParser = require("cookie-parser")
require("dotenv").config();
const createServer = require("./createServer");

const server = createServer();

server.express.use(cookieParser())
// TODO: Use express middleware to populate current user

server.start(
  {
    cors: { credentials: true, origin: process.env.FRONTEND_URL }
  },
  result =>
    console.log(`Server is now running on port http://localhost:${result.port}`)
);
