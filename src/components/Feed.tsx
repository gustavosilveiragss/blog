import { useState } from "react";
import PostCard from "./PostCard";
import { PostWithCategory } from "@/src/lib/payloadTypes";
import { Category } from "@prisma/client";

const Feed = (feed: PostWithCategory[]) => {
    feed = Object.values(feed); // Turn into array

    const categoriesNames: string[] = []

    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

    // get category list from published posts to avoid api call
    for (let i = 0; i < feed.length; i++) {
        const post = feed[i];

        if (!categoriesNames.includes(post.category.name)) {
            categoriesNames.push(post.category.name);
        }
    }

    function handleCategoryClick(category: string) {
        if (categoryFilter.includes(category)) {
            categoryFilter.splice(categoryFilter.indexOf(category), 1);
            setCategoryFilter([...categoryFilter]);

            return;
        }

        setCategoryFilter([...categoryFilter, category]);
        // TODO: call api with category filter
    }

    return (
        <section id="feed">
            <div className="projects w-full min-h-screen bg-base-300">
                <div className="p-8 md:p-20 gap-4 flex flex-col items-stretch">
                    <h3 className="text-lg text-white">CATEGORIES</h3>
                    <div className="flex flex-wrap w-full -mt-3 items-start gap-2">
                        {categoriesNames.map(category =>
                            <div
                                className={`badge badge-outline mt-[2px] text-xs font-bold cursor-pointer 
                                    ${categoryFilter.includes(category) ? "bg-white text-base-300 border-white" : ""}`}
                                onClick={() => handleCategoryClick(category)}>
                                {category.toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-row w-full">
                            <h3 className={`text-lg text-white mr-1 ${categoryFilter.length === 0 ? "whitespace-nowrap" : ""}`}>{
                                categoryFilter.length === 0 
                                    ? "RECENT POSTS"
                                    : `POSTS TAGGED WITH ${categoryFilter.map((category, index) => {
                                        var filter = category.toUpperCase();

                                        if (index !== categoryFilter.length - 1) {
                                            if (index === categoryFilter.length - 2) {
                                                filter += " AND ";
                                            } else {
                                                filter += ", ";
                                            }
                                        }

                                        return filter;
                                    }).join('')}`
                            }</h3>
                            {categoryFilter.length === 0 ? <div className="h-[1px] w-full bg-secondary block relative top-3"></div> : ""}
                        </div>
                        <div className="w-full grid grid-cols-1 justify-items-center">
                            {feed.map(post => <div key={post.id}><PostCard {...post} /></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feed;