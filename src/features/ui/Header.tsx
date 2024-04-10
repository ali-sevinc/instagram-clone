"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoIosAddCircleOutline } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import AddPost from "./AddPost";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession();

  function handleShowModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <header className=" shadow border-b sticky top-0 z-50 py-4 bg-white">
      <nav className="flex justify-between items-center max-w-6xl xl:mx-auto px-4">
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
          className="bg-stone-50 shadow border-stone-300 rounded text-sm w-full py-2 px-4 max-w-xs"
        />
        {session ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleShowModal}
              className="text-3xl cursor-pointer hover:scale-110 duration-200 hover:text-orange-700"
            >
              <IoIosAddCircleOutline />
            </button>
            <button onClick={() => signOut()}>
              <img
                src={session.user?.image}
                alt={`image of ${session.user?.name}`}
                className="h-10 w-10 rounded-full"
              />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold text-blue-500"
          >
            Login
          </button>
        )}
      </nav>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <AddPost />
        </Modal>
      )}
    </header>
  );
}
