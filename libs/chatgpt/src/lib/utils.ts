import { encode, decode } from 'gpt-3-encoder';

function getEncodedLength(str: string): number {
  return encode(str).length;
}

function decodeTokens(tokens: number[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const decoded = decode([tokens[i]]);
    if (decoded === '�') {
      out.push(decode([tokens[i], tokens[i + 1]]));
      i++;
    } else {
      out.push(decoded);
    }
  }
  return out;
}

export { getEncodedLength, encode, decode, decodeTokens };
