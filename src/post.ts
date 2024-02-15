//-- NodeJS
import fs from 'node:fs/promises';
import path from 'node:path';

//-- NPM Packages
import * as core from '@actions/core';

async function main(): Promise<void> {
    let destinationPath = core.getInput('destination', {required: false});
    if (!destinationPath) {
        destinationPath = path.resolve(
            process.env['GITHUB_WORKSPACE']!,
            './.odin'
        );
    }
    try {
        await fs.access(destinationPath);
    } catch {
        core.info(
            `Could not find Odin path at "${destinationPath}", skipping cleanup`
        );
        return;
    }
    const stat = await fs.stat(destinationPath);
    if (!stat.isDirectory()) {
        throw new Error(`Cannot remove "${destinationPath}" (not a directory)`);
    }
    core.info(`Cleaning up Odin install at "${destinationPath}"`);
    await fs.rm(destinationPath, {recursive: true, force: true});
}

main().catch((err: Error) => {
    core.setFailed(err.message);
});
