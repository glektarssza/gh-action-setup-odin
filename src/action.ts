/**
 * A module providing the main GitHub Action commands.
 */
const m = {
    async execute(): Promise<void> {}
};

/**
 * Get the internal module for unit testing.
 */
export function getTestModule(): typeof m {
    return m;
}

/* eslint-disable no-empty-pattern, @typescript-eslint/unbound-method */
export const {execute} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
