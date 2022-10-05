import Task from "../../../models/Task";
import dbConnect from "../../../utils/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const { method } = req;

  // Connect to database
  await dbConnect();

  // Create task
  if (method === "POST") {
    try {
      const newTask = await new Task(req.body).save();
      res
        .status(201)
        .json({ data: newTask, message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  if (method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json({ data: tasks });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
