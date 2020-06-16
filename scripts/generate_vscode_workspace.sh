#/bin/sh
#
# Generates a workspace file that can be opened in VS Code. See
# https://code.visualstudio.com/docs/editor/multi-root-workspaces about VS Code
# workspaces.

set -e

shadow_dir="./.shadowroot"
lerna_file="./lerna.json"
extensions_file="./.vscode/extensions.json"
settings_file="./.vscode/settings.json"
workspace_file="./code.code-workspace"

get_projects() {
  directories=`jq -r '.packages | .[]' $lerna_file`

  folders="["

  for d in $directories; do
    p=`echo $d | sed s%.*/%%g`
    d=`echo $d | sed s%/.*%%g`
    folders+="{\"name\": \"@sourceallies/$p\", \"path\": \"./$d/$p\"},"
  done

  folders=${folders%?}
  folders+="]"

  echo $folders
}

update_workspace_projects() {
  tmp_workspace_file="$workspace_file.tmp"

  root_files="[{\"name\": \"Project Files\", \"path\": \""$shadow_dir"\"}]"
  scripts="[{\"name\": \"Project Scripts\", \"path\": \"scripts\"}]"
  github="[{\"name\": \"Github Settings\", \"path\": \".github\"}]"
  vscode="[{\"name\": \"VS Code Settings\", \"path\": \".vscode\"}]"
  documentation="[{\"name\": \"Documentation\", \"path\": \"docs\"}]"
  folders=`jq --argjson scripts "$scripts" \
    --argjson github "$github" --argjson vscode "$vscode" \
    --argjson rootfiles "$root_files" --argjson docs "$documentation" \
    '.projects | map({ "name": .packageName, "path": .projectFolder }) | . + $scripts + $common + $github + $vscode + $rootfiles + $docs | sort_by(.name)' \
    $lerna_file`

  extensions=`cat $extensions_file`
  settings=`cat $settings_file`

  jq --argjson folders "$folders" --argjson extensions "$extensions" --argjson settings "$settings" \
    '. | .folders = $folders | .settings = $settings | .extensions = $extensions' $workspace_file \
    > $tmp_workspace_file && mv $tmp_workspace_file $workspace_file
}

update_shadow_root() {
  if ! test -d "$shadow_dir"
  then
    mkdir "$shadow_dir"
  fi

  root_files=`ls -p -a | grep -v /`

  for file in $root_files
  do
    if ! test -r "$shadow_dir/$file"
    then
      ln -s "../$file" "$shadow_dir/$file"
    fi
  done
}

create_workspace_file() {
  if ! test -r "$workspace_file"
  then
    touch "$workspace_file"
    jq -n '{"folders": [], "settings": {}}' > $workspace_file
  fi
}

main() {
  create_workspace_file
  update_shadow_root
  update_workspace_projects
}

get_projects
