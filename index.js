const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connect = require("./src/models/connect");
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
const completeDriverDetails = require("./src/routes/driver/register");
const approve = require("./src/routes/driver/approve");
const getDriverLocation = require("./src/routes/driver/driverLocation");
const createRide = require("./src/routes/driver/createRide");
const refreshToken = require("./src/routes/auth/refreshToken");
const activeRide = require("./src/routes/Dashboard/activeRide");
const deletePassengerRide = require("./src/routes/util/deletePassengerRide");
const getDriverDetails = require("./src/routes/driver/driverDetails");
const sendRequest = require("./src/routes/findRide/sendRequest");
const getInbox = require("./src/routes/Dashboard/inbox");
const deleteRequest = require("./src/routes/Dashboard/deleteRequest");
const acceptRequest = require("./src/routes/Dashboard/acceptRequest");
const notification = require("./src/routes/Dashboard/notification");
const deleteNotification = require("./src/routes/util/deleteNotification");
const readNotification = require("./src/routes/util/readNotification");

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const URL = process.env.MONGODB_URL;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.disable("x-powered-by");

// Auth routes
app.use("/auth/signup", signUp);
app.use("/auth/login", login);

// Authorization middleware
app.use(authorize);

// Protected routes
app.use("/user/switch", switchMode);
app.use("/user/dashboard", dashboard);
app.use("/logout", logout);
app.use("/protects", protect);
app.use("/user/findMode", findMode);
app.use("/user/selectLocation", selectLocation);
app.use("/user/findMatch", findMatch);
app.use("/user/completeDriverDetails", completeDriverDetails);
app.use("/user/approve", approve);
app.use("/user/createRide", createRide);
app.use("/user/getDriverLocation", getDriverLocation);
app.use("/auth/refreshToken", refreshToken);
app.use("/user/activeRide", activeRide);
app.use("/deletePassengerRide", deletePassengerRide);
app.use("/user/getDriverDetails", getDriverDetails);
app.use("/user/sendRequest", sendRequest);
app.use("/user/Inbox", getInbox);
app.use("/user/deleteRequest", deleteRequest);
app.use("/user/acceptRequest", acceptRequest);
app.use("/user/notification", notification);
app.use("/user/deleteNotification", deleteNotification);
app.use("/user/readNotification", readNotification);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Page not found" });
});
// send("<h1>Page not found</h1>")

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const startServer = async () => {
  try {
    await connect(URL);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
