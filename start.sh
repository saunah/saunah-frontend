#!/usr/bin/env bash
# This script replaces all env vars starting with REACT_APP_ and 
# replaces them in the javascript folder specified in the $JS_FOLDER env var.

ENV_VARS=$(printenv | grep REACT_APP_ )
IFS=$'\n'
for file in $JSFOLDER
do
    for var in $ENV_VARS
    do
        key=$(echo \#\#\#${var%%=*}\#\#\# | perl -ne 'print substr(quotemeta($_), 0, -2)') 
        value=$(echo ${var##*=} | perl -ne 'print substr(quotemeta($_), 0, -2)')

        expr=s\/$key\/$value\/g
        sed -i "" -e $expr $file
    done
done
nginx -g 'daemon off;'