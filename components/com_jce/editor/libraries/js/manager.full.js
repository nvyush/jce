/**
 * Inline development version. Only to be used while developing since it uses document.write to load scripts.
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports) {
    "use strict";

    var html = "", baseDir;

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;

        if (src.indexOf('/manager.full.js') != -1) {            
            baseDir = src.substring(0, src.lastIndexOf('/'));
        }
    }

    function writeScripts() {
        document.write(html);
    }

    function load(path) {
        
        if (path.indexOf('.js') !== -1) {
            html += '<script type="text/javascript" src="' + baseDir + '/' + path + '"></script>\n';
        }
        
        if (path.indexOf('.css') !== -1) {
            html += '<link rel="stylesheet" type="text/css" href="' + baseDir + '/' + path + '" />\n';
        }
    }
    
    load('../plupload/plupload.full.js');
    load('lib/tree.js');
    load('lib/upload.js');
    load('lib/browser.js');
    load('lib/sort.js');
    load('lib/filter.js');
    load('lib/manager.js');

    writeScripts();
})(this);