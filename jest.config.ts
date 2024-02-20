import type {Config} from 'jest';

/**
 * The Jest configuration.
 */
const config: Config = {
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^@src/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/**/index.ts',
        '!**/node_modules/**',
        '!**/tests/**'
    ],
    unmockedModulePathPatterns: ['faker'],
    resetMocks: true,
    coverageProvider: 'v8',
    prettierPath: null,
    reporters: ['jest-silent-reporter', 'summary'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tests/tsconfig.json',
                useESM: true
            }
        ]
    }
};

export default config;
