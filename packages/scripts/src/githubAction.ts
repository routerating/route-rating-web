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

const jobs: Record<string, unknown> = {
  name: 'CI',
  on: ['push'],
  jobs: {
    build: {
      ...JOB_PROPERTIES,
      name: 'Build',
      steps: getSteps([{ name: 'Build', run: 'yarn build' }]),
    },
    lint: {
      ...JOB_PROPERTIES,
      name: 'Lint',
      steps: getSteps([{ name: 'Lint', run: 'yarn lint' }]),
    },
    test: {
      ...JOB_PROPERTIES,
      name: 'Test',
      steps: getSteps([{ name: 'Test', run: 'yarn test' }]),
    },
    publish: {
      ...JOB_PROPERTIES,
      if: IS_MASTER,
      needs: ['build', 'test'],
      name: 'Publish',
      steps: getSteps([
        { name: 'Publish', run: 'yarn run lerna run publish from-package' },
      ]),
    },
  },
}

writeFileSync('.github/workflows/ci.yaml', YAML.stringify(jobs))
