import { catchAsync } from "./catchAsync.error";
import ErrorHandler from "./error.handle";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(
  async (req: any, res: any, next: any) => {
    const token = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
  }
);
