//-- Mocks
jest.mock('@actions/core');

//-- NPM Packages
import * as core from '@actions/core';
import {base, en, en_CA, en_US, Faker} from '@faker-js/faker';

//-- Project Code
import {getTestingModule, GitHubActionStage} from '@src/v2/utils';

/**
 * The mock GitHub Actions core package.
 */
const mockedCore = core as jest.Mocked<typeof core>;

/**
 * The module under test.
 */
const testModule = getTestingModule();

/**
 * The fake data provider.
 */
const fake = new Faker({
    locale: [en_CA, en_US, en, base]
});

describe('module:utils', () => {
    beforeAll(() => {
        fake.seed(jest.getSeed());
    });
    describe('.getGitHubActionStage()', () => {
        it('should return `GitHubActionStage.PostMain` if the `postMainStarted` state is set', () => {
            //-- Given
            mockedCore.getState
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('true');

            //-- When
            const r = testModule.getGitHubActionStage();

            //-- Then
            expect(r).toEqual(GitHubActionStage.PostMain);
        });
        it('should return `GitHubActionStage.PostMain` if the `mainFinished` state is set', () => {
            //-- Given
            mockedCore.getState
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('true')
                .mockReturnValueOnce('');

            //-- When
            const r = testModule.getGitHubActionStage();

            //-- Then
            expect(r).toEqual(GitHubActionStage.PostMain);
        });
        it('should return `GitHubActionStage.Main` if the `mainStarted` state is set', () => {
            //-- Given
            mockedCore.getState
                .mockReturnValueOnce('')
                .mockReturnValueOnce('true')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('');

            //-- When
            const r = testModule.getGitHubActionStage();

            //-- Then
            expect(r).toEqual(GitHubActionStage.Main);
        });
        it('should return `GitHubActionStage.Main` if the `preMainFinished` state is set', () => {
            //-- Given
            mockedCore.getState
                .mockReturnValueOnce('true')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('');

            //-- When
            const r = testModule.getGitHubActionStage();

            //-- Then
            expect(r).toEqual(GitHubActionStage.Main);
        });
        it('should return `GitHubActionStage.PreMain` if no state is set', () => {
            //-- Given
            mockedCore.getState
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('')
                .mockReturnValueOnce('');

            //-- When
            const r = testModule.getGitHubActionStage();

            //-- Then
            expect(r).toEqual(GitHubActionStage.PreMain);
        });
    });
});
