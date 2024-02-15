/**
 * The main module.
 */
const m = {
    /**
     * Get the string "Hello world!".
     *
     * @returns The string "Hello world!".
     */
    helloWorld(): string {
        return 'Hello world!';
    }
};

/**
 * Get the internal module for use with unit testing.
 *
 * @returns The internal module.
 *
 * @internal
 */
export function getTestingModule(): typeof m {
    return m;
}

/* eslint-disable no-empty-pattern, @typescript-eslint/unbound-method */
export const {helloWorld} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
