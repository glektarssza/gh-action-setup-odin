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
            expect(r).toBe(GitHubActionStage.PostMain);
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
            expect(r).toBe(GitHubActionStage.PostMain);
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
            expect(r).toBe(GitHubActionStage.Main);
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
            expect(r).toBe(GitHubActionStage.Main);
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
            expect(r).toBe(GitHubActionStage.PreMain);
        });
    });
    describe('.isGitHubActionStage()', () => {
        let mockedGetStage: jest.SpyInstance<
            ReturnType<typeof testModule.getGitHubActionStage>
        >;
        beforeAll(() => {
            mockedGetStage = jest.spyOn(testModule, 'getGitHubActionStage');
        });
        afterAll(() => {
            mockedGetStage.mockRestore();
        });
        it('should return `true` if passed `GitHubActionStage.PreMain` and the stage is pre-main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.PreMain);

            //-- When
            const r = testModule.isGitHubActionStage(GitHubActionStage.PreMain);

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if passed `GitHubActionStage.PreMain` and the stage is not pre-main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.Main);

            //-- When
            const r = testModule.isGitHubActionStage(GitHubActionStage.PreMain);

            //-- Then
            expect(r).toBe(false);
        });
        it('should return `true` if passed `GitHubActionStage.Main` and the stage is main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.Main);

            //-- When
            const r = testModule.isGitHubActionStage(GitHubActionStage.Main);

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if passed `GitHubActionStage.Main` and the stage is not main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.PreMain);

            //-- When
            const r = testModule.isGitHubActionStage(GitHubActionStage.Main);

            //-- Then
            expect(r).toBe(false);
        });
        it('should return `true` if passed `GitHubActionStage.PostMain` and the stage is post-main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.PostMain);

            //-- When
            const r = testModule.isGitHubActionStage(
                GitHubActionStage.PostMain
            );

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if passed `GitHubActionStage.PostMain` and the stage is not post-main', () => {
            //-- Given
            mockedGetStage.mockReturnValueOnce(GitHubActionStage.Main);

            //-- When
            const r = testModule.isGitHubActionStage(
                GitHubActionStage.PostMain
            );

            //-- Then
            expect(r).toBe(false);
        });
    });
    describe('.isPreMainGitHubActionStage()', () => {
        let mockedIsStage: jest.SpyInstance<
            ReturnType<typeof testModule.isGitHubActionStage>,
            Parameters<typeof testModule.isGitHubActionStage>
        >;
        beforeAll(() => {
            mockedIsStage = jest.spyOn(testModule, 'isGitHubActionStage');
        });
        afterAll(() => {
            mockedIsStage.mockRestore();
        });
        it('should return `true` if the stage is pre-main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(true);

            //-- When
            const r = testModule.isPreMainGitHubActionStage();

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if the stage is not pre-main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(false);

            //-- When
            const r = testModule.isPreMainGitHubActionStage();

            //-- Then
            expect(r).toBe(false);
        });
    });
    describe('.isMainGitHubActionStage()', () => {
        let mockedIsStage: jest.SpyInstance<
            ReturnType<typeof testModule.isGitHubActionStage>,
            Parameters<typeof testModule.isGitHubActionStage>
        >;
        beforeAll(() => {
            mockedIsStage = jest.spyOn(testModule, 'isGitHubActionStage');
        });
        afterAll(() => {
            mockedIsStage.mockRestore();
        });
        it('should return `true` if the stage is main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(true);

            //-- When
            const r = testModule.isMainGitHubActionStage();

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if the stage is not main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(false);

            //-- When
            const r = testModule.isMainGitHubActionStage();

            //-- Then
            expect(r).toBe(false);
        });
    });
    describe('.isPostMainGitHubActionStage()', () => {
        let mockedIsStage: jest.SpyInstance<
            ReturnType<typeof testModule.isGitHubActionStage>,
            Parameters<typeof testModule.isGitHubActionStage>
        >;
        beforeAll(() => {
            mockedIsStage = jest.spyOn(testModule, 'isGitHubActionStage');
        });
        afterAll(() => {
            mockedIsStage.mockRestore();
        });
        it('should return `true` if the stage is post-main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(true);

            //-- When
            const r = testModule.isPostMainGitHubActionStage();

            //-- Then
            expect(r).toBe(true);
        });
        it('should return `false` if the stage is not post-main', () => {
            //-- Given
            mockedIsStage.mockReturnValueOnce(false);

            //-- When
            const r = testModule.isPostMainGitHubActionStage();

            //-- Then
            expect(r).toBe(false);
        });
    });
});
