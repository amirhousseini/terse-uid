# terse-uid
Factory of unique identifiers (UID) as strings of 16 lowercase alphanumerical characters (e.g. "bi2vepv3612gd1d0").\
The module exports a regular function "getUid" returning a single UID, and a generator function "uidGener" returning a sequence of UIDs.\
The generator function is more efficient for generating a high number of UIDs.

## Install
```
$ npm install github:amirhousseini/terse-uid
```

## Usage example
```js
import { getUid, uidGener } from 'terse-uid';           // ESM style
//const { getUid, uidGener } = require('terse-uid');    // CommonJS style

const NUM_UID = 10;

// Using the regular function
for (let i = 0; i < NUM_UID; i++) {
        let uid = getUid();
        console.log(uid);
}

// Using the generator function
for (let uid of uidGener(NUM_UID)) {
        console.log(uid);
}
```

## Test sample
```sh
$ npm test

> terse-uid@2.0.3 test
> node --test

▶ Unit tests of getUid()
  ✔ Verify uniqueness of the 1000000 generated UIDs (264.637775ms)
  ✔ Verify that all 1000000 generated UIDs consist of 16 lowercase alphanumeric characters (0.239901ms)
✔ Unit tests of getUid() (272.198405ms)
▶ Unit tests of uidGener()
  ✔ Verify uniqueness of the 1000000 generated UIDs (208.298563ms)
  ✔ Verify that all 1000000 generated UIDs consist of 16 lowercase alphanumeric characters (0.1242ms)
✔ Unit tests of uidGener() (208.595864ms)
ℹ tests 4
ℹ suites 2
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 5427.384828
```
