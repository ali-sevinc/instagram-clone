import Likes from "./Likes";

type PostType = { id: string; [key: string]: any };
export default function Post({ post }: { post: PostType }) {
  return (
    <div className="bg-zinc-50 border rounded-xl mx-4 my-8 md:mx-auto">
      <div className="flex px-4 py-2 items-center gap-8">
        <img
          src={post.profileImage || "/insta_logo_image.webp"}
          className="w-10 h-10 rounded-full"
          alt={`${post.username}'s profile image.`}
        />
        <h2 className="font-semibold flex-1">{post.username}</h2>
      </div>
      <div>
        <img
          src={post.postImage}
          alt={post.caption}
          className="object-cover w-full"
        />
        <Likes id={post.id} />
        <p className="p-4 truncate flex gap-4">
          <b>{post.username}</b>
          <span>{post.caption}</span>
        </p>
      </div>
    </div>
  );
}
