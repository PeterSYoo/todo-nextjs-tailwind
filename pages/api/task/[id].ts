import Task from "../../../models/Task";
import dbConnect from "../../../utils/dbConnect";

export default async (req: any, res: any) => {
  const { method } = req;
  const { id } = req.query;

  // connect to db
  await dbConnect();

  // update task by id
  if (method === "PUT") {
    try {
      const result = await Task.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ data: result, message: "Task updated succesfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  // delete task by id
  if (method === "DELETE") {
    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
