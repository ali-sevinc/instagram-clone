import { HiCamera } from "react-icons/hi2";

export default function AddPost() {
  return (
    <div className="flex flex-col h-full  items-center">
      <h2 className="border-b w-full text-center">Add new post</h2>
      <div className="flex w-full flex-col gap-2 justify-center items-center h-full">
        <button className="text-4xl text-blue-500 cursor-pointer">
          <HiCamera />
        </button>
        <input
          type="text"
          maxLength={150}
          placeholder="Enter your caption."
          className="text-center border-none focus:outline-none focus:ring rounded w-4/5 mx-auto"
        />
        <button className="bg-blue-500 text-stone-50 px-4 py-2 rounded-lg">
          Upload
        </button>
      </div>
    </div>
  );
}
