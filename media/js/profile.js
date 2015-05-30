/**
 * Inline development version. Only to be used while developing since it uses document.write to load scripts.
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function (exports) {
    "use strict";

    var html = "", baseDir;

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;

        if (src.indexOf('/profile.js') != -1) {
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

    load('lib/profiles.js');
    load('lib/extensions.js');
    load('lib/checklist.js');
    load('lib/styleformat.js');
    load('lib/fonts.js');
    load('lib/blockformats.js');
    load('../../../../../components/com_jce/editor/libraries/js/lib/select.js');
    load('../../../../../components/com_jce/editor/libraries/js/lib/colorpicker.js');

    writeScripts();
})(this);