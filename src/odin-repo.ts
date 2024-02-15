//-- NodeJS
import {PathLike} from 'node:fs';

//-- NPM Packages
import * as core from '@actions/core';

//-- Project Code
import {
    downloadRepositoryReleaseAsset,
    getRepositoryLatestRelease,
    getRepositoryReleaseByTag,
    listRepositoryReleaseAssets,
    Octokit,
    Release
} from './utils';

/**
 * A type defining known Odin version streams.
 */
export type OdinStream = 'dev';

/**
 * A type which defines the format of an Odin release.
 */
export type OdinVersion = [OdinStream, string, string];

/**
 * An array defining known Odin version streams.
 */
export const ODIN_STREAMS = ['dev'];

/**
 * A regular expression for validating month numbers.
 */
const MONTH_REGEX = /^(0[1-9]|1[1-2])$/;

/**
 * A regular expression for validating year numbers.
 */
const YEAR_REGEX = /^\d{4}$/;

/**
 * A module which provides a utility functionality related to the Odin
 * repository.
 */
const m = {
    /**
     * Parse a string into an Odin version.
     *
     * An Odin version is a string in the following format:
     *
     * ```bnf
     * <odin-version> := <stream> "-" <year> "-" <month>
     * <stream> := "dev"
     * <year> := <digit> <digit> <digit> <digit>
     * <month> := "0" <month-digit> | "1" <month-digit-2>
     * <month-digit> := "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
     * <month-digit-2> := "1" | "2"
     * <digit> := "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
     * ```
     *
     * @param str - The string to parse.
     *
     * @returns An Odin version.
     *
     * @throws `Error`
     * Thrown if the string contains the wrong number of parts.
     * @throws `Error`
     * Thrown if the stream component is not a known Odin stream.
     * @throws `Error`
     * Thrown if the year component is not a valid year number.
     * @throws `Error`
     * Thrown if the month component is not a valid month number.
     */
    parseVersion(str: string): OdinVersion {
        core.debug(`Parsing Odin version from "${str}"...`);
        const split = str.split('-');
        if (split.length !== 3) {
            throw new Error(
                'Cannot parse Odin version (wrong number of parts)'
            );
        }
        const [stream, year, month] = split;
        if (!ODIN_STREAMS.includes(stream)) {
            throw new Error(
                `Cannot parse Odin version (unknown stream "${stream}")`
            );
        }
        if (!YEAR_REGEX.test(year)) {
            throw new Error(
                `Cannot parse Odin version (invalid year "${year}")`
            );
        }
        if (!MONTH_REGEX.test(month)) {
            throw new Error(
                `Cannot parse Odin version (invalid month "${month}")`
            );
        }
        core.debug(`Parsed Odin version`);
        core.debug(`Stream: ${stream}, Year: ${year}, Month: ${month}`);
        return [stream as OdinStream, year, month];
    },

    async getLatestRelease(octokit: Octokit): Promise<OdinVersion> {
        core.info('Getting latest Odin release...');
        const release = await getRepositoryLatestRelease(
            {
                owner: 'odin-lang',
                repo: 'odin'
            },
            octokit
        );
        const odinVersion = m.parseVersion(release.tag_name);
        core.info(`Latest Odin release is "${odinVersion.join('-')}"`);
        return odinVersion;
    },

    async findRelease(
        version: OdinVersion,
        octokit: Octokit
    ): Promise<Release> {
        core.info(`Finding Odin release for version "${version.join('-')}"...`);
        const release = await getRepositoryReleaseByTag(
            {
                owner: 'odin-lang',
                repo: 'odin',
                tag: version.join('-')
            },
            octokit
        );
        core.info(
            `Found Odin release for version "${version.join('-')}" (release ${release.id})`
        );
        return release;
    },

    async downloadOdinRelease(
        version: OdinVersion,
        destinationFolder: PathLike,
        octokit: Octokit
    ): Promise<PathLike> {
        core.info(
            `Downloading Odin version "${version.join('-')}" to "${destinationFolder.toString('utf-8')}"...`
        );
        const release = await m.findRelease(version, octokit);
        const assets = await listRepositoryReleaseAssets(
            {
                owner: 'odin-lang',
                repo: 'odin',
                release_id: release.id
            },
            octokit
        );
        let odinTargetOS: 'windows' | 'macos' | 'ubuntu';
        switch (process.platform) {
            case 'win32':
                odinTargetOS = 'windows';
                break;
            case 'darwin':
                odinTargetOS = 'macos';
                break;
            case 'linux':
                odinTargetOS = 'ubuntu';
                break;
            default:
                throw new Error(`Unsupported platform "${process.platform}"`);
        }
        const odinAsset = assets.find(({name}) => name.includes(odinTargetOS));
        if (!odinAsset) {
            throw new Error(
                `Could not find a suitable Odin archive for platform "${process.platform}"`
            );
        }
        const archivePath = await downloadRepositoryReleaseAsset(
            {
                owner: 'odin-lang',
                repo: 'odin',
                asset_id: odinAsset.id
            },
            destinationFolder,
            octokit
        );
        core.info(
            `Downloaded Odin release archive to "${archivePath.toString('utf-8')}"`
        );
        return archivePath;
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
export const {
    downloadOdinRelease,
    findRelease,
    getLatestRelease,
    parseVersion
} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
