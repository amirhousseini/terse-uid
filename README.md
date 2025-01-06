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
$ node test/terse-uid-test.js
Generating 1000000 UIDs...
OK, all UIDs are distinct.
Samples:
oxuc3qym7001rro0
jwz6dqym7001rro0
msgwqqym7001rro0
v6yjjqym7001rro0
tw4m8qym7001rro0
5k3uzpym7001rro0
```
