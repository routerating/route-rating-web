#!/usr/bin/env node
const cp = require('child_process')
const fs = require('fs')
const common = require('./common')

const { getPackages } = common

const packages = getPackages()

packages.forEach((packageFolder) => {
  fs.readdirSync(packageFolder).forEach((package) => {
    console.log(
      `--------------------------------------------------------------`
    )
    console.log(`Package: ${packageFolder}/${package}`)
    console.log(
      cp
        .execSync(
          `yarn run --silent ncu --upgrade --packageFile ${packageFolder}/${package}/package.json`
        )
        .toString()
    )
    console.log()
  })
})
