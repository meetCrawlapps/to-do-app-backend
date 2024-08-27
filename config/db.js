const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect("mongodb://localhost:27017/to-do", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DATABASE_NAME,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
