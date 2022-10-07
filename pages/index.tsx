import { useState } from "react";
import { AiFillFolder, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import { RiMenuAddFill, RiCheckLine } from "react-icons/ri";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_URL;

export default function Home(props: any) {
  const [tasks, setTasks] = useState(props.tasks);
  const [task, setTask] = useState({ task: "" });

  const handleChange = ({ currentTarget: input }: any) => {
    input.value === ""
      ? setTask({ task: "" })
      : setTask((prev) => ({ ...prev, task: input.value }));
  };

  const addTask = async (e: any) => {
    e.preventDefault();
    try {
      // @ts-ignore
      if (task._id) {
        // @ts-ignore
        const { data } = await axios.put(url + "/" + task._id, {
          task: task.task,
        });
        const originalTasks = [...tasks];
        // @ts-ignore
        const index = originalTasks.findIndex((t) => t._id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask({ task: "" });
        // @ts-ignore
        console.log(data.message);
      } else {
        // @ts-ignore
        const { data } = await axios.post(url, task);
        setTasks((prev: any) => [...prev, data.data]);
        setTask({ task: "" });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id: any) => {
    const currentTask = tasks.filter((task: any) => task._id === id);
    console.log(currentTask);
    setTask(currentTask[0]);
  };

  const updateTask = async (id: any) => {
    try {
      const originalTasks = [...tasks];
      const index = originalTasks.findIndex((t) => t._id === id);
      const { data } = await axios.put(url + "/" + id, {
        completed: !originalTasks[index].completed,
      });
      originalTasks[index] = data.data;
      setTasks(originalTasks);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: any) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev: any) => prev.filter((task: any) => task._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="min-w-screen min-h-screen bg-[#dfe4e8]">
        {/* Main Container */}
        <div className="m-auto flex flex-col px-5 pt-10 md:max-w-3xl">
          {/* Add Tasks */}
          <div className="mt-2 rounded-sm bg-white shadow-lg shadow-gray-400">
            {/* Black Bar */}
            <div className="h-2 bg-black">&nbsp;</div>
            {/* Task Form */}
            <div className="px-5 py-4 md:px-20">
              <form onSubmit={addTask}>
                <div className="flex items-center justify-between gap-6">
                  <input
                    type="text"
                    placeholder="add task..."
                    className="w-full border border-gray-500 bg-[#dfe4e8] p-2 text-sm focus:outline-none"
                    onChange={handleChange}
                    value={task.task}
                  />
                  <button type="submit" className="button-pop">
                    {/* @ts-ignore */}
                    {task._id ? <RiCheckLine /> : <RiMenuAddFill />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tasks Container */}
          <div className="mt-8 rounded-sm bg-white pb-4 shadow-lg shadow-gray-400">
            {/* Black Bar */}
            <div className="h-2 bg-black">&nbsp;</div>
            {/* Tasks Title */}
            <div className="mt-2 px-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <AiFillFolder />
                  <span className="text-sm font-bold">Tasks</span>
                  <div className="ml-2 w-full border-b"></div>
                </div>
              </div>

              {/* Tasks Container */}
              <div className="flex flex-col">
                <div className="grid grid-cols-12 items-center">
                  {/* Return Arrow */}
                  <div className="col-span-1 col-start-1 -mt-6">
                    <div className="ml-1">
                      <BsArrowReturnRight />
                    </div>
                  </div>
                  {/* Task */}
                  {tasks.map((task: any) => (
                    <div
                      key={task._id}
                      className="-pb-4 col-span-11 col-start-2 mt-2 ml-2 md:-ml-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          <div className="flex items-start gap-2 break-all">
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => updateTask(task._id)}
                              className="mt-1 accent-black"
                            />
                            {task.completed ? (
                              <div className="text-sm line-through">
                                <div>{task.task}</div>
                                <div className="text-xs text-gray-500">
                                  {task.createdAt}
                                </div>
                              </div>
                            ) : (
                              <div className="break-all text-sm">
                                <div>{task.task}</div>
                                <div className="text-xs text-gray-500">
                                  {task.createdAt}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-2 flex gap-3">
                          <button
                            onClick={() => editTask(task._id)}
                            className="small-button"
                          >
                            <AiOutlineEdit />
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="small-button"
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      </div>
                      {/* Line Break HR */}
                      <div className="mt-2 border-b"></div>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="col-span-11 col-start-2 -ml-4 h-[54px]">
                      <div className="mt-4 pl-6 text-sm italic md:pl-0">
                        No Tasks
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  // @ts-ignore
  const { data } = await axios.get(url);

  return {
    props: {
      tasks: data.data,
    },
  };
};
