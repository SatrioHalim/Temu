import mongoose, { connect } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-temu",
    });

    return Promise.resolve("Database connected successfully");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectDB;
