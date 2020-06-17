#!/bin/sh -e

PWD=$(pwd)
npm i -g npm-cli-login
npm-cli-login

DATE=$(date +'%m-%d-%y-%H-%M')
BRANCH_NAME="release-${DATE}"
DATE=$(date +'%m-%d-%y %H:%M')
COMMIT="Release ${DATE}"
PR_DESC="Published release on ${DATE}"

git checkout -b ${BRANCH_NAME}
git push --set-upstream origin ${BRANCH_NAME}

yarn release
# git add .
# git commit -m ${COMMIT}
# git push --set-upstream origin ${BRANCH_NAME}

gh pr create -t ${COMMIT} -b ${PR_DESC} -w

