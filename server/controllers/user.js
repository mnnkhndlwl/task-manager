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

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        return next(createError(400, err.message));
      case "NotFoundError":
        return next(createError(404, err.message));
      default:
        return next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    await bcrypt.compare(req.body.password, user.password);

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
