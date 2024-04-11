import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr,384px] lg:grid-cols-[280px,1fr,384px] md:max-w-6xl mx-auto">
      {children}
    </main>
  );
}
