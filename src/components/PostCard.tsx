import { PostWithCategory } from "@/src/lib/payloadTypes";

const PostCard = (post: PostWithCategory) => {
    return (
        <a key={post.id} href={"/posts/" + post.id} className="post-card card w-full lg:w-[900px] bg-base-100 shadow-2xl mb-3 rounded-md">
            <div className="card-body text-white text-center">
                <h2 className="flex flex-wrap card-title">
                    {post.title}
                </h2>
                <p className="h-min">{post.subtitle}</p>
                <div className="card-actions justify-end">
                    {/* TODO: date */}
                    <div className="badge badge-outline">{post.category?.name}</div> {/* TODO: no category? */}
                </div>
            </div>
        </a>
    );
}

export default PostCard;