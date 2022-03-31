#!/usr/bin/env bash
# This script replaces all env vars starting with REACT_APP_ and 
# replaces them in the javascript folder specified in the $JS_FOLDER env var.

ENV_VARS=$(printenv | grep REACT_APP_ )
IFS=$'\n'
for file in $JSFOLDER
do
    for var in $ENV_VARS
    do
        key=$(echo \#\#\#${var%%=*}\#\#\# | sed 's/[]\/$*.^[]/\\&/g') 
        value=$(echo ${var##*=} | sed 's/[\/&]/\\&/g')

        sed -i '' -e "s/$key/$value/g" "$file"
    done
done
nginx -g 'daemon off;'