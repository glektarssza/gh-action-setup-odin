const os = require('node:os');
const path = require('node:path');

/**
 * The number of CPUs the system has.
 *
 * @type {number}
 */
const cpuCount = os.cpus().length > 0 ? os.cpus().length : 1;

/**
 * The number of jobs to run Mocha with.
 *
 * Defaults to `FLOOR(CPU COUNT / 2)` if there is more than one CPU available,
 * otherwise it defaults to `1`.
 *
 * @type {number}
 */
const jobCount = cpuCount > 1 ? Math.floor(cpuCount / 2) : 1;

/**
 * Whether to enable parallel test processing in Mocha.
 *
 * Defaults to `true` if the number of jobs to be used is greater than one,
 * otherwise `false`.
 *
 * @type {boolean}
 */
const enableParallel = jobCount > 1;

//-- Set the TypeScript project configuration location for `ts-node`.
process.env['TS_NODE_PROJECT'] = path.resolve(
    __dirname,
    './tests/tsconfig.json'
);

/**
 * The Mocha configuration.
 *
 * @type {Record<string, any>}
 */
const config = {
    spec: path.resolve(__dirname, './tests/**.spec.ts'),
    ui: 'bdd',
    reporter: 'spec',
    jobs: jobCount,
    parallel: enableParallel,
    extension: ['ts'],
    recursive: false,
    failZero: false,
    checkLeaks: true,
    require: [
        'source-map-support/register',
        'ts-node/register',
        'tsconfig-paths/register'
    ]
};

module.exports = config;
