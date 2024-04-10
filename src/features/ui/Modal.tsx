"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

type PropsType = { children: ReactNode; isOpen: boolean; onClose: () => void };
export default function Modal({ children, isOpen, onClose }: PropsType) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function () {
      if (!ref.current) return;

      if (isOpen) {
        ref.current.showModal();
      } else {
        ref.current.close();
      }
    },
    [isOpen]
  );

  return createPortal(
    <dialog
      className="backdrop:bg-stone-100/50 max-w-lg w-[95%] p-2 relative border-2 h-[80vh] border-stone-200 rounded-xl shadow-md"
      ref={ref}
      onClose={onClose}
    >
      {children}
      <button
        onClick={onClose}
        className="hover:text-orange-700 text-xl absolute top-1 right-2"
      >
        <HiXMark />
      </button>
    </dialog>,
    document.body
  );
}
