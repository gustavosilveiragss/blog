import { PostWithCategory } from "@/src/lib/payloadTypes";

const PostCard = (post: PostWithCategory) => {
    return (
        <div className="card w-full bg-base-100 shadow-2xl">
            <div className="card-body text-white">
                <h2 className="flex flex-wrap card-title">
                    {post.title}
                </h2>
                <p className="h-min">{post.content}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{post.category?.name}</div> {/* TODO: no category? */}
                </div>
            </div>
        </div>
    );
}

export default PostCard;