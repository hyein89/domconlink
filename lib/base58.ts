// lib/base58.ts
// Base58 encode/decode tanpa perlu type declarations

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bs58 = require("bs58");

/**
 * Encode string UTF-8 menjadi Base58
 */
export function encodeBase58(text: string): string {
  const bytes = Buffer.from(text, "utf8");
  return bs58.encode(bytes);
}

/**
 * Decode string Base58 ke UTF-8
 */
export function decodeBase58(code: string): string {
  const bytes = bs58.decode(code);
  return Buffer.from(bytes).toString("utf8");
}

