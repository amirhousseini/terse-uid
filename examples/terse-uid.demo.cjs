/**
 * CommonJS module demonstrating usage
 */

const { getUid, uidGener } = require('terse-uid');

const NUM_UID = 10;

// Using regular function
for (let i = 0; i < NUM_UID; i++) console.log(getUid());

// Using generator function
for (let uid of uidGener(NUM_UID)) console.log(uid);
