var system = require('system'), address, output, vwidth, agent;

if (system.args.length < 5 || system.args.length > 7) {
    console.log('Usage: web-capture.js view-width UserAgent-strings URL output-filepath');
    phantom.exit(1);
}

var vwidth = system.args[1];
var agent = system.args[2];
var address = system.args[3];
var output = system.args[4];

function renderPage(myurl) {
    var page = require('webpage').create();
    var redirectURL = null;

    page.onNavigationRequested = function(url, type, willNavigate, main) {
        if (main && url!=myurl && url.replace(/\/$/,"")!=myurl&& (type=="Other" || type=="Undefined") ) {
            console.log("  following "+myurl+" redirect to "+url);
            myurl = url;
            page.close();
            renderPage(url);
        }
    };

    page.viewportSize = { width: vwidth, height: 960 };
    page.settings.userAgent = agent;
    page.settings.resourceTimeout = 20000;

    var mainTimeout = setTimeout(function(){
      system.stdout.write('Time out error: in parsing pages.');
      phantom.exit(1);
    }, 150000);

    page.open(myurl, function (status) {
        if (status != 'success') {
            system.stdout.write('Time out error: in loading pages');
            phantom.exit(1);
        } else {
            page.evaluate(function() {
                var current = 0, delta = 200, total = document.height - delta;
                window.scrollTo(0, current);

                function fakeScroll() {
                    if(current < total) {
                        current = current + delta;
                        window.scrollTo(0, current);

                        window.setTimeout(fakeScroll, 1500);
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                }

                fakeScroll();
            });

            window.setTimeout(function () {
                page.render(output);
                clearTimeout(mainTimeout);
                phantom.exit(0);
            }, 20000);
        }
    });
}

renderPage(address);
