import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import prisma from '../lib/prisma';
import { PostWithCategory } from '../lib/payloadTypes';

import Feed from '../components/Feed';
import DrawerLayout from '../components/NavBar/DrawerLayout';
import Footer from '../components/Footer';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      category: true
    },
  });

  return {
    props: { feed }, 
  };
};

export default function Index(props: { feed: PostWithCategory[] }) {
  // TODO: no posts/error 
  // TODO: handle loading

  return (
    <>
      <Head>
        <title>Blog | Gustavo Silveira</title>
        <meta name="description" content="Gustavo Silveira's personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flavicon.ico" />
      </Head>

      <main>
        <div className='bg-base-100 flex flex-col'>
          <DrawerLayout>
            <Feed {...props.feed} />
            <Footer />
          </DrawerLayout>
        </div>
      </main>
    </>
  );
}