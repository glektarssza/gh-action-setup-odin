//-- NPM Packages
import * as core from '@actions/core';

//-- Project Code
import {execute as executeAction} from './action';
import {execute as executePreAction} from './preAction';
import {execute as executePostAction} from './postAction';
import {GitHubActionStage, getGitHubActionStage} from './utils';

const stage = getGitHubActionStage();

switch (stage) {
    case GitHubActionStage.PreAction:
        executePreAction().catch((err: Error) => {
            core.setFailed(err);
        });
        break;
    case GitHubActionStage.Action:
        executeAction().catch((err: Error) => {
            core.setFailed(err);
        });
        break;
    case GitHubActionStage.PostAction:
        executePostAction().catch((err: Error) => {
            core.setFailed(err);
        });
        break;
    case GitHubActionStage.Unknown:
        core.setFailed(Error('Unknown GitHub Action stage'));
}
