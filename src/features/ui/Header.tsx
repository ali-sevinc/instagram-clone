"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className=" shadow border-b sticky top-0 z-50 py-4 bg-white">
      <div className="flex justify-between items-center max-w-6xl xl:mx-auto px-4">
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="/insta_logo_letter.webp"
            alt="instagram logo"
            width={96}
            height={96}
          />
        </Link>
        <Link href="/" className="lg:hidden">
          <Image
            src="/insta_logo_image.webp"
            alt="instagram logo"
            width={48}
            height={48}
          />
        </Link>

        <input
          type="search"
          placeholder="Search..."
          className="bg-stone-50 border-b border-stone-300 rounded text-sm w-full py-2 px-4 max-w-xs"
        />
        {session ? (
          <button onClick={() => signOut()}>
            <img
              src={session.user?.image}
              alt={`image of ${session.user?.name}`}
              className="h-10 w-10 rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold text-blue-500"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
