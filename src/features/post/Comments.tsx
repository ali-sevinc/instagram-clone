"use client";

import { app } from "@/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Moment from "react-moment";

type Session = {
  data: {
    user: { username: string; userId: string; image: string; name: string };
  } | null;
};

type Comment = {
  id: string;
  comment: string;
  userImage: string;
  username: string;
  timestamp: Timestamp;
};
export default function Comments({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  const { data } = useSession() as Session;

  const db = getFirestore(app);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!comment.trim().length || !data) return;
    setIsLoading(true);

    await addDoc(collection(db, "posts", id, "comments"), {
      comment,
      username: data?.user.username,
      userImage: data.user.image,
      timestamp: serverTimestamp(),
    });
    setComment("");
    setIsLoading(false);
  }

  useEffect(
    function () {
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(
            snapshot.docs.map((cmnt) => ({
              id: cmnt.id,
              timestamp: cmnt.data().timestamp,
              ...cmnt.data(),
            })) as []
          );
        }
      );
    },
    [db, id]
  );

  return (
    <div>
      {comments.length > 0 && (
        <ol className="p-2 overflow-y-scroll max-h-32 border-y flex flex-col gap-2">
          {comments.map((comm) => (
            <li key={comm.id} className="flex items-center gap-1">
              <img src={comm.userImage} className="w-5 h-5 rounded-full" />
              <div className=" flex-1 flex gap-1 truncate text-sm">
                <b>{comm.username}</b>
                <p className="truncate">{comm.comment}</p>
              </div>
              <Moment fromNow className="text-xs text-zinc-400">
                {comm.timestamp?.toDate()}
              </Moment>
            </li>
          ))}
        </ol>
      )}
      {data && (
        <form onSubmit={handleSubmit} className="flex items-center gap-4 p-4">
          <img
            src={data.user?.image}
            alt={`image of ${data.user?.name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add your comment..."
            className="focus:outline-none border-b border-b-transparent focus:border-b-zinc-400 w-full"
            disabled={isLoading}
          />
          <button
            disabled={!comment || isLoading}
            className="disabled:cursor-not-allowed disabled:text-zinc-400 text-blue-500"
          >
            send
          </button>
        </form>
      )}
    </div>
  );
}
