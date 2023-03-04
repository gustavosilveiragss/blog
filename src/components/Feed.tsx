import PostCard from "./PostCard";
import { PostWithCategory } from "@/src/lib/payloadTypes";

const Feed = (feed: PostWithCategory[]) => {
    feed = Object.values(feed);

    return (
        <section id="feed">
            <div className="projects w-full min-h-screen bg-base-300">
                <div className="p-8 md:p-20 gap-4 flex flex-col items-stretch">
                    <div>
                        <div className="flex flex-row w-full">
                            <h3 className="text-lg text-white mr-1 whitespace-nowrap">RECENT POSTS</h3>
                            <div className="h-[1px] w-full bg-secondary block relative top-3"></div>
                        </div>
                        <div className="w-full grid grid-cols-1 justify-items-center">
                            {feed.map(post => <PostCard {...post} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feed;