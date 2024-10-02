import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGODB_URI}/user-data`);
    console.log("MONGODB CONNECTION:", con.connection.host);
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:", error.message);
    process.exit(1); // 1 for faliure / 0 for Success
  }
};
