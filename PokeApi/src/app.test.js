const { test, expect } = require('@jest/globals');

describe('Application Tests', () => {
    test('should return true for true', () => {
        expect(true).toBe(true);
    });

    test('should add numbers correctly', () => {
        expect(1 + 1).toBe(2);
    });
});