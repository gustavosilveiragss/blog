import { Post } from "@/src/lib/models";

const SearchResult = (post: Post) => {
    return (
        <a href={"/posts/" + post.id} className="card w-full h-min bg-base-200 rounded-md">
            <div className="p-2 text-white">
                <h2 className="flex flex-wrap text-sm font-bold">
                    {post.title}
                </h2>
            </div>
        </a>
    );
}

export default SearchResult;