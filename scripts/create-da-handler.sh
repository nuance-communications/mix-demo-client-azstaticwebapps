#!/usr/bin/env bash

funcName=${1}
daNodeName=${2}

funcDir="api/${funcName}"

# if exists, exit
if [ -d "$funcDir" ]; then
  echo "$funcName already exists."
  exit 1;
fi

mkdir api/$funcName
cp ./resources/da_init.py.template api/$funcName/__init__.py
cp ./resources/da_function.json.template api/$funcName/function.json

if [ -z "$daNodeName" ]; then
  read -p 'Name of Data Access Node: ' daNodeName
fi

echo ""
echo "! Important Next Step !"
echo ""
echo "Add the following to ExternalFetchHandlers in dlgaas.js:"
echo ""
echo "  ${daNodeName} = () => {"
echo "      return 'api/${funcName}'"
echo "  }"
echo ""
echo "Created Function: $funcName"
