#!/usr/bin/bash

# Get the absolute path of the script directory
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Schedule a message(1) or cancel a scheduled message(2)?"
read option

if [ $option -eq 1 ]
then
    source $script_dir/schedule_message.sh
elif [ $option -eq 2 ]
then
    source $script_dir/cancel_message.sh
else
    echo "Invalid option"
fi