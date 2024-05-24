const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./src/models/connect");
require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

const signUp = require("./src/routes/auth/signup");
const login = require("./src/routes/auth/login");
const logout = require("./src/routes/logout/logout");
const authorize = require("./src/middleware/authorize");
const dashboard = require("./src/routes/Dashboard/dashboard");
const protect = require("./src/routes/auth/protected");
const switchMode = require("./src/routes/Dashboard/switch");
const findMode = require("./src/routes/Dashboard/findMode");
const selectLocation = require("./src/routes/findRide/selectLocation");
const findMatch = require("./src/routes/findRide/findMatches");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>CUber is ready to take off</h1>");
});

// auth
app.use("/auth/signup", signUp);
app.use("/auth/login", login);

// authorization middleware
app.use(authorize);

// routes that needs authorization
app.use("/user/switch", switchMode);
app.use("/user/dashboard", dashboard);
app.use("/logout", logout);
app.use("/protected", protect);
app.use("/user/findMode", findMode);
app.use("/user/selectLocation", selectLocation);
app.use("/user/findMatch", findMatch);

const start = async () => {
  await connect(URL);
  app.listen(PORT, () => console.log(`server listening to port ${PORT}`));
};

start();
