import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    isCompleted : {
      type : Boolean,
      default : false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);