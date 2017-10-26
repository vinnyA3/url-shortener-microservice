#!/bin/bash

if pgrep -x "mongod" > /dev/null; then
  echo 'mongod process already running...'
else
  echo 'initializing mongodb...'
  mongod &
fi
