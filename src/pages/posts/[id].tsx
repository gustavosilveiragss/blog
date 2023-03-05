import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import Head from 'next/head';
import DrawerLayout from '@/src/components/NavBar/DrawerLayout';
import Footer from '@/src/components/Footer';
import { PostWithAuthorCategory } from '@/src/lib/payloadTypes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock, dracula } from 'react-code-blocks';
import rehypeRaw from 'rehype-raw';
import { formatDate } from '@/src/lib/utils';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id),
        },
        include: {
            author: {
                select: { name: true },
            },
            category: {
                select: { name: true },
            }
        },
    });

    return {
        props: { post },
    };
};

export default function PostPage(props: { post: PostWithAuthorCategory }) {
    const post = props.post;

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.content} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/flavicon.ico" />
            </Head>

            <main>
                <DrawerLayout>
                    <div className='bg-base-200 flex flex-col post-page w-full'>
                        <div className='flex justify-center min-h-screen'>
                            <div className='px-4 w-full lg:max-w-7xl'>
                                <p className='text-4xl text-white md:text-5xl font-bold my-2 first-letter:capitalize'>{post.title}</p>
                                <p className='text-lg text-gray-400 font-bold'>{formatDate(post.createdAt)}</p>
                                <div className="h-[3px] w-full bg-white block relative rounded-full"></div>
                                <ReactMarkdown
                                    children={post.content}
                                    className='text-white'
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <CodeBlock
                                                    text={String(children).replace(/\n$/, '')}
                                                    language={match[1]}
                                                    showLineNumbers={true}
                                                    theme={dracula}
                                                />
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
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