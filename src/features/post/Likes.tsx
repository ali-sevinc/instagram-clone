"use client";

import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

type Session = {
  data: { user: { username: string; userId: string; image: string } } | null;
};

export default function Likes({ id }: { id: string }) {
  const { data } = useSession() as Session;
  const [likes, setLikes] = useState<{ id: string }[]>([]);
  const db = getFirestore(app);

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    function () {
      onSnapshot(collection(db, "posts", id, "likes"), (snapsot) => {
        setLikes((snapsot.docs as []) || []);
      });
    },
    [db, id]
  );
  useEffect(
    function () {
      if (likes.findIndex((like) => like?.id === data?.user.userId) !== -1) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    },
    [likes, data?.user?.userId]
  );

  async function toggleLike() {
    if (!data) return;
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", data?.user.userId));
    } else {
      await setDoc(doc(db, "posts", id, "likes", data?.user.userId), {
        username: data?.user.username,
      });
    }
  }

  return (
    <div>
      {data && (
        <div className="flex items-center gap-4 px-4 mt-4 text-3xl">
          {hasLiked ? (
            <button
              onClick={toggleLike}
              className="hover:scale-110 duration-200"
            >
              <HiHeart className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={toggleLike}
              className="hover:scale-110 duration-200"
            >
              <HiOutlineHeart />
            </button>
          )}

          {!likes.length && <p className="text-sm">no like</p>}
          {likes.length > 0 && (
            <p className="text-sm">
              {likes.length} like{likes.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
