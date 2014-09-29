web-capture.js
================
This is an PhantomJS script for taking a snapshot image of target webpage.

This script supports :
- track the page redirection
- setting custom UserAgent string
- capturing delay-loaded images like jQuery image related modules (Lazy etc.)
- capturing images which will load by causing browser scroll event

Example for use:  (can get Flash images with using Xvfb)

$ Xvfb :99 -screen 0 1280x1024x24 2> /dev/null &

$ DISPLAY=:99 phantomjs --load-plugins=true --ignore-ssl-errors=yes web-capture.js [view-width] [UserAgent-strings] [TargetURL] [output-filepath]

$ ps -ef | grep Xvfb | grep -v grep | awk '{ print $2; }' | kill 'SIGTERM'

Reference documents:

http://qiita.com/nao58/items/62fe1d9408c52335cfbd
http://catcher-in-the-tech.net/34/
http://stackoverflow.com/questions/12710721/how-to-end-a-phantomjs-script-only-after-client-side-redirects-have-taken-place
http://www.ryanbridges.org/2013/05/21/putting-the-flash-back-in-phantomjs/
https://github.com/r3b/phantomjs
http://tips.hecomi.com/entry/20121229/1356785834
http://qiita.com/nao58/items/62fe1d9408c52335cfbd
