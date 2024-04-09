import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center max-w-6xl xl:mx-auto px-4 shadow border-b sticky top-0 z-50 bg-white">
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
        className="bg-stone-50 border border-stone-300 rounded text-sm w-full py-2 px-4 max-w-xs"
      />
      <button className="text-sm font-semibold text-blue-500">Login</button>
    </header>
  );
}
