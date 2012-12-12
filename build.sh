#!/bin/bash

# get script's directory 
dir=`dirname $(readlink -f $0)`

main="$dir/lessnoise.user.js"
target="$dir/lessnoise-for-chrome.user.js"
keyFile="`dirname $dir`/lessnoise.pem"

# paths to the *.js files of the application
js="$dir/*.js"
filters="$dir/filters/*.js"
highlighters="$dir/highlighters/*.js"

rm $target -f

# put all javascript files into a single file
cat $main $(ls $js | grep -v $main) $filters $highlighters > $target

if [ -f $keyFile ];
then
  chromium --pack-extension=$dir --pack-extension-key=$keyFile
else
  chromium --pack-extension=$dir
fi
