import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router";
import jobRouter from "./routes/job.router";
import applicationRouter from "./routes/application.router";
import { connectDatabase } from "./database/connect.database";
const app = express();
dotenv.config({ path: "../../Backend/" });

app.use(
  cors({
    origin: ["process.env.FRONTEND_URL"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
const URI = process.env.MONGO_URI;
connectDatabase(URI!);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

export default app;
