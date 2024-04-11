import { ReactNode } from "react";

type PropsType = { children: ReactNode; onClick: () => void };
export default function LinkButton({ children, onClick }: PropsType) {
  return (
    <button
      onClick={() => onClick()}
      className="text-sm font-semibold text-blue-500"
    >
      {children}
    </button>
  );
}
