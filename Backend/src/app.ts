import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config({ path: "../../Backend/" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
