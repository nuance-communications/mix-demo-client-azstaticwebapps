#!/usr/bin/env bash

funcName=${1}
funcDir="api/${funcName}"

# if exists, exit
if [ -d "$funcDir" ]; then
  echo "$funcName already exists."
  exit 1;
fi

mkdir api/$funcName
cp ./sample/da_init.py.template api/$funcName/__init__.py
cp ./sample/da_function.json.template api/$funcName/function.json

echo "Created Function: $funcName"
