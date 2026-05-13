# FSADDApp

## Frontend Test and CI Improvements

This repository now includes an Angular frontend test workflow and Azure DevOps CI pipeline for the `photography-app` project.

### Key improvements

- Added component-level unit tests for reusable UI components.
- Configured Karma + Jasmine with headless Chrome for CI.
- Added `npm run test:ci` and coverage generation.
- Added Azure pipeline triggers for push and pull requests.
- Published coverage output as a build artifact.

### Local commands

From the repository root:

```bash
cd photography-app
npm ci
npm run test:ci
npm run build -- --configuration production
```

### Pipeline configuration

The Azure DevOps pipeline is defined in `azure-pipelines.yml` and runs on every push to `main` and on pull request validation.
