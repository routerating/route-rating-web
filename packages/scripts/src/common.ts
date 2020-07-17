import chalk from 'chalk'
import { execSync } from 'child_process'
import fs from 'fs'

export const getFileOrDefault = (
  filePath: string,
  defaultReturn = '{}'
): string => {
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath).toString()
    : defaultReturn
}

export const getPackages = (): string[] => {
  return JSON.parse(
    getFileOrDefault('./lerna.json')
  ).packages.map((element: string): string => element.replace('/*', ''))
}

export const log = (text: string): void => {
  console.log(`${chalk.blue('scripts')} ${chalk.green('info')} ${text}`)
}

export const run = (command: string): void => {
  log(`${chalk.hex('#956FD6')('run')} ${command}`)
  console.log(execSync(command).toString())
}
