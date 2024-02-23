import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name is too large"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  phone: {
    type: Number,
    required: [true, "Please provide a phone number"],
    validate: {
      validator: validator.isMobilePhone,
      message: "Please provide a valid phone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Employee", "Employer"],
    default: "Employee",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hasing the pass
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 6);
});

//comparing passowrds

userSchema.methods.comparePassword = async function (enteredPassword: any) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

//generate jwt token
userSchema.methods.getJwtToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
