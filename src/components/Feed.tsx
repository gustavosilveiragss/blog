import { useEffect, useState } from "react";
import { PostWithCategory } from "@/src/lib/payloadTypes";
import Loading from "./Loading";
import { formatDate } from "../lib/utils";
import PostCard from "./PostCard";

type Props = {
    initialFeed: PostWithCategory[],
    initialFilter?: string
};

const Feed = ({ initialFeed, initialFilter = "" }: Props) => {
    const [feed, setFeed] = useState(initialFeed);

    const [loading, setLoading] = useState(false);

    const categoriesNames: string[] = []

    const [categoryFilter, setCategoryFilter] = useState<string[]>([initialFilter]);
    if (categoryFilter[0] === "") {
        categoryFilter.pop();
    }

    // get category list from published posts to avoid api call
    for (let i = 0; i < initialFeed.length; i++) {
        const post = initialFeed[i];

        if (!categoriesNames.includes(post.category.name)) {
            categoriesNames.push(post.category.name);
        }
    }

    function handleCategoryClick(category: string) {
        setLoading(true);

        if (categoryFilter.includes(category)) {
            categoryFilter.splice(categoryFilter.indexOf(category), 1);
            setCategoryFilter([...categoryFilter]);

            return;
        }

        setCategoryFilter([...categoryFilter, category]);
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}filter?q=${categoryFilter.join(',')}`).then(async result => {
            if (!result.ok) {
                setLoading(false);
                console.log(result);

                return;
            }

            setFeed(await result.json());

            setLoading(false);
        });
    }, [categoryFilter]);

    return (
        <section id="feed">
            <div className="projects w-full min-h-screen bg-base-300">
                <div className="p-8 md:p-20 gap-4 flex flex-col items-stretch">
                    <h3 className="text-lg text-white">CATEGORIES</h3>
                    <div className="flex flex-wrap w-full -mt-3 items-start gap-2">
                        {categoriesNames.map(category =>
                            <div key={category}
                                className={`badge badge-outline mt-[2px] text-xs font-bold cursor-pointer
                                    ${categoryFilter.includes(category) ? "bg-white text-base-300 border-white" : "text-white"}`}
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
                        {loading
                            ? <Loading />
                            : <div className="w-full grid grid-cols-1 justify-items-center">
                                {feed.map(post => <div key={post.id}><PostCard {...post} /></div>)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feed;