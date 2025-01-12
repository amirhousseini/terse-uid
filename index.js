/**
 * Module providing a single function that return unique identifiers (UID)
 * in the form of strings of 16 alphanumerical characters, all lowercase.
 * To achieve uniqueness UIDs are built from three number components:
 *  - a random number,
 *  - a deterministic number,
 *  - the current time in milliseconds since 2025-01-01 00:00:00.000.
 * The deterministic number is formed from:
 *  - a round-robin counter in the range 0...999'999
 *  - the current process identifier in the range 1'000'000...5'194'304 (max PID in 64 bit systems is 4194304)
 *  - the current thread identifier above 5'194'305.
 * The components are encoded into character strings of fixed length with
 * the highest possible radix, reversed so that lower digits appear left,
 * and finally concatenated.
 * Although universal uniqueness is not guaranteed in theory, duplicate UIDs are
 * practically impossible.
 */

'use strict';

// Get the thread identifier (0 for the main thread)
const { threadId } = require('node:worker_threads');

// The number of characters used by each component (in this order)
const randomLen = 3;
const numberLen = 5;
const timeLen   = 8;

// Radix used for encoding numbers into strings
const radix = 36;

// The immutable number base for the current process/thread
const numberBase = process.pid + 1000000 +          // Process identifier in range 1'000'000...5'194'304
                   threadId + 5194305;              // Thread identifier above 5'194'305

// The static round-robin counter incremented with every UID
var counter = 0;
const maxCounter = 1000000;

// The maximum random value
const maxRandom = Math.pow(radix, randomLen);

// The time base 2025-01-01T00:00:00.000Z, in milliseconds since epoch.
const timeBase = new Date(2025, 0, 1).getTime();    // 1735686000000
// timeLen characters support times until 2114-05-26T16:38:27.455Z.
// The latter is calculated as follows:
// new Date(timeBase + parseInt(Array(timeLen).fill(Number(radix-1).toString(radix)).join(""), radix)).toISOString()

/*
 * Encode a number into a string of alphanumerical characters of a given length.
 * The string is truncated to the specified length.
 * @param {number} value Number to encode
 * @param {number} length Length of the resulting character string
 * @returns String
 */
const encode = (value, length) =>
    value
      .toString(radix)          // Encode the number into a character string
      .padStart(length, '0')    // Pad the character string left with a filler character
      .split("")                // Transform the character string into a character array
      .reverse()                // Reverse the character array to have lower digit characters left
      .slice(0, length)         // Truncate the character array to the given length
      .join("");                // Transform the character array into a character string

/**
 * Generate a new UID and return it. 
 * @returns String
 */
module.exports = () =>
    // Random component
    encode(
        Math.floor(Math.random() * maxRandom),
        randomLen
    ) +
    // Number component
    encode(
        numberBase + (counter %= maxCounter, counter++),
        numberLen
    ) +
    // Time component
    encode(
        Date.now() - timeBase,
        timeLen
    );
