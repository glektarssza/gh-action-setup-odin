/**
 * A module which provides the main GitHub Action entry point.
 */
const m = {
    async run(): Promise<void> {}
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
export const {run} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
