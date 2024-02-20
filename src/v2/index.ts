//-- NPM Packages
import * as core from '@actions/core';

//-- Project Code
import {getGitHubActionStage, GitHubActionStage} from './utils';
import * as main from './main';
import * as postMain from './postMain';

switch (getGitHubActionStage()) {
    case GitHubActionStage.PreMain:
        //-- Does nothing
        break;
    case GitHubActionStage.Main:
        core.saveState('mainStarted', 'true');
        main.run()
            .catch((err: Error) => {
                core.setFailed(err.message);
            })
            .finally(() => {
                core.saveState('mainFinished', 'true');
            });
        break;
    case GitHubActionStage.PostMain:
        core.saveState('postMainStarted', 'true');
        postMain.run().catch((err: Error) => {
            core.setFailed(err.message);
        });
        break;
}
