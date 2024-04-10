"use client";

import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useRef, useState } from "react";
import { HiCamera } from "react-icons/hi2";

export default function AddPost() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  function handleAddImage(event: ChangeEvent<HTMLInputElement>) {
    const image = event?.target?.files?.[0];
    if (!image) return;
    setSelectedFile(image);
    console.log(URL.createObjectURL(image));
  }

  async function handleUploadImageToStorage() {
    setIsLoading(true);
    if (!selectedFile) return;

    const storage = getStorage(app);
    const fileName = `${Math.random()}${new Date().getTime()}-${
      selectedFile?.name
    }`;
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, selectedFile);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("[Uploading progress]: ", progress);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
        setSelectedFile(null);
      },
      () => {
        setIsLoading(false);
        setSelectedFile(null);
      }
    );
  }

  return (
    <div className="flex flex-col h-full w-full  items-center">
      <h2 className="border-b w-full text-center">Add new post</h2>
      <div className="flex w-full flex-col gap-2 justify-center items-center h-full">
        {!selectedFile && (
          <button
            onClick={() => imageRef.current?.click()}
            className="text-4xl text-blue-500 cursor-pointer"
          >
            <HiCamera />
          </button>
        )}
        {selectedFile && (
          <img
            onClick={() => imageRef.current?.click()}
            alt="selected image"
            src={URL.createObjectURL(selectedFile)}
            className={`cursor-pointer w-full ${
              isLoading ? "animate-pulse" : ""
            }`}
          />
        )}
        <input
          id="pick-image"
          accept="image/*"
          type="file"
          hidden
          ref={imageRef}
          onChange={handleAddImage}
        />
        <input
          type="text"
          maxLength={150}
          placeholder="Enter your caption."
          className="text-center border-none focus:outline-none focus:ring rounded w-4/5 mx-auto mt-4"
        />
        {selectedFile && (
          <button
            onClick={handleUploadImageToStorage}
            className="bg-blue-500 text-stone-50 px-4 py-2 rounded-lg"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
