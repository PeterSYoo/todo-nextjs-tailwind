import mongoose from "mongoose";

const moment = require("moment");
let date = new Date();
date = moment(date).format("YYYY-MM-DD");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: String, default: date },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
