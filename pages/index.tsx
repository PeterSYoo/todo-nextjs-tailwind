import {
  AiFillFolder,
  AiOutlineEdit,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import { RiMenuAddFill } from "react-icons/ri";

export default function Home() {
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
            <div className="p-4">
              <form>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="add task..."
                    className="w-full border border-gray-500 bg-[#dfe4e8] p-2 text-sm text-gray-600"
                  />
                  <div className="rounded-lg py-2 px-4 shadow shadow-gray-900">
                    <RiMenuAddFill />
                  </div>
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
              <div className="mt-4 flex flex-col">
                {/* Task */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="ml-2">
                      <BsArrowReturnRight />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Task Name</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <AiOutlineEdit />
                    <AiOutlineCloseCircle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
