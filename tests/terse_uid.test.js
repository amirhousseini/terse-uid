/**
 * Unit test
 */

import { suite, test } from 'node:test';
import { expect } from 'chai';

import { getUid, uidGener } from 'terse-uid';

// Test size
const NUM_UIDS = 1_000_000;

// Expected UID pattern
const PATTERN = /^[a-z0-9]{16}$/;

// Function factories

/*
 * Return a function verifying that all UIDs in the given set have the correct format.
 * @param set Set of UIDs
 */
const formatChecker = (set) => () => {
        let invalid = 0;
        set.forEach(uid => PATTERN.test(uid) || invalid++);
        expect(invalid).to.equal(0);
    }

/*
 * Return a function verifying that the given set has the expected size.
 * @param set Set of UIDs
 */
const duplicateChecker = (set) => () => expect(set.size).to.equal(NUM_UIDS);

// Test suites

suite("Unit tests of getUid()", { skip: false }, () => {
    // Obtain a set of UIDs
    let set = new Set();
    for (let i = 0; i < NUM_UIDS; i++) set.add(getUid());
    // Unit tests
    test(`Verify uniqueness of the ${NUM_UIDS} generated UIDs`, formatChecker(set));
    test(`Verify that all ${NUM_UIDS} generated UIDs consist of 16 lowercase alphanumeric characters`, duplicateChecker(set));
});

suite("Unit tests of uidGener()", { skip: false }, () => {
    // Obtain a set of UIDs
    let set = new Set([...uidGener(NUM_UIDS)]);
    // Unit tests
    test(`Verify uniqueness of the ${NUM_UIDS} generated UIDs`, formatChecker(set));
    test(`Verify that all ${NUM_UIDS} generated UIDs consist of 16 lowercase alphanumeric characters`, duplicateChecker(set));
});

