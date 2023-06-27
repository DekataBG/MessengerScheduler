#!/usr/bin/bash

echo "Enter your email: "
read email

echo "Enter your password: "
read -s password

credentials="$email $password"

echo "Enter your friend:"
read friend

echo "Enter your message:"
read message

# Get the absolute path of the script directory
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

file_path_credentials="$script_dir/../data/credentials.txt"
file_path_user="$script_dir/../data/user.txt"
file_path_message="$script_dir/../data/message.txt"

echo "$credentials" > "$file_path_credentials"
echo "$friend" > "$file_path_user"
echo "$message" > "$file_path_message"