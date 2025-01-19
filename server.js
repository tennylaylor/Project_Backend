const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const weeklyCalendarRoutes = require("./routes/weeklyCalendarRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

//enable CORS

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
); // Update to match your frontend's port
///////app.use(cors({  origin: ["http://localhost:5173", "https://your-deployed-frontend.com"],}));//////

// Middleware to parse JSON

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/calendar", weeklyCalendarRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
