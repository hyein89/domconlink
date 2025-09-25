import { useState } from "react";
import { encodeBase58 } from "../lib/base58";

export default function EncodePage() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Image URL → Base58</h1>
      <input
        type="text"
        placeholder="Masukkan URL gambar..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => setCode(encodeBase58(url))}
      >
        Buat Kode
      </button>
      {code && (
        <p>
          Kode Base58: <strong>{code}</strong>
        </p>
      )}
    </div>
  );
}
