# Messenger scheduler

## Description
With these scripts you can schedule a message to be sent on Messenger to a friend. The code is made for the same day but it can easily be modified to choose a date other than the current date.

## Run
Type ./scripts/run.sh to start the program. 

## Requirements
Linux OS (one that has cron)

Nodejs (Preferrably the latest version, but it works for 14+)

Puppeteer (Preferrably the latest version)

## Realisation
The main script is created with JavaScript, using Puppeteer library. It is executed with Nodejs. The scripts are bash scripts which call each other and they basically schedule using cron.

## ToDos
 - Exception handling can be implemented
 - Messages to handle wrong data input
 - GUI