import {
  GetStaticPaths,
  GetStaticProps,
} from "next";
import Head from "next/head";
import DrawerLayout from "@/src/components/NavBar/DrawerLayout";
import Footer from "@/src/components/Footer";
import { PostWithAuthorCategory } from "@/src/lib/payloadTypes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock, dracula } from "react-code-blocks";
import rehypeRaw from "rehype-raw";
import { formatDate } from "@/src/lib/utils";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}post/${params?.id}`).then(
    async (result) => {
      if (!result.ok) {
        return;
      }

      let post = (await result.json()) as PostWithAuthorCategory;
      return post;
    }
  );

  return {
    props: { post },
  };
};

export default function PostPage(props: { post: PostWithAuthorCategory }) {
  const post = props.post;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${post.title} | Gustavo Silveira`}</title>
        <meta name="description" content={post.content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flavicon.ico" />
      </Head>

      <main>
        <DrawerLayout>
          <div className="bg-base-200 flex flex-col post-page w-full">
            <div className="flex justify-center min-h-screen">
              <div className="px-4 w-full lg:max-w-7xl">
                <p className="text-4xl text-white md:text-5xl font-bold my-2 first-letter:capitalize">
                  {post.title}
                </p>
                <div className="flex flex-row gap-2">
                  <button
                    className="badge badge-outline mt-[4px] text-xs font-bold text-white"
                    onClick={() => {
                      router.push({
                        pathname: "/",
                        query: { filter: post.category.name },
                      });
                    }}
                  >
                    {post.category.name.toUpperCase()}
                  </button>
                  <p className="text-lg text-gray-400 font-bold">
                    {formatDate(post.created_at)}
                  </p>
                </div>
                <div className="h-[3px] w-full bg-white block relative rounded-full"></div>
                <ReactMarkdown
                  children={post.content}
                  className="text-white"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <CodeBlock
                          text={String(children).replace(/\n$/, "")}
                          language={match[1]}
                          showLineNumbers={true}
                          theme={dracula}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            </div>
            <Footer />
          </div>
        </DrawerLayout>
      </main>
    </>
  );
}
