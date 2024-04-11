"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import LinkButton from "./LinkButton";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="fixed w-96 px-4 flex items-center justify-between mt-16">
      <img
        src={session?.user?.image || "/insta_logo_image.webp"}
        alt={`image of ${session?.user?.name}`}
        className="w-16  h-16 rounded-full border"
      />
      <div>
        <p>Welcome to instagram</p>
        <h2 className="font-semibold text-lg">{session?.user?.name}</h2>
      </div>
      {session ? (
        <LinkButton onClick={() => signOut()}>Sign out</LinkButton>
      ) : (
        <LinkButton onClick={() => signIn()}>Sing in</LinkButton>
      )}
    </div>
  );
}
