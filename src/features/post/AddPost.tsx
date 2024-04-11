"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

import { HiCamera } from "react-icons/hi2";

type Session = {
  data: { user: { username: string; userId: string; image: string } } | null;
};
export default function AddPost({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  //image informations
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //post informations.
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<null | string>(null);

  //initialize db
  const db = getFirestore(app);
  //call session
  const { data: session } = useSession() as Session;

  //handle change image
  function handleAddImage(event: ChangeEvent<HTMLInputElement>) {
    setIsError(null);
    const image = event?.target?.files?.[0];
    if (!image) return;

    setSelectedFile(image);
  }

  const handleUploadImageToStorage = useCallback(
    async function handleUploadImageToStorage() {
      setIsLoading(true);
      if (!selectedFile) return;

      //create unique filename for storage.
      const storage = getStorage(app);
      const fileName = `${Math.random()}${new Date().getTime()}-${
        selectedFile?.name
      }`;

      //reffered firebase-storage and fileName for path
      const storageRef = ref(storage, fileName);

      //uploading selected image to storage.
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
          setIsError("Uploading image failed.");
        },
        async () => {
          const url = await getDownloadURL(upload.snapshot.ref);
          setImageUrl(url);
          setIsLoading(false);
        }
      );
    },
    [selectedFile]
  );

  //optimistic upload the selected image.
  useEffect(
    function () {
      async function uploadImage() {
        await handleUploadImageToStorage();
      }
      uploadImage();
    },
    [selectedFile, handleUploadImageToStorage]
  );

  //create post and upload all the informations to firestore.
  async function handleAddPost() {
    if (!caption.trim() || !selectedFile || !imageUrl) return;
    try {
      await addDoc(collection(db, "posts"), {
        username: session?.user.username,
        profileImage: session?.user.image,
        caption,
        postImage: imageUrl,
        timestamp: serverTimestamp(),
        userId: session?.user.userId,
      });

      setIsLoading(true);
      setSelectedFile(null);
      onCloseModal();
      location.reload();
    } catch (error) {
      setIsError("Failed to posting.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full  items-center">
      <h2 className="border-b w-full text-center">Add new post</h2>
      <div className="flex w-full flex-col gap-2 justify-center items-center h-full">
        {isError && <p className="text-lg text-red-500">{isError}</p>}
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
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {selectedFile && caption && imageUrl && !isError && (
          <button
            onClick={handleAddPost}
            disabled={isLoading}
            className="bg-blue-500 text-stone-50 px-4 py-2 rounded-lg"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
