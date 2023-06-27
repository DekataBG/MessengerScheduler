#!/usr/bin/bash

# Get the absolute path of the script directory
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

file_path_index="$script_dir/../index.js"

file_path_node="$(which node)"

# Execute the index.js script
$file_path_node $file_path_index