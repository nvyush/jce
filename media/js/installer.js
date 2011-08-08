/**
 * @version		$Id: installer.js 203 2011-06-01 19:02:19Z happy_noodle_boy $
 * @package   	JCE
 * @copyright 	Copyright © 2009-2011 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later
 * This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function($) {
    $.jce.Installer = {
        init : function(options) {
            // Tabs
            $('#tabs').tabs();

            $('button#install_button').button({
                icons : {
                    primary : 'icon-install'
                }
            });

            $('button.install_uninstall').button({
                icons : {
                    primary : 'icon-remove'
                }
            }).click( function(e) {
                if ($('div#tabs input:checkbox:checked').length) {
                    $(this).addClass('ui-state-loading');
                    $('input[name="task"]').val('remove');
                    $('form[name="adminForm"]').submit();
                }
                e.preventDefault();
            });

        }
    };
})(jQuery);