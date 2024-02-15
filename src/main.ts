//-- NodeJS
import fs from 'node:fs/promises';
import path from 'node:path';

//-- NPM Packages
import core from '@actions/core';
import compressing from 'compressing';

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
    const archiveFile = await fs.open(archivePath, fs.constants.O_RDONLY);
    try {
        const rs = archiveFile.createReadStream();
        await compressing.zip.uncompress(rs, destinationPath);
    } finally {
        await archiveFile.close();
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
    }
    core.saveState('odin-path', destinationPath);
}

main().catch((err: Error) => {
    core.setFailed(err.message);
});
