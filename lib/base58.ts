// lib/base58.ts
// Utility untuk encode/decode string (misalnya URL) ke/dari Base58.

import bs58 from "bs58";

/**
 * Encode string UTF-8 menjadi Base58.
 * @param text string biasa (contoh: URL)
 * @returns string Base58
 */
export function encodeBase58(text: string): string {
  const bytes = Buffer.from(text, "utf8");
  return bs58.encode(bytes);
}

/**
 * Decode string Base58 menjadi UTF-8.
 * @param code string Base58
 * @returns string hasil decode
 */
export function decodeBase58(code: string): string {
  const bytes = bs58.decode(code);
  return Buffer.from(bytes).toString("utf8");
}
