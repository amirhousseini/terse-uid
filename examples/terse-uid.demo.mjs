/**
 * ESM module demonstrating usage
 */

import { getUid, uidGener } from 'terse-uid';

const NUM_UID = 10;

// Using regular function
for (let i = 0; i < NUM_UID; i++) console.log(getUid());

// Using generator function
for (let uid of uidGener(NUM_UID)) console.log(uid);
