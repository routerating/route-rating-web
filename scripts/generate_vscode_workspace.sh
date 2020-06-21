#/bin/bash -e

# Generates a workspace file that can be opened in VS Code. See
# https://code.visualstudio.com/docs/editor/multi-root-workspaces about VS Code
# workspaces.

shadow_dir="./.shadowroot"
lerna_file="./lerna.json"
extensions_file="./.vscode/extensions.json"
settings_file="./.vscode/settings.json"
workspace_file="./code.code-workspace"

get_projects() {
  directories=`jq -r '.packages | .[]' $lerna_file`

  folders=""

  for d in $directories; do
    p=`echo $d | sed s%.*/%%g`
    d=`echo $d | sed s%/.*%%g`
    folders+="{\"name\": \"@routerating/$p\", \"path\": \"./$d/$p\"},"
  done

  folders=${folders%?}
  folders+=""

  echo $folders
}

update_workspace_projects() {
  tmp_workspace_file="$workspace_file.tmp"

  root_files="{\"name\": \"Project Files\", \"path\": \""$shadow_dir"\"}"
  scripts="{\"name\": \"Project Scripts\", \"path\": \"scripts\"}"
  github="{\"name\": \"Github Settings\", \"path\": \".github\"}"
  vscode="{\"name\": \"VS Code Settings\", \"path\": \".vscode\"}"
  documentation="{\"name\": \"Documentation\", \"path\": \"docs\"}"
  configuration="{\"name\": \"Configuration\", \"path\": \"configs\"}"
  projects=`get_projects`

  folders=`echo "[${root_files},${scripts},${github},${vscode},${documentation},${configuration},${projects}]" | jq -s 'sort_by(.[] | .name) | .[0]'`

  # extensions=`cat $extensions_file`
  # settings=`cat $settings_file`
  extensions="{}"
  settings="{}"

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

main
