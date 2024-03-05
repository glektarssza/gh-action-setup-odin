jest.mock('@actions/core');

//-- NPM Packages
import {base, en, en_CA, en_US, Faker} from '@faker-js/faker';
import * as core from '@actions/core';

//-- Project Code
import {getTestModule, GitHubActionStage} from '../src/utils';

/**
 * The mocked `@actions/core` module.
 */
const mockCore = jest.mocked(core);

/**
 * The module under test.
 */
const mod = getTestModule();

/**
 * The fake data generation instance.
 */
const faker = new Faker({
    locale: [en_CA, en_US, en, base]
});

describe('module:utils', () => {
    beforeAll(() => {
        faker.seed(jest.getSeed());
    });
    describe('.getGitHubActionStage()', () => {
        it('should return `GitHubActionStage.PreAction` if the stage is pre-action', () => {
            //-- Given
            mockCore.getState.mockReturnValue('');

            //-- When
            const r = mod.getGitHubActionStage();

            //-- Then
            expect(r).toBe(GitHubActionStage.PreAction);
        });
        it('should return `GitHubActionStage.Action` if the stage is the main action', () => {
            //-- Given
            mockCore.getState.mockReturnValue('pre-action');

            //-- When
            const r = mod.getGitHubActionStage();

            //-- Then
            expect(r).toBe(GitHubActionStage.Action);
        });
        it('should return `GitHubActionStage.PostAction` if the stage is post-action', () => {
            //-- Given
            mockCore.getState.mockReturnValue('action');

            //-- When
            const r = mod.getGitHubActionStage();

            //-- Then
            expect(r).toBe(GitHubActionStage.PostAction);
        });
        it('should return `GitHubActionStage.Unknown` if the stage is unknown', () => {
            //-- Given
            mockCore.getState.mockReturnValue('uhhhhhhh?');

            //-- When
            const r = mod.getGitHubActionStage();

            //-- Then
            expect(r).toBe(GitHubActionStage.Unknown);
        });
    });
});
