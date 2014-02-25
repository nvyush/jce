/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2014 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

(function($) {
    $.WFBrowserWidget = {
        options : {
            element : null,

            plugin : {
                plugin : 'browser',
                root : '',
                site : '',
                help : function(e) {
                    var win = window.parent;

                    /*if( typeof win.$jce !== 'undefined') {
                        window.parent.$jce.createDialog(e, {
                            src     : 'index.php?option=com_jce&view=help&tmpl=component&section=editor&category=browser',
                            type    : 'help',
                            options : {
                                width   : 780,
                                height  : 560
                            }
                        });
                    } else {*/
                        var w = Math.max($('#browser').width(), 768), h = Math.max($('#browser').height(), 520);
                    
                        $.Dialog.iframe('Help', 'index.php?option=com_jce&view=help&tmpl=component&section=editor&category=browser', {
                            width   : w,
                            height  : h,
                            onFrameLoad : function() {
                                if ($(this).width() < 768) {
                                    $(this).width(768);
                                }
                            }
                        });
                    //}
                }
            },
            manager : {
                upload : {
                    insert : false
                },
                expandable : false
            }
        },

        init : function(options) {
            var self = this, win = window.parent, doc = win.document;

            $.extend(true, this.options, options);

            $('<input type="hidden" id="src" value="" />').appendTo(document.body);

            $.Plugin.init(this.options.plugin);

            $('button#insert, button#cancel').hide();

            if(this.options.element) {
                // add insert button action
                $('button#insert').show().click(function(e) {
                    self.insert();
                    self.close();
                    e.preventDefault();
                });

                $('button#cancel').show().click(function(e) {
                    self.close();

                    e.preventDefault();
                });
                var src = doc.getElementById(this.options.element).value || '';

                $('#src').val(src);
            }

            // Create File Browser
            WFFileBrowser.init($('#src'), $.extend(this.options.manager, {}));
        },
        insert : function() {
            if(this.options.element) {
                var src = WFFileBrowser.getSelectedItems(0);
                var win = window.parent;
                
                var v = $(src).data('url') || '';
                
                if (win.jQuery) {
                    win.jQuery('#' + this.options.element).val(v).change();
                } else {
                    var el = win.document.getElementById(this.options.element);
                    
                    if (el) {
                        el.value = v;
                    }
                }
            }
        },
        close : function() {
            var win = window.parent;

            if( typeof win.$jce !== 'undefined') {
                return win.$jce.closeDialog('#' + this.options.element + '_browser');
            }
            // try squeezebox
            if( typeof win.SqueezeBox !== 'undefined') {
                return win.SqueezeBox.close();
            }
        }
    };
})(jQuery);

//fake tinyMCE object for language files
var tinyMCE = {
    addI18n : function(p, o) {
        return jQuery.Plugin.addI18n(p, o);
    }
};