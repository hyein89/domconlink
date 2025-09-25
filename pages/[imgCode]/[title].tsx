import { GetServerSideProps } from "next";
import Head from "next/head";
import { decodeBase58 } from "../../lib/base58";

interface Props {
  imageUrl: string;
  pageTitle: string;
  offerUrl: string;
}

export default function RedirectPage({ imageUrl, pageTitle, offerUrl }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageTitle} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageTitle} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <main style={{textAlign:"center", padding:"40px"}}>
        <h1>{pageTitle}</h1>
        <img src={imageUrl} alt={pageTitle} style={{maxWidth:"90%", height:"auto"}} />
        <p>
          <a href={offerUrl} target="_blank" rel="noopener noreferrer">
            Kunjungi Penawaran
          </a>
        </p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { imgCode, title } = context.params as { imgCode?: string; title?: string };
  if (!imgCode || !title) return { notFound: true };

  try {
    const decodedUrl = decodeBase58(imgCode);
    if (!/^https?:\/\//.test(decodedUrl)) return { notFound: true };

    const pageTitle = title.replace(/\.html$/, "").replace(/-/g, " ");
    return {
      props: {
        imageUrl: decodedUrl,
        pageTitle,
        offerUrl: process.env.NEXT_PUBLIC_OFFER_URL || "#",
      },
    };
  } catch {
    return { notFound: true };
  }
};
