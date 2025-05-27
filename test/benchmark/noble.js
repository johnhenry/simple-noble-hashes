import { argon2id } from '@noble/hashes/argon2.js';
import { blake256 } from '@noble/hashes/blake1.js';
import { blake2b, blake2s } from '@noble/hashes/blake2.js';
import { blake3 } from '@noble/hashes/blake3.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import { hmac } from '@noble/hashes/hmac.js';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { scrypt } from '@noble/hashes/scrypt.js';
import { sha256, sha512 } from '@noble/hashes/sha2.js';
import { k12, kmac256, m14 } from '@noble/hashes/sha3-addons.js';
import { sha3_256, sha3_512 } from '@noble/hashes/sha3.js';
import { mark } from 'micro-bmark';

function buf(size) {
  return new Uint8Array(size).fill(size % 251);
}

const buffers = [
  // { size: '16B', samples: 1_500_000, data: buf(16) }, // common block size
  { size: '32B', samples: 1_000_000, data: buf(32) },
  // { size: '64B', samples: 1_000_000, data: buf(64) },
  // { size: '1KB', samples: 50_000, data: buf(1024) },
  // { size: '8KB', samples: 10_000, data: buf(1024 * 8) },
  { size: '1MB', samples: 100, data: buf(1024 * 1024) },
];

async function main() {
  const d = buf(32);
  for (let i = 0; i < 1_000_000; i++) sha256(d); // warm-up

  // prettier-ignore
  const hashes = {
    sha256, sha512, sha3_256, sha3_512, k12, m14, blake256, blake2b, blake2s, blake3, ripemd160,
  };
  for (const { size, samples: i, data } of buffers) {
    console.log('# ' + size);
    for (const title in hashes) {
      const hash = hashes[title];
      await mark(title, i, () => hash(data));
    }
    console.log();
  }

  console.log('# MAC');
  const etc = buf(32);
  await mark('hmac(sha256)', 100000, () => hmac(sha256, etc, etc));
  await mark('hmac(sha512)', 100000, () => hmac(sha512, etc, etc));
  await mark('kmac256', 100000, () => kmac256(etc, etc));
  await mark('blake3(key)', 100000, () => blake3(etc, { key: etc }));

  console.log();
  console.log('# KDF');
  const pass = buf(12);
  const salt = buf(14);
  await mark('hkdf(sha256)', 100000, () => hkdf(sha256, salt, pass, etc, 32));
  await mark('blake3(context)', 100000, () => blake3(etc, { context: etc }));
  await mark('pbkdf2(sha256, c: 2 ** 18)', 10, () =>
    pbkdf2(sha256, pass, salt, { c: 2 ** 18, dkLen: 32 })
  );
  await mark('pbkdf2(sha512, c: 2 ** 18)', 5, () =>
    pbkdf2(sha512, pass, salt, { c: 2 ** 18, dkLen: 32 })
  );
  await mark('scrypt(n: 2 ** 19, r: 8, p: 1)', 5, () =>
    scrypt(pass, salt, { N: 2 ** 19, r: 8, p: 1, dkLen: 32 })
  );
  await mark('argon2id(t: 1, m: 128MB)', () =>
    argon2id(pass, salt, { t: 1, m: 128 * 1024, p: 1, dkLen: 32 })
  );
}
main();
