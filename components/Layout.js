// _rfc
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
// import styles from "../styles/Layout.module.css";
import styles from "@/styles/Layout.module.css";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};
