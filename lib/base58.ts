// lib/base58.ts
import bs58 from "bs58";

/**
 * Encode string (misal URL) ke base58
 * @param text string yang mau di-encode
 * @returns kode base58
 */
export function encodeBase58(text: string): string {
  // Buffer.from akan membuat buffer UTF-8 dari string
  const buffer = Buffer.from(text, "utf8");
  return bs58.encode(buffer);
}

/**
 * Decode base58 kembali ke string
 * @param code base58 string
 * @returns string asli
 */
export function decodeBase58(code: string): string {
  const buffer = bs58.decode(code);
  return Buffer.from(buffer).toString("utf8");
}
