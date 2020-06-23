#!/usr/bin/env node
const fs = require('fs')

const SHADOW_DIR = './.shadowroot'

const workspace = {
  folders: [
    { name: 'Project Files', path: SHADOW_DIR },
    { name: 'Project Scripts', path: 'scripts' },
    { name: 'Github Settings', path: '.github' },
    { name: 'VS Code Settings', path: '.vscode' },
    { name: 'Documentation', path: 'docs' },
    { name: 'Configuration', path: 'configs' },
  ],
  settings: JSON.parse(fs.readFileSync('./.vscode/settings.json') || '{}'),
  launch: JSON.parse(fs.readFileSync('./.vscode/launch.json') || '{}'),
  extensions: JSON.parse(fs.readFileSync('./.vscode/extensions.json') || '{}'),
}

const packages = JSON.parse(
  fs.readFileSync('./lerna.json') || '{}'
).packages.map((element) => element.replace('/*', ''))

packages.forEach((packageFolder) => {
  fs.readdirSync(packageFolder).forEach((package) => {
    workspace.folders.push({
      name: `@routerating/${package}`,
      path: `${packageFolder}/${package}`,
    })
  })
})

fs.writeFileSync('./code.code-workspace', JSON.stringify(workspace, null, 2))

if (!fs.existsSync(SHADOW_DIR)) {
  fs.mkdirSync(SHADOW_DIR)
}

fs.readdirSync('.').forEach((element) => {
  if (
    !fs.statSync(element).isDirectory() &&
    !fs.existsSync(`${SHADOW_DIR}/${element}`)
  ) {
    require('child_process').exec(`ln -s ./${element} ${SHADOW_DIR}/${element}`)
  }
})
