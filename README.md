# simple-noble-hashes

Pure JavaScript ES modules version of [@noble/hashes](https://github.com/paulmillr/noble-hashes) - Audited & minimal 0-dependency JS implementation of SHA, RIPEMD, BLAKE, HMAC, HKDF, PBKDF & Scrypt.

This is a pre-compiled version of the noble-hashes library that:
- ✅ Works directly with npm-based CDNs (unpkg, jsDelivr, esm.sh, etc.)
- ✅ Pure JavaScript with ES modules
- ✅ Includes TypeScript definitions (.d.ts files)
- ✅ No build step required
- ✅ Same API as the original @noble/hashes

## Installation

```bash
npm install simple-noble-hashes
```

Or use directly from CDN:

```js
import { sha256 } from 'https://unpkg.com/simple-noble-hashes/sha2.js';
import { blake3 } from 'https://unpkg.com/simple-noble-hashes/blake3.js';
```

## Usage

The API is identical to [@noble/hashes](https://github.com/paulmillr/noble-hashes). Please refer to the original documentation for detailed usage instructions.

Quick example:

```js
import { sha256 } from 'simple-noble-hashes/sha2';
import { blake3 } from 'simple-noble-hashes/blake3';
import { hmac } from 'simple-noble-hashes/hmac';
import { pbkdf2 } from 'simple-noble-hashes/pbkdf2';

// SHA-256 hash
const hash = sha256('hello world');

// BLAKE3 hash
const blake3Hash = blake3('hello world');

// HMAC-SHA256
const mac = hmac(sha256, 'key', 'message');

// PBKDF2
const derived = await pbkdf2(sha256, 'password', 'salt', { c: 100000, dkLen: 32 });
```

## Available Algorithms

All algorithms from the original library are available:

- **SHA**: `sha1`, `sha256`, `sha384`, `sha512`, `sha224`, `sha512_224`, `sha512_256`
- **SHA3**: `sha3_224`, `sha3_256`, `sha3_384`, `sha3_512`, `keccak_224`, `keccak_256`, `keccak_384`, `keccak_512`
- **BLAKE**: `blake1`, `blake2s`, `blake2b`, `blake3`
- **Other**: `ripemd160`
- **KDF**: `hmac`, `hkdf`, `pbkdf2`, `scrypt`, `eskdf`

## Differences from @noble/hashes

1. **Pre-compiled**: This package contains JavaScript files instead of TypeScript
2. **ES Modules only**: Uses `"type": "module"` in package.json
3. **No build dependencies**: No TypeScript or build tools required
4. **CDN-friendly**: Works directly with npm-based CDNs

## Original Library

This is a derivative work of [@noble/hashes](https://github.com/paulmillr/noble-hashes) by Paul Miller.

- 🔒 [**Audited**](https://github.com/paulmillr/noble-hashes#security) by independent security firms
- 🔻 Tree-shakeable: unused code is excluded from your builds
- 🏎 Fast: optimized for performance
- 🔍 Reliable: extensive test suite ensures correctness

## Security

Please refer to the [original security documentation](https://github.com/paulmillr/noble-hashes#security) and [audits](https://github.com/paulmillr/noble-hashes/tree/main/audit).

## License

MIT License - Same as the original noble-hashes library.

## Credits

All credit goes to [Paul Miller](https://paulmillr.com) for creating the original noble-hashes library.