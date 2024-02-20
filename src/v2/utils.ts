//-- NPM Packages
import * as core from '@actions/core';

/**
 * An enumeration of the stages of a GitHub Action.
 */
export enum GitHubActionStage {
    /**
     * The pre-main stage.
     */
    PreMain,

    /**
     * The main stage.
     */
    Main,

    /**
     * The post-main stage.
     */
    PostMain
}

/**
 * A module which provides various utility functionalities.
 */
const m = {
    /**
     * Get the stage of the GitHub Action that is running.
     *
     * @returns The stage of the GitHub Action that is running.
     */
    getGitHubActionStage(): GitHubActionStage {
        const isPreMainFinished = core.getState('preMainFinished') === 'true';
        const isMainStarted = core.getState('mainStarted') === 'true';
        const isMainFinished = core.getState('mainFinished') === 'true';
        const isPostMainStarted = core.getState('postMainStarted') === 'true';
        if (isPostMainStarted || isMainFinished) {
            return GitHubActionStage.PostMain;
        }
        if (isMainStarted || isPreMainFinished) {
            return GitHubActionStage.Main;
        }
        return GitHubActionStage.PreMain;
    },

    /**
     * Check if the current GitHub Action stage equals the given stage.
     *
     * @param stage - The stage to compare the current GitHub Action stage to.
     *
     * @returns `true` if the current GitHub Action stage equals the given
     * stage; `false` otherwise.
     */
    isGitHubActionStage(stage: GitHubActionStage) {
        return m.getGitHubActionStage() === stage;
    },

    /**
     * Check if the current GitHub Action stage is the pre-main stage.
     *
     * @returns `true` if the current GitHub Action stage is the pre-main stage;
     * `false` otherwise.
     */
    isPreMainGitHubActionStage(): boolean {
        return m.isGitHubActionStage(GitHubActionStage.PreMain);
    },

    /**
     * Check if the current GitHub Action stage is the main stage.
     *
     * @returns `true` if the current GitHub Action stage is the main stage;
     * `false` otherwise.
     */
    isMainGitHubActionStage(): boolean {
        return m.isGitHubActionStage(GitHubActionStage.Main);
    },

    /**
     * Check if the current GitHub Action stage is the post-main stage.
     *
     * @returns `true` if the current GitHub Action stage is the post-main
     * stage; `false` otherwise.
     */
    isPostMainGitHubActionStage(): boolean {
        return m.isGitHubActionStage(GitHubActionStage.PostMain);
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
export const {} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
