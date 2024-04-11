import Posts from "../post/Posts";
import MiniProfile from "../ui/MiniProfile";

export default function Feed() {
  return (
    <>
      <aside className="border-r hidden lg:inline-grid" />
      <section className="mx-4">
        <Posts />
      </section>
      <aside className="hidden md:inline-grid ">
        <MiniProfile />
      </aside>
    </>
  );
}
