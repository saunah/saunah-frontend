#!/usr/bin/env bash
# This script replaces all env vars starting with REACT_APP_ and 
# replaces them in the javascript folder specified in the $JS_FOLDER env var.

ENV_VARS=$(printenv | grep REACT_APP_ | tr '\n' ',')
IFS=","
for file in $JSFOLDER;
do
    for var in $ENV_VARS;
    do
        key=$(echo \#\#\#${var%%=*}\#\#\# | perl -ne 'print quotemeta($_)' | rev | cut -c2- | rev) 
        value=$(echo ${var##*=} | perl -ne 'print quotemeta($_)' | rev | cut -c2- | rev)
        expr=s\/$key\/$value\/g
        sed -i -e $expr $file
    done
done
nginx -g 'daemon off;'