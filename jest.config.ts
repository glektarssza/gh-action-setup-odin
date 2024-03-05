//-- NodeJS
import path from 'node:path';

//-- NPM Packages
import {JestConfigWithTsJest} from 'ts-jest';

/**
 * The Jest configuration.
 */
const config: JestConfigWithTsJest = {
    rootDir: path.resolve(__dirname),
    testEnvironment: 'node',
    testMatch: ['**.spec.ts'],
    reporters: ['default'],
    resetMocks: true,
    maxConcurrency: 5,
    maxWorkers: '50%',
    workerThreads: true,
    showSeed: true,
    preset: 'ts-jest',
    prettierPath: null,
    passWithNoTests: true,
    coverageDirectory: path.resolve(__dirname, 'coverage'),
    coverageProvider: 'v8',
    coverageReporters: ['text', 'html']
};

export default config;
