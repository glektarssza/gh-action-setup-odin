//-- NodeJS
import fs from 'node:fs/promises';
import path from 'node:path';

//-- NPM Packages
import * as core from '@actions/core';
import * as compressing from 'compressing';

//-- Project Code
import {
    OdinVersion,
    downloadOdinRelease,
    getLatestRelease,
    parseVersion
} from './odin-repo';
import {createOctokit} from './utils';

async function main(): Promise<void> {
    const octokit = createOctokit();
    const version = core.getInput('odin-version', {required: true});
    let destinationPath = core.getInput('destination', {required: false});
    const addToPath = core.getBooleanInput('add-to-path', {required: false});
    if (!destinationPath) {
        destinationPath = path.resolve(
            process.env['GITHUB_WORKSPACE']!,
            './.odin'
        );
    }
    let odinVersion: OdinVersion;
    if (version !== 'latest') {
        odinVersion = parseVersion(version);
    } else {
        odinVersion = await getLatestRelease(octokit);
    }
    const archivePath = await downloadOdinRelease(
        odinVersion,
        destinationPath,
        octokit
    );
    core.info(`Unpacking Odin archive to "${destinationPath}"`);
    const archiveFile = await fs.open(archivePath, fs.constants.O_RDONLY);
    try {
        const rs = archiveFile.createReadStream();
        await compressing.zip.uncompress(rs, destinationPath);
        core.info(`Unpacked Odin archive`);
    } finally {
        await archiveFile.close();
    }
    if (process.platform !== 'win32') {
        core.info('Making Odin binary executable...');
        await fs.chmod(
            path.resolve(destinationPath, 'odin'),
            fs.constants.S_IXUSR
        );
    }
    core.setOutput('odin-version', odinVersion.join('-'));
    core.setOutput('odin-path', destinationPath);
    core.setOutput(
        'odin-binary-path',
        path.resolve(
            destinationPath,
            `./odin${process.platform === 'win32' ? '.exe' : ''}`
        )
    );
    if (addToPath) {
        core.addPath(destinationPath);
        core.info(
            `Odin binary at "${path.resolve(destinationPath, 'odin')}${process.platform === 'win32' ? '.exe' : ''}" added to system path`
        );
    }
}

main().catch((err: Error) => {
    core.setFailed(err.message);
});
