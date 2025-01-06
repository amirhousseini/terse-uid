'use strict';

const uid = require('../index.js');

const count = 1000000;

// Generate UIDs storing them in a set for duplicate detection
console.log("Generating", count, "UIDs...");
let uids = new Set();
for (let i = 0; i < count; i++) {
    uids.add(uid());
}

// Check for duplicates
let duplicates = count - uids.size;
if (duplicates) {
    console.log("Not OK,", duplicates, "duplicated UIDs.");
} else {
    console.log("OK, all UIDs are distinct.");
}

// Print UID samples
console.log("Samples:");
uids = [...uids.values()];
for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * count);
    console.log(uids[index]);
}

process.exit(duplicates);
