import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import Head from 'next/head';
import DrawerLayout from '@/src/components/NavBar/DrawerLayout';
import Footer from '@/src/components/Footer';
import { Post } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id),
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    
    return {
        props: { post },
    };
};

export default function PostPage(props: { post: Post }) {
    const post = props.post;

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.content ?? ""} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/flavicon.ico" />
            </Head>

            <main>
                <div className='bg-base-100 flex-col'>
                    <DrawerLayout>
                        <Footer />
                    </DrawerLayout>
                </div>
            </main>
        </>
    );
}