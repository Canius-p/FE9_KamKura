import mongoose from "mongoose";

export const connectDatabase = async (URI: string) => {
  await mongoose.connect(URI);
  console.log(`Database connection stablished`);
};
