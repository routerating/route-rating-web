/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as YAML from 'json2yaml'

import { writeFileSync } from 'fs'

interface Plugin {
  name: string
  uses: string
  with?: Record<string, string>
}

interface Script {
  name: string
  run: string
  with?: Record<string, string>
}

type Step = Plugin | Script

const IS_MASTER = "github.ref == 'refs/heads/master'"

const AWS: Plugin = {
  name: 'Setup AWS',
  uses: 'aws-actions/configure-aws-credentials@v1',
  with: {
    'aws-access-key-id': '${{ secrets.AWS_ACCESS_KEY_ID }}',
    'aws-secret-access-key': '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
    'aws-region': 'us-east-2',
  },
}

const NODE: Plugin = {
  name: 'Setup node',
  uses: 'actions/setup-node@v1',
  with: {
    'node-version': '12.18',
  },
}

const CHECKOUT: Plugin = {
  name: 'Checkout code',
  uses: 'actions/checkout@v2',
}

const PYTHON: Plugin = {
  name: 'Setup python',
  uses: 'actions/setup-python@v1',
  with: {
    'python-version': '3.8',
  },
}

const SETUP_SCRIPT: Script = {
  name: 'Setup script',
  run: './.github/workflows/setup.sh',
}

const JOB_PROPERTIES: Record<string, unknown> = {
  'runs-on': 'ubuntu-latest',
  env: { NPM_AUTH_TOKEN: '${{ secrets.NPM_AUTH_TOKEN }}' },
}

const MASTER_JOB_PROPERTIES: Record<string, unknown> = {
  ...JOB_PROPERTIES,
  if: IS_MASTER,
}

const JOB_SETUP: ReadonlyArray<Step> = [
  CHECKOUT,
  AWS,
  NODE,
  PYTHON,
  SETUP_SCRIPT,
]

const getSteps = (steps: ReadonlyArray<Step>): ReadonlyArray<Step> => [
  ...JOB_SETUP,
  ...steps,
]

const getTagStep = (
  name: string,
  prefix: string,
  root: string
): Record<string, unknown> => {
  return {
    name,
    uses: 'butlerlogic/action-autotag@stable',
    with: {
      GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      tag_prefix: prefix,
      root,
    },
  }
}

const getJob = (
  name: string,
  steps: ReadonlyArray<Step>,
  needs?: ReadonlyArray<string>
): Record<string, unknown> => ({
  ...JOB_PROPERTIES,
  name,
  needs,
  steps: getSteps(steps),
})

const getMasterJob = (
  name: string,
  steps: ReadonlyArray<Step>,
  needs?: ReadonlyArray<string>
): Record<string, unknown> => ({
  ...MASTER_JOB_PROPERTIES,
  name,
  needs,
  steps: getSteps(steps),
})

const jobs: Record<string, unknown> = {
  name: 'CI',
  on: ['push'],
  jobs: {
    build: getJob('Build', [{ name: 'Build', run: 'yarn build' }]),
    lint: getJob('Lint', [{ name: 'Lint', run: 'yarn lint' }]),
    test: getJob('Test', [{ name: 'Test', run: 'yarn test' }]),
    publish: getMasterJob(
      'Publish',
      [{ name: 'Publish', run: 'yarn run lerna run publish from-package' }],
      ['build', 'test']
    ),
    tag: {
      ...MASTER_JOB_PROPERTIES,
      needs: ['build', 'test'],
      name: 'Tag',
      steps: [
        CHECKOUT,
        getTagStep(
          'Tag @routerating/requests',
          '@routerating/requests@v',
          'packages/requests/package.json'
        ),
        getTagStep(
          'Tag @routerating/components',
          '@routerating/components@v',
          'packages/components/package.json'
        ),
        getTagStep(
          'Tag @routerating/interfaces',
          '@routerating/interfaces@v',
          'packages/interfaces/package.json'
        ),
        getTagStep(
          'Tag @routerating/scripts',
          '@routerating/scripts@v',
          'packages/scripts/package.json'
        ),
        getTagStep(
          'Tag @routerating/api',
          '@routerating/api@v',
          'apps/api/package.json'
        ),
        getTagStep(
          'Tag @routerating/web',
          '@routerating/web@v',
          'apps/web/package.json'
        ),
      ],
    },
    'deploy-dev': getMasterJob(
      'Deploy dev',
      [
        {
          name: 'Deploy dev',
          run:
            'JWT_SECRET=${{ secrets.JWT_SECRET }} REFRESH_SECRET=${{ secrets.REFRESH_SECRET }} yarn deploy:dev',
        },
      ],
      ['build', 'test']
    ),
    'integration-test-remote': getMasterJob(
      'Integration test remote',
      [
        {
          name: 'Integration test remote',
          run:
            'JWT_SECRET=${{ secrets.JWT_SECRET }} REFRESH_SECRET=${{ secrets.REFRESH_SECRET }} TEST_VALID_BASIC_JWT=${{ secrets.TEST_VALID_BASIC_JWT }} TEST_VALID_ADMIN_JWT=${{ secrets.TEST_VALID_ADMIN_JWT }} TEST_INVALID_JWT=${{ secrets.TEST_INVALID_JWT }} yarn test:int:dev',
        },
      ],
      ['deploy-dev']
    ),
    'deploy-prod': getMasterJob(
      'Deploy prod',
      [
        {
          name: 'Deploy prod',
          run:
            'JWT_SECRET=${{ secrets.JWT_SECRET }} REFRESH_SECRET=${{ secrets.REFRESH_SECRET }} yarn deploy:prod',
        },
      ],
      ['integration-test-remote']
    ),
    'smoke-test': getMasterJob(
      'Smoke test',
      [
        {
          name: 'Smoke test',
          run:
            'JWT_SECRET=${{ secrets.JWT_SECRET }} REFRESH_SECRET=${{ secrets.REFRESH_SECRET }} TEST_VALID_BASIC_JWT=${{ secrets.TEST_VALID_BASIC_JWT }} TEST_VALID_ADMIN_JWT=${{ secrets.TEST_VALID_ADMIN_JWT }} TEST_INVALID_JWT=${{ secrets.TEST_INVALID_JWT }} yarn test:int:prod',
        },
      ],
      ['deploy-prod']
    ),
  },
}

writeFileSync('.github/workflows/ci.yaml', YAML.stringify(jobs))
