/**
 * Module providing a single function that return unique identifiers (UID)
 * in the form of strings of 16 alphanumerical characters, all lowercase.
 * To achieve uniqueness UIDs are built from the following number components:
 *  - a round-robin counter initialized to some random number,
 *  - the current time in milliseconds since 2025-01-01 00:00:00.000,
 *  - a context value derived from the process identifier, the thread identifier, and a random number.
 * Universal uniqueness is not guaranteed, however duplicate UIDs are practically improbable.
 */

'use strict';

// Get the thread identifier (0 if this is the main thread)
const { threadId } = require('node:worker_threads');

// The number of characters occupied by each component
const counterLen = 3;
const timeLen    = 8;
const contextLen = 5;

// Radix used for encoding numbers to strings
const radix = 36;
// 2025-01-01 00:00:00.000 in milliseconds since epoch 
const timeBase = (new Date(2025, 0, 1)).getTime();

// The context component
const contextComponent = getContextComponent();

// The static round-robin counter incremented with each UID generated,
// initialized to some random value in range
const maxCounter = Math.pow(radix, counterLen);
var counter = randomInt(maxCounter);

/**
 * Return a random integer between 0 (inclusive) and the given maximum value (exclusive).
 * @param {number} maxInt Maximum value
 * @returns Number
 */
function randomInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
}

/*
 * Encode a number into a string of alphanumerical characters of a given length.
 * The string is truncated to the specified length.
 * @param {number} value Number to encode
 * @param {number} length Length of the resulting character string
 * @returns String
 */
function encode(value, length) {
    return value
      .toString(radix)          // Encode the number into a character string
      .padStart(length, '0')    // Pad left the character string with a filler character
      .split("")                // Transform the character string into a character array
      .reverse()                // Reverse the character array to put faster changing characters left
      .slice(0, length)         // Truncate the character array to the given length
      .join("");                // Transform the character array into a character string
}

/**
 * Return the varying counter component.
 * @returns String
 */
function getCounterComponent() {
    if (counter >= maxCounter) counter = 0;
    return encode(counter++, counterLen);
}

/**
 * Return the varying time component.
 * @returns String
 */
function getTimeComponent() {
    return encode(Date.now() - timeBase, timeLen);
}

/**
 * Return the immutable context component.
 * @returns String
 */
function getContextComponent() {
    let rid = randomInt(100000);       // Random value in the range 0...99'999
    let tid = threadId + 100000;       // Thread identifier in the range 100'000..199'999
    let pid = process.pid + 200000;    // Process identifier in the range 200'000 and above
    return encode(pid + tid + rid, contextLen);
}

/**
 * Generate a UID and return it. 
 * @returns String
 */
module.exports = () => getCounterComponent().concat(getTimeComponent(), contextComponent);
