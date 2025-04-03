require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests
app.use(cookieParser());

// Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
