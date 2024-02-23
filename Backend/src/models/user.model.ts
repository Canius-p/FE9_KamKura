import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userScheme = new mongoose.Schema({
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
userScheme.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 6);
});

//comparing passowrds

userScheme.methods.comparePassword = async function (enteredPassword: any) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generate jwt token
userScheme.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
