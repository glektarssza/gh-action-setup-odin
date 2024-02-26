//-- NodeJS
import path from 'node:path';

//-- NPM Packages
import {Config} from 'jest';

/**
 * The Jest configuration.
 */
const config: Config = {
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [['html', {subdir: 'html'}], 'text'],
    maxConcurrency: 5,
    maxWorkers: '50%',
    moduleNameMapper: {},
    preset: 'ts-jest',
    prettierPath: null,
    reporters: ['default'],
    resetMocks: true,
    resetModules: true,
    rootDir: path.resolve(__dirname),
    showSeed: true,
    testMatch: ['**/*.spec.ts'],
    workerThreads: true
};

export default config;
