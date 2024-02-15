//-- NodeJS
import {PathLike} from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

//-- NPM Packages
import * as core from '@actions/core';
import * as github from '@actions/github';
import {Endpoints} from '@octokit/types';

/**
 * An alias type for GitHub Octokit objects.
 */
export type Octokit = ReturnType<(typeof github)['getOctokit']>;

/**
 * An alias type for the release object returned from a {@link Octokit}
 * instance.
 */
export type Release =
    Endpoints['GET /repos/{owner}/{repo}/releases/{release_id}']['response']['data'];

/**
 * An alias type for the inputs required to get a {@link Release} object.
 */
export type ReleaseInputs =
    Endpoints['GET /repos/{owner}/{repo}/releases/{release_id}']['parameters'];

/**
 * An alias type for the release object returned from a {@link Octokit}
 * instance.
 */
export type ReleaseByTag =
    Endpoints['GET /repos/{owner}/{repo}/releases/tags/{tag}']['response']['data'];

/**
 * An alias type for the inputs required to get a {@link Release} object.
 */
export type ReleaseByTagInputs =
    Endpoints['GET /repos/{owner}/{repo}/releases/tags/{tag}']['parameters'];

/**
 * An alias type for the release object returned from a {@link Octokit}
 * instance.
 */
export type LatestRelease =
    Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data'];

/**
 * An alias type for the inputs required to get a {@link LatestRelease} object.
 */
export type LatestReleaseInputs =
    Endpoints['GET /repos/{owner}/{repo}/releases/latest']['parameters'];

/**
 * An alias type for the release asset list returned from a {@link Octokit}
 * instance.
 */
export type ReleaseAssets =
    Endpoints['GET /repos/{owner}/{repo}/releases/{release_id}/assets']['response']['data'];

/**
 * An alias type for the inputs required to get a {@link ReleaseAssets} list.
 */
export type ReleaseAssetsInputs =
    Endpoints['GET /repos/{owner}/{repo}/releases/{release_id}/assets']['parameters'];

/**
 * An alias type for the release asset object returned from a {@link Octokit}
 * instance.
 */
export type ReleaseAsset =
    Endpoints['GET /repos/{owner}/{repo}/releases/assets/{asset_id}']['response']['data'];

/**
 * An alias type for the inputs required to get a {@link ReleaseAsset} object.
 */
export type ReleaseAssetInputs =
    Endpoints['GET /repos/{owner}/{repo}/releases/assets/{asset_id}']['parameters'];

/**
 * A module which provides a utility functionality.
 */
const m = {
    /**
     * Create a new {@link Octokit} instance.
     *
     * @returns A new {@link Octokit} instance.
     */
    createOctokit(): Octokit {
        const authToken = core.getInput('auth-token', {required: true});
        if (!authToken) {
            throw new Error(
                'Failed to create Octokit instance (no authentication token provided)'
            );
        }
        return github.getOctokit(authToken);
    },

    /**
     * Get the latest release for a given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The latest release for the given repository.
     */
    async getRepositoryLatestRelease(
        params: LatestReleaseInputs,
        octokit: Octokit
    ): Promise<LatestRelease> {
        const {data} = await octokit.rest.repos.getLatestRelease({
            ...params
        });
        return data;
    },

    /**
     * Get the latest release for a given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The latest release for the given repository.
     */
    async getRepositoryReleaseByTag(
        params: ReleaseByTagInputs,
        octokit: Octokit
    ): Promise<ReleaseByTag> {
        const {data} = await octokit.rest.repos.getReleaseByTag({
            ...params
        });
        return data;
    },

    /**
     * Get the a release from a given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The requested release for the given repository.
     */
    async getRepositoryRelease(
        params: ReleaseInputs,
        octokit: Octokit
    ): Promise<Release> {
        const {data} = await octokit.rest.repos.getRelease({
            ...params
        });
        return data;
    },

    /**
     * Get the a release from a given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The requested release for the given repository.
     */
    async listRepositoryReleaseAssets(
        params: ReleaseAssetsInputs,
        octokit: Octokit
    ): Promise<ReleaseAssets> {
        const {data} = await octokit.rest.repos.listReleaseAssets({
            ...params
        });
        return data;
    },

    /**
     * Get the a release asset from a given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The requested release for the given repository.
     */
    async getRepositoryReleaseAsset(
        params: ReleaseAssetInputs,
        octokit: Octokit
    ): Promise<ReleaseAsset> {
        const {data} = await octokit.rest.repos.getReleaseAsset({
            ...params
        });
        return data;
    },

    /**
     * Download a release asset from the given repository.
     *
     * @param params - The parameters defining the repository to fetch
     * information from.
     * @param destinationFolder - The folder to download the release asset to.
     * @param octokit - The {@link Octokit} instance to use.
     *
     * @returns The path to the downloaded asset.
     */
    async downloadRepositoryReleaseAsset(
        params: ReleaseAssetInputs,
        destinationFolder: PathLike,
        octokit: Octokit
    ): Promise<PathLike> {
        //-- Ensure out destination exists
        await fs.mkdir(destinationFolder, {
            recursive: true
        });
        const asset = await m.getRepositoryReleaseAsset(params, octokit);
        const destination = path.resolve(
            destinationFolder.toString('utf-8'),
            asset.name
        );
        const {data} = await octokit.rest.repos.getReleaseAsset({
            ...params,
            headers: {
                accept: 'application/octet-stream'
            }
        });
        await fs.writeFile(
            destination,
            Buffer.from(data as unknown as ArrayBuffer),
            'binary'
        );
        return destination;
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
    createOctokit,
    downloadRepositoryReleaseAsset,
    getRepositoryLatestRelease,
    getRepositoryRelease,
    getRepositoryReleaseAsset,
    getRepositoryReleaseByTag,
    listRepositoryReleaseAssets
} = m;
/* eslint-enable no-empty-pattern, @typescript-eslint/unbound-method */
