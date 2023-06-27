#!/usr/bin/bash

# Get the absolute path of the script directory
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

temporary_dir="$script_dir/tmp_crontab.txt"

# List the current crontab entries and remove the last line. Save that to a temporary file
crontab -l | head -n -1 > $temporary_dir

# Set the modified output as the new crontab
crontab $temporary_dir

# Remove the temporary file
rm $temporary_dir