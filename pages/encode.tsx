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
      alert("URL disalin!");
    }
  };

  return (
    <>
      <Head>
        <title>Private Encoder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Buat Link Gambar
          </h1>
          <label className="block mb-2 font-semibold">URL Gambar</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
            placeholder="https://example.com/foto.jpg"
          />
          <label className="block mb-2 font-semibold">Judul / Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
            placeholder="Judul Halaman"
          />
          <button
            onClick={generate}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Generate URL
          </button>
          {result && (
            <div className="mt-4">
              <p className="break-words text-sm text-gray-700">{result}</p>
              <button
                onClick={copyToClipboard}
                className="mt-2 w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
              >
                Copy URL
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
