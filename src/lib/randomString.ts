import { generateRandomString, type RandomReader } from '@oslojs/crypto/random';

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  },
};

export function randomString() {
  const digest = process.env.CRYPTO_DIGEST;
  if (!digest) {
    throw new Error('CRYPTO_DIGEST is not set');
  }
  return generateRandomString(random, digest, 6);
}
