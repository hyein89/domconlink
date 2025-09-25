// pages/[imgCode]/[title].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { decodeBase58 } from "../../lib/base58";

type Props = {
  imageUrl: string;
  pageTitle: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const imgCode = params?.imgCode as string | undefined;
  const titleParam = params?.title as string | undefined;

  if (!imgCode || !titleParam) {
    return { notFound: true };
  }

  try {
    // decode base58 -> url gambar asli
    const decoded = decodeBase58(imgCode);

    // validasi sederhana
    if (!/^https?:\/\//i.test(decoded)) throw new Error("invalid image url");

    // bersihkan title (hilangkan .html dan ubah dash ke spasi)
    const cleanTitle = titleParam.replace(/\.html$/i, "").replace(/-/g, " ");

    return {
      props: {
        imageUrl: decoded,
        pageTitle: cleanTitle,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

export default function ImagePage({ imageUrl, pageTitle }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageTitle} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageTitle} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={pageTitle} />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          padding: 12,
        }}
      >
        <img
          src={imageUrl}
          alt={pageTitle}
          style={{
            maxWidth: "100%",
            maxHeight: "100vh",
            objectFit: "contain",
            borderRadius: 6,
          }}
        />
      </div>
    </>
  );
}
