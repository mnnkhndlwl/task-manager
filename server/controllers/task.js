import User from "../models/User.js";
import Task from "../models/Task.js";
import { createError } from "../utils/error.js";

export const addTask = async (req, res, next) => {
  const newTask = new Task({ userId: req.user.id, ...req.body });
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
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

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.user.id === task.userId) {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTask);
    } else {
      return next(createError(403, "You can update only your Task!"));
    }
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

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.user.id === task.userId) {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json("The Task has been deleted.");
    } else {
      return next(createError(403, "You can delete only your Task!"));
    }
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

export const getTasks = async (req, res, next) => {
  try {
    const user = await req.user;
    const tasks = await Task.find({ userId: user.id });
    res.status(200).json(tasks);
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
