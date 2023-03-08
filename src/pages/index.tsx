import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import prisma from '../lib/prisma';
import { PostWithCategory } from '../lib/payloadTypes';

import Feed from '../components/Feed';
import DrawerLayout from '../components/NavBar/DrawerLayout';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { queryToStringOnly } from '../lib/utils';

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
  const router = useRouter();

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
            <Feed initialFeed={props.feed} initialFilter={queryToStringOnly(router.query.filter)} />
            <Footer />
          </DrawerLayout>
        </div>
      </main>
    </>
  );
}