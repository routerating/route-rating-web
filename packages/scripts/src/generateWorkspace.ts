import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { getFileOrDefault, getPackages } from './common'

import { exec } from 'child_process'

const SHADOW_DIR = './.shadowroot'

const workspace = {
  folders: [
    { name: 'Project Files', path: SHADOW_DIR },
    { name: 'Github Settings', path: '.github' },
    { name: 'VS Code Settings', path: '.vscode' },
    { name: 'Documentation', path: 'docs' },
    { name: 'Configuration', path: 'configs' },
    { name: 'Dev Container', path: '.devcontainer' },
  ],
  settings: JSON.parse(getFileOrDefault('./.vscode/settings.json')),
  launch: JSON.parse(getFileOrDefault('./.vscode/launch.json')),
  extensions: JSON.parse(getFileOrDefault('./.vscode/extensions.json')),
}

const packages = getPackages()

packages.forEach((packageFolder: string): void => {
  readdirSync(packageFolder).forEach((packageName: string): void => {
    workspace.folders.push({
      name: `@routerating/${packageName}`,
      path: `${packageFolder}/${packageName}`,
    })
  })
})

writeFileSync('./code.code-workspace', JSON.stringify(workspace, null, 2))

if (!existsSync(SHADOW_DIR)) {
  mkdirSync(SHADOW_DIR)
}

readdirSync('.').forEach((element: string): void => {
  if (
    !statSync(element).isDirectory() &&
    !existsSync(`${SHADOW_DIR}/${element}`)
  ) {
    exec(`ln -s ../${element} ${SHADOW_DIR}/${element}`)
  }
})
