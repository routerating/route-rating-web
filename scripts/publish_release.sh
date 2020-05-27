#!/bin/sh

PWD=$(pwd)

yarn config set "//registry.npmjs.org/:_authToken" "$1" && yarn config set "@lukeshay:registry" "https://registry.npmjs.org/"

DATE=$(date +'%m-%d-%y-%H-%M')
BRANCH_NAME="release-${DATE}"
DATE=$(date +'%m-%d-%y %H:%M')
COMMIT="Release ${DATE}"
PR_DESC="Published release on ${DATE}"

node common/scripts/install-run-rush.js install \
&& \
node common/scripts/install-run-rush.js rebuild --verbose \
&& \
node common/scripts/install-run-rush.js publish --apply --publish --npm-auth-token $1 || exit 1

git checkout -b ${BRANCH_NAME}
git add .
git commit -m ${COMMIT}
git push --set-upstream origin ${BRANCH_NAME}

for D in `find tools -type d -maxdepth 1 -mindepth 1`
do
  cd "${D}"
  V=$(npm view . version)
  git tag "@lukeshay/${D:6}_${V}"
  cd ../..
done

for D in `find libraries -type d -maxdepth 1 -mindepth 1`
do
  cd "${D}"
  V=$(npm view . version)
  git tag "@lukeshay/${D:6}_${V}"
  cd ../..
done

for D in `find sdks -type d -maxdepth 1 -mindepth 1`
do
  cd "${D}"
  V=$(npm view . version)
  git tag "@lukeshay/${D:6}_${V}"
  cd ../..
done

git push --tags

gh pr create -t ${COMMIT} -b ${PR_DESC} -w
