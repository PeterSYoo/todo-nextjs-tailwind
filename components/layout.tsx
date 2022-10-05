import Head from "next/head";

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Todo List - Nextjs / Tailwind</title>
      </Head>
      <div>{children}</div>
    </>
  );
};

export default Layout;
