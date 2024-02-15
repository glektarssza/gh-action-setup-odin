//-- NodeJS
import fs from 'node:fs/promises';

//-- NPM Packages
import * as core from '@actions/core';

async function main(): Promise<void> {
    const odinPath = core.getState('odin-path');
    try {
        await fs.access(odinPath);
    } catch {
        core.warning(`Could not find Odin path at "${odinPath}"`);
        return;
    }
    const stat = await fs.stat(odinPath);
    if (!stat.isDirectory()) {
        throw new Error(`Cannot remove "${odinPath}" (not a directory)`);
    }
    await fs.rm(odinPath, {recursive: true, force: true});
}

main().catch((err: Error) => {
    core.setFailed(err.message);
});
