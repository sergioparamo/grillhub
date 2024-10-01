// lib/randomNumberGenerator.ts
import { randomInt } from 'crypto';

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param min - The minimum integer value (inclusive).
 * @param max - The maximum integer value (inclusive).
 * @returns A random integer between min and max.
 */
export const generateRandomNumber = (min: number, max: number): number => {
    if (min > max) {
        throw new Error('Min must be less than or equal to max');
    }
    return randomInt(min, max + 1); // randomInt is exclusive on the max value
};