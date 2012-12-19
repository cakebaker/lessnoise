#!/bin/bash

# get script's directory 
dir=`dirname $(readlink -f $0)`

main="$dir/lessnoise.user.js"
target="$dir/lessnoise-for-chrome.user.js"
keyFile="`dirname $dir`/lessnoise.pem"
manifest="$dir/manifest.json"
updateXML="$dir/update.xml"

# paths to the *.js files of the application
js="$dir/*.js"
filters="$dir/filters/*.js"
highlighters="$dir/highlighters/*.js"
sidebar="$dir/sidebar/*.js"

version=`grep "[0-9]\+.[0-9]\+.[0-9]\+$" $main -o`
jquery=`grep "jquery-[0-9]\+.[0-9]\+.[0-9]\+.min.js$" lessnoise.user.js -o`

rm $target -f

# put all javascript files into a single file
cat $main $(ls $js | grep -v $main) $sidebar $filters $highlighters > $target

# update version infos
sed -i "s/\"version\":[^,]*/\"version\": \"$version\"/" $manifest
sed -i "s/jquery-[^\"]*/$jquery/" $manifest
sed -i "0,/version='[^']*'/! s/version='[^']*'/version='$version'/" $updateXML

if [ -f $keyFile ];
then
  chromium --pack-extension=$dir --pack-extension-key=$keyFile
else
  chromium --pack-extension=$dir
fi
