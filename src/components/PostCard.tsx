import { PostWithCategory } from "@/src/lib/payloadTypes";
import { formatDate } from "../lib/utils";

const PostCard = (post: PostWithCategory) => {
    return (
        <a href={"/posts/" + post.id} className="post-card card w-full lg:w-[900px] bg-base-100 shadow-2xl mb-3 rounded-md">
            <div className="card-body text-white text-center">
                <h2 className="flex flex-wrap card-title">
                    {post.title}
                </h2>
                <p className="h-min">{post.subtitle}</p>
                <div className="card-actions justify-end">
                    <span>{formatDate(post.createdAt)}</span>
                    <div key={post.categoryId} className="badge badge-outline mt-[2px] text-xs font-bold">{post.category.name.toUpperCase()}</div>
                </div>
            </div>
        </a>
    );
}

export default PostCard;