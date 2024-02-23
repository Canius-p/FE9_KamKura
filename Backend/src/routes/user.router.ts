import express, { Express, Request, Response } from "express";
import { register } from "../controller/user.controller";

const router = express.Router();

router.post("/register", register);
export default router;
