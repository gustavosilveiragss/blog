import Head from "next/head";

import Feed from "../components/Feed";
import DrawerLayout from "../components/NavBar/DrawerLayout";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { queryToStringOnly } from "../lib/utils";
import { GetStaticProps } from "next";
import { Category } from "../lib/models";

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}categories`
  ).then(async (result) => {
    if (!result.ok) {
      return;
    }

    let categories = (await result.json()) as Category[];
    return categories;
  });

  return {
    props: { categories },
  };
};

export default function Index(props: { categories: Category[] }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Blog | Gustavo Silveira</title>
        <meta
          name="description"
          content="Gustavo Silveira's personal website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flavicon.ico" />
      </Head>

      <main>
        <div className="bg-base-100 flex flex-col">
          <DrawerLayout>
            <Feed
              categories={props.categories}
              initialFilter={queryToStringOnly(router.query.filter)}
            />
            <Footer />
          </DrawerLayout>
        </div>
      </main>
    </>
  );
}
