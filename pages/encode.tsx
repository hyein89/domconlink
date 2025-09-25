import { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { encodeBase58 } from "../lib/base58";

type Props = { allowed: boolean };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  // cek query ?admin=utong
  const { admin } = ctx.query;
  if (admin !== "utong") {
    return { notFound: true };
  }
  return { props: { allowed: true } };
};

export default function EncodePage({ allowed }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (!allowed) return null;

  const generate = () => {
    if (!imageUrl || !title) return;
    const code = encodeBase58(imageUrl);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setResult(`${window.location.origin}/${code}/${slug}.html`);
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Private Encoder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="container">
        <h1>Buat Link Gambar</h1>

        <label>URL Gambar</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/foto.jpg"
        />

        <label>Judul / Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Halaman"
        />

        <button onClick={generate} className="btn-generate">
          Generate URL
        </button>

        {result && (
          <div className="result">
            <p>{result}</p>
            <button onClick={copyToClipboard} className="btn-copy">
              Copy URL
            </button>
          </div>
        )}
      </div>

      {/* Toast notif */}
      <div className={`toast ${showToast ? "show" : ""}`}>
        URL berhasil disalin!
      </div>
    </>
  );
}
