# terse-uid
Factory of unique identifiers (UID) as strings of 16 lowercase alphanumerical characters (e.g. "bi2vepv3612gd1d0").\
The module exports a regular function "uid" returning a single UID, and a generator function "uidGener" returning a sequence of UIDs.\
The generator function is more efficient for generating a high number of UIDs.

## Install
```
$ npm install terse-uid
```

## Usage
```js
import { uid, uidGener } from 'terse-uid';          // ESM style
//const { uid, uidGener } = require('terse-uid');   // CommonJS style

const NUM_UID = 10;

// Using regular function
for (let i = 0; i < NUM_UID; i++) console.log(uid());

// Using generator function
for (let uid of uidGener(NUM_UID)) console.log(uid);
```

## Test sample
```sh
$ npm test

> terse-uid@2.0.0 test
> node --test

▶ Unit tests of getUid()
  ✔ Verify uniqueness of the 1000000 generated UIDs (243.569685ms)
  ✔ Verify that all 1000000 generated UIDs consist of 16 lowercase alphanumeric characters (0.203052ms)
✔ Unit tests of getUid() (249.917866ms)
▶ Unit tests of uidGener()
  ✔ Verify uniqueness of the 1000000 generated UIDs (203.652075ms)
  ✔ Verify that all 1000000 generated UIDs consist of 16 lowercase alphanumeric characters (0.123726ms)
✔ Unit tests of uidGener() (203.926268ms)
ℹ tests 4
ℹ suites 2
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 4500.885101
```
