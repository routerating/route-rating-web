import { getPackages, run } from './common'

import { readdirSync } from 'fs'

run('yarn run --silent ncu --upgrade --packageFile package.json')

const packages = getPackages()

packages.forEach((packageFolder: string): void => {
  readdirSync(packageFolder).forEach((packageName: string): void => {
    run(
      `yarn run --silent ncu --upgrade --packageFile ${packageFolder}/${packageName}/package.json`
    )
  })
})

run('yarn bootstrap')
