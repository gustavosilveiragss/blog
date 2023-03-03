import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import prisma from '../lib/prisma';

import Home from '../components/Home';
import DrawerLayout from '../components/NavBar/DrawerLayout';
import Footer from '../components/Footer';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  
  return {
    props: { feed },
    revalidate: 10,
  };
};

export default function Index(props) {
  return (
    <>
      <Head>
        <title>Gustavo Silveira</title>
        <meta name="description" content="Gustavo Silveira's personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flavicon.ico" />
      </Head>

      <main>
        <div className='bg-base-100 flex-col'>
          <DrawerLayout>
            <Home />
            <Footer />
          </DrawerLayout>
        </div>
      </main>
    </>
  );
}