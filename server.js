const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const calendarRoutes = require("./routes/calendarRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware to parse JSON

app.use(express.json());
app.use("/api/calendar", calendarRoutes);

//enable CORS

app.use(cors({ origin: "http://localhost:5173" })); // Update to match your frontend's port
///////app.use(cors({  origin: ["http://localhost:5173", "https://your-deployed-frontend.com"],}));//////

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/todos", todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
