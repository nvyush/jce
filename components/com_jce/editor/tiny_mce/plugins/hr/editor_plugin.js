/**
 * @package    JCE
 * @copyright    Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license    GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function () {
    var blocks = 'H1,H2,H3,H4,H5,H6,P,DIV,ADDRESS,PRE,FORM,TABLE,OL,UL,CAPTION,BLOCKQUOTE,CENTER,DL,DIR,FIELDSET,NOSCRIPT,NOFRAMES,MENU,ISINDEX,SAMP,SECTION,ARTICLE,HGROUP,ASIDE,FIGURE';
    var VK = tinymce.VK, BACKSPACE = VK.BACKSPACE, DELETE = VK.DELETE;
    
    tinymce.create('tinymce.plugins.HorizontalRulePlugin', {
        init: function (ed, url) {
            var self = this;
            this.editor = ed;

            ed.addCommand('InsertHorizontalRule', function(ui, v) {
                var se = ed.selection, n = se.getNode();

                if (ed.dom.isBlock(n)) {

                    // create hr marker
                    ed.execCommand('mceInsertContent', false, '<span id="mce_hr_marker" data-mce-type="bookmark">\uFEFF</span>', {
                        skip_undo: 1
                    });

                    var marker = ed.dom.get('mce_hr_marker'), hr = ed.dom.create('hr');

                    // get the marker parent
                    var p = ed.dom.getParent(marker, blocks, 'BODY');

                    // split paragraphs / divs
                    if (p.nodeName == 'P' || p.nodeName == 'DIV') {

                        // split
                        ed.dom.split(p, marker);

                        var ns = marker.nextSibling;

                    } else {
                        // If in block
                        if (p) {
                            if (p.parentNode.nodeName == 'BODY') {
                                ed.dom.insertAfter(marker, p);
                            } else {
                                p.parentNode.insertBefore(marker, p);
                            }
                        } else {
                            if (n.parentNode.nodeName == 'BODY') {
                                ed.dom.insertAfter(marker, n);
                            } else {
                                n.parentNode.insertBefore(marker, n);
                            }
                        }

                        p = marker.parentNode;

                        while (/^(H[1-6]|ADDRESS|PRE|FORM|TABLE|OL|UL|CAPTION|BLOCKQUOTE|CENTER|DL|DIR|FIELDSET|NOSCRIPT|NOFRAMES|MENU|ISINDEX|SAMP)$/.test(p.nodeName)) {
                            p.parentNode.insertBefore(marker, p);
                            p = marker.parentNode;
                        }
                    }

                    ns = marker.nextSibling;

                    if (!ns) {
                        var el = ed.getParam('forced_root_block') || 'br';
                        ns = ed.dom.create(el);

                        if (el != 'br') {
                            ns.innerHTML = '\u00a0';
                        }

                        ed.dom.insertAfter(ns, marker);
                    }

                    // move cursor to the end of block element
                    ed.selection.setCursorLocation(ns, ns.childNodes.length);

                    ed.dom.replace(hr, marker);
                } else {
                    ed.execCommand('mceInsertContent', false, '<hr />');
                }
            });

            // Register buttons
            ed.addButton('hr', {
                title: 'advanced.hr_desc',
                cmd: 'InsertHorizontalRule'
            });

            function isHR(n) {
                return n.nodeName === "HR" && /mceItem(PageBreak|ReadMore)/.test(n.className) === false;
            }

            ed.onNodeChange.add(function(ed, cm, n) {
                var s = isHR(n);

                cm.setActive('hr', s);

                ed.dom.removeClass(ed.dom.select('hr.mceItemSelected:not(.mceItemPageBreak,.mceItemReadMore)'), 'mceItemSelected');

                if (s) {
                    ed.dom.addClass(n, 'mceItemSelected');
                }
            });

            ed.onKeyDown.add(function(ed, e) {
                if (e.keyCode == BACKSPACE || e.keyCode == DELETE) {
                    var s = ed.selection, n = s.getNode();

                    if (isHR(n)) {
                        ed.dom.remove(n);
                        e.preventDefault();
                    }
                }
            });
        },

        getInfo: function () {
            return {
                longname: 'HR',
                author: 'Ryan Demmer',
                authorurl: 'http://www.joomlacontenteditor.net',
                infourl: 'http://www.joomlacontenteditor.net',
                version: '@@version@@'
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('hr', tinymce.plugins.HorizontalRulePlugin);
})();