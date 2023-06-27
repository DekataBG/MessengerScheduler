#!/usr/bin/bash

# Used to escape the * (necessary for weekday)
GLOBIGNORE=*

# Get the absolute path of the script directory
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Directory to store the error log
error_log_dir="$script_dir/../error_log.txt"

# Execute the fill_data.sh script
source $script_dir/fill_data.sh

echo "Enter the minute (0-59): "
read minute

echo "Enter the hour (0-23): "
read hour

# Get the current date
current_day=$(date +"%-d")
current_month=$(date +"%-m")

weekday='*'
script="$script_dir/send_message.sh"

crontab_entry="$minute $hour $current_day $current_month $weekday $script > $error_log_dir 2>&1"

# Make a copy of the current crontab (which would later be deleted)
crontab -l > $script_dir/crontab_copy.txt

# Add a new crontab entry to the copy
echo "$crontab_entry" >> $script_dir/crontab_copy.txt

# Load the modified crontab from the temporary file
crontab $script_dir/crontab_copy.txt

# Delete the temporary crontab file
rm $script_dir/crontab_copy.txt