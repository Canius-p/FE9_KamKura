import mongoose from "mongoose";

const User = require("../model/userModel");

export const connectDatabase = async (URI: string) => {
  await mongoose.connect(URI);
  console.log(`Database connection stablished`);
};
