const fs = require('fs')

const getFileOrDefault = (filePath, defaultReturn = '{}') =>
  fs.existsSync(filePath) ? fs.readFileSync(filePath) : defaultReturn

const getPackages = () =>
  JSON.parse(getFileOrDefault('./lerna.json')).packages.map((element) =>
    element.replace('/*', '')
  )

module.exports = {
  getFileOrDefault,
  getPackages,
}
