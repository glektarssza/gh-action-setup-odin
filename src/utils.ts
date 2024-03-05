//-- NPM Packages
import * as core from '@actions/core';

/**
 * An enumeration of stages of a GitHub Action.
 */
export enum GitHubActionStage {
    /**
     * The GitHub Action is in the pre-action stage.
     */
    PreAction,

    /**
     * The GitHub Action is in the main action stage.
     */
    Action,

    /**
     * The GitHub Action is in the post-action stage.
     */
    PostAction,

    /**
     * The GitHub Action is in an unknown stage.
     */
    Unknown
}

/**
 * A module providing various utility functionalities.
 */
const m = {
    /**
     * Get the current execution stage of the GitHub Action.
     *
     * @returns The current execution stage of the GitHub Action.
     */
    getGitHubActionStage(): GitHubActionStage {
        if (core.getState('last-action-stage') === '') {
            return GitHubActionStage.PreAction;
        } else if (core.getState('last-action-stage') === 'pre-action') {
            return GitHubActionStage.Action;
        } else if (core.getState('last-action-stage') === 'action') {
            return GitHubActionStage.PostAction;
        }
        return GitHubActionStage.Unknown;
    }
};

/**
 * Get the internal module for unit testing.
 */
export function getTestModule(): typeof m {
    return m;
}

/* eslint-disable no-empty-pattern, @typescript-eslint/unbound-method */
export const {} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
