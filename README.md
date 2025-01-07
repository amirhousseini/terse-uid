# terse-uid
Factory of unique identifiers in the form of strings of 16 alphanumerical characters, all lowercase.\
The module exports a single anonymous function without argument that returns a unique identifier each time it is called.\
See test/terse-uid-test.js for a usage example.

## Install
```
$ npm install terse-uid
```

## Usage
```js
const uid = require('terse-uid');

for (let i = 0; i < 100; i++) {
    console.log(uid());
}
```

## Test ouput example
```sh
$ npm test

> terse-uid@1.1.2 test
> node test/terse-uid-test.js

Generating 1000000 UIDs...
OK, all UIDs are distinct.
Samples:
c7tonp53900nlcr0
liha4p53900nlcr0
oy6xpp53900nlcr0
c2xdro53900nlcr0
vqa9zo53900nlcr0
ickqso53900nlcr0
```
