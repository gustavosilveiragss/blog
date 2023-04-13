import { useEffect, useState } from "react";
import { PostWithCategory } from "@/src/lib/payloadTypes";
import Loading from "./Loading";
import PostCard from "./PostCard";
import { Category } from "../lib/models";

type Props = {
  initialFilter?: string;
  categories: Category[];
};

const Feed = ({ initialFilter, categories }: Props) => {
  const [feed, setFeed] = useState<PostWithCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    initialFilter ? [initialFilter] : []
  );

  function handleCategoryClick(category: string) {
    setLoading(true);

    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter((cat) => cat !== category));
    } else {
      setCategoryFilter([...categoryFilter, category]);
    }
  }

  useEffect(() => {
    setLoading(true);

    const apiUrl =
      categoryFilter.length === 0
        ? `${process.env.NEXT_PUBLIC_API_KEY}posts`
        : `${process.env.NEXT_PUBLIC_API_KEY}category/${categoryFilter
            .map(
              (category) =>
                categories.find((cat) => cat.name === category)?.id || ""
            )
            .join(",")}`;

    fetch(apiUrl)
      .then(async (result) => {
        if (!result.ok) {
          setLoading(false);
          return;
        }

        setFeed((await result.json()) as PostWithCategory[]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, [categoryFilter]);

  return (
    <section id="feed">
      <div className="projects w-full min-h-screen bg-base-300">
        <div className="p-8 md:p-20 gap-4 flex flex-col items-stretch">
          <h3 className="text-lg text-white">CATEGORIES</h3>
          <div className="flex flex-wrap w-full -mt-3 items-start gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`badge badge-outline mt-[2px] text-xs font-bold cursor-pointer
                                    ${
                                      categoryFilter.includes(category.name)
                                        ? "bg-white text-base-300 border-white"
                                        : "text-white"
                                    }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name.toUpperCase()}
              </div>
            ))}
          </div>
          <div>
            <div className="flex flex-row w-full">
              <h3
                className={`text-lg text-white mr-1 ${
                  categoryFilter.length === 0 ? "whitespace-nowrap" : ""
                }`}
              >
                {categoryFilter.length === 0
                  ? "RECENT POSTS"
                  : `POSTS TAGGED WITH ${categoryFilter
                      .map((category, index) => {
                        var filter = category.toUpperCase();

                        if (index !== categoryFilter.length - 1) {
                          if (index === categoryFilter.length - 2) {
                            filter += " AND ";
                          } else {
                            filter += ", ";
                          }
                        }

                        return filter;
                      })
                      .join("")}`}
              </h3>
              {categoryFilter.length === 0 ? (
                <div className="h-[1px] w-full bg-secondary block relative top-3"></div>
              ) : (
                ""
              )}
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="w-full grid grid-cols-1 justify-items-center">
                {feed.map((post) => (
                  <div key={post.id}>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
