'use strict'

/**
 * Class featuring a single static function returning unique identifiers (UID)
 * as strings of 16 alphanumerical characters, all lowercase.
 * To achieve uniqueness UIDs are derived from four number components:
 *  - a counter value,
 *  - the current time,
 *  - the process identifier,
 *  - a small random value,
 * encoded into a character string using the highest possible radix.
 * For fast comparison rapidly changing character of each component are placed
 * farthest left. 
 */
class TerseUid {

    // Highest possible radix for encoding numbers
    static #radix = 36;

    // Number of digits to be used by each component
    static #componentLength = [
        2,  // Static counter modulo 1296
        8,  // Current time in milliseconds since 2025-01-01 00:00:00.000, max value 2821109907455
        4,  // PID, max value 1679615
        2   // Small random value in range 0..1295
    ];
    static #maxCount = parseInt("zz", this.#radix) + 1;  
    static #maxPid = parseInt("zzzz", this.#radix) + 1;  
    static #maxRandom = parseInt("zz", this.#radix) + 1;

    // Static counter that keeps being incremented
    static #count = 0;
    static #timeReference = (new Date(2025, 0, 1)).getTime();
    static #previousTime = this.#getTime();
    static #pid = process.pid % this.#maxPid;

    // Filler character when an encoded component does not use its assigned length
    static #fillerChar = '0';

    /**
     * Return a new UID as a string of 16 alphanumerical characters, all lowercase.
     * @returns String
     */
    static newUid() {
        // Get the next component values
        let time = this.#getTime();
        let count = this.#count++ % this.#maxCount;
        if (count === 0) {
            // Make sure that the time changes whenever the counter resets.
            // The loop is for OSes with low precision clocks (e.g. Windows).
            while (time === this.#previousTime) {
                time = this.#getTime();
            }
            this.#previousTime = time;
        }
        let rand = Math.floor(Math.random() * this.#maxRandom);
        // Encode the components in this specific order
        let uid = this.#encode(count, time, this.#pid, rand);
        return uid;
    }

    /*
     * Return the time in milliseconds since 2025-01-01 00:00:00.000.
     * @returns Number
     */
    static #getTime() {
        return Date.now() - this.#timeReference;
    }

    /*
     * Encode the given numbers into a string of 16 alphanumerical characters:
     * 1) Encode each number into a character string using the highest possible radix
     * 2) Pad each character string left with the filler character up to its required length
     * 3) Split each character string into an array of characters
     * 4) Reverse each character array so that faster changing characters appear first
     * 5) Flatten the character arrays into a single character array
     * 6) Form a character string from the single character array.
     * @param  {...number} components Components to encode into a single character string
     * @returns String
     */
    static #encode(...components) {
        return components
        .map((value, index) => value
            .toString(this.#radix)
            .padStart(this.#componentLength[index], this.#fillerChar)
            .split("")
            .reverse())
        .flat()
        .join("");
    }

}

module.exports = () => TerseUid.newUid();
