#/bin/sh
#
# Generates a workspace file that can be opened in VS Code. See
# https://code.visualstudio.com/docs/editor/multi-root-workspaces about VS Code
# workspaces.

set -e

shadow_dir="./.shadowroot"
rush_file="./rush.json"
extensions_file="./.vscode/extensions.json"
settings_file="./.vscode/settings.json"
workspace_file="./code.code-workspace"

update_workspace_projects() {
  tmp_workspace_file="$workspace_file.tmp"
  projects=`jq '.projects' $rush_file`

  root_files="[{\"name\": \"Project Files\", \"path\": \""$shadow_dir"\"}]"
  scripts="[{\"name\": \"Project Scripts\", \"path\": \"scripts\"}]"
  common="[{\"name\": \"Rush\", \"path\": \"common\"}]"
  github="[{\"name\": \"Github Settings\", \"path\": \".github\"}]"
  vscode="[{\"name\": \"VS Code Settings\", \"path\": \".vscode\"}]"
  documentation="[{\"name\": \"Documentation\", \"path\": \"docs\"}]"
  folders=`jq --argjson scripts "$scripts" --argjson common "$common" \
    --argjson github "$github" --argjson vscode "$vscode" \
    --argjson rootfiles "$root_files" --argjson docs "$documentation" \
    '.projects | map({ "name": .packageName, "path": .projectFolder }) | . + $scripts + $common + $github + $vscode + $rootfiles + $docs | sort_by(.name)' \
    $rush_file`

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

update_shadow_root
