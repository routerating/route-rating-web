#!/bin/sh -e

PWD=$(pwd)

# yarn config set "//registry.npmjs.org/:_authToken" "$1" && yarn config set "@lukeshay:registry" "https://registry.npmjs.org/"

npm i -g npm-cli-login
npm-cli-login

DATE=$(date +'%m-%d-%y-%H-%M')
BRANCH_NAME="release-${DATE}"
DATE=$(date +'%m-%d-%y %H:%M')
COMMIT="Release ${DATE}"
PR_DESC="Published release on ${DATE}"

node common/scripts/install-run-rush.js install
node common/scripts/install-run-rush.js rebuild --verbose
node common/scripts/install-run-rush.js publish --apply --publish

# for D in `find packages -type d -maxdepth 1 -mindepth 1`
# do
#   cd "${D}"
#   V=$(npm view . version)
#   git tag "@routerating/${D:6}_v${V}"
#   cd ../..
# done

# for D in `find apps -type d -maxdepth 1 -mindepth 1`
# do
#   cd "${D}"
#   V=$(npm view . version)
#   git tag "@lukeshay/${D:6}_${V}"
#   cd ../..
# done

# git push --tags

node common/scripts/install-run-rush.js update --full --purge
node common/scripts/install-run-rush.js change --bulk --bump-type none

git checkout -b ${BRANCH_NAME}
git add .
git commit -m ${COMMIT}
git push --set-upstream origin ${BRANCH_NAME}

gh pr create -t ${COMMIT} -b ${PR_DESC} -w

