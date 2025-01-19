const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Ensure MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MongoDB connection string is not defined in environment variables"
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Add timeout
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
