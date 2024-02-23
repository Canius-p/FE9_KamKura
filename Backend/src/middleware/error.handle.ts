import { Request, NextFunction, Response } from "express";

class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "jsonwebtokenError") {
    const message = "Json web token is invalid, try again!";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "tokenExpiredError") {
    const message = "Json web token is expired, try again!";
    err = new ErrorHandler(message, 400);
  }
  return res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
