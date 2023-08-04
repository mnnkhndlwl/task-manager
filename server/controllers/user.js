import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    // Check if the user already exists
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser) {
      return next(createError(400, "user with same username already exists"));
    }

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        return next(createError(400, err.message));
      case "NotFoundError":
        return next(createError(404, err.message));
      case "UserAlreadyExistsError":
        return next(createError(400, "User with the same name already exists"));
      default:
        return next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if(!user) return next(createError(404, "User Not found"));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials"));
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res.status(200).json({ token, ...others });
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        return next(createError(400, error.message));
      case "NotFoundError":
        return next(createError(404, error.message));
      default:
        return next(error);
    }
  }
};
