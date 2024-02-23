import { catchAsync } from "../middleware/catchAsync.error";
import ErrorHandler from "../middleware/error.handle";
import { User } from "../models/user.model";

export const register = catchAsync(async (req: any, res: any, next: any) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return next(new ErrorHandler("Email already exist", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});
