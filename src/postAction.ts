//-- NPM Packages
import * as core from '@actions/core';

/**
 * A module providing the post-action GitHub Action commands.
 */
const m = {
    async execute(): Promise<void> {
        core.debug('No post-action stage activities defined');
        return Promise.resolve();
    }
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
