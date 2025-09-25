// lib/base58.ts
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function encodeBase58(buffer: string): string {
  let num = BigInt('0x' + Buffer.from(buffer).toString('hex'));
  let encoded = '';
  while (num > 0) {
    const rem = Number(num % 58n);
    num /= 58n;
    encoded = ALPHABET[rem] + encoded;
  }
  return encoded || '1';
}

export function decodeBase58(str: string): string {
  let num = 0n;
  for (const char of str) {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) throw new Error('Invalid base58 character');
    num = num * 58n + BigInt(idx);
  }
  const hex = num.toString(16);
  return Buffer.from(hex.length % 2 ? '0' + hex : hex, 'hex').toString();
}
