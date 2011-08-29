/**
 * @version	$Id: file.js 221 2011-06-11 17:30:33Z happy_noodle_boy $
 * @package JCE File Browser
 * @copyright Copyright (C) 2005 - 2010 Ryan Demmer. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see licence.txt
 * This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
var WFFileBrowser = WFExtensions.add('FileBrowser', {
	
	settings 	: {},
	
	element 	: '',
	
	/**
	 * Initialize FileBrowser
	 * @param element Mixed Element or Element Selector
	 * @params options Object
	 */
	init : function(element, options) {
		$.extend(true, this.settings, options);	
		
		this.element = element;		
		this._createBrowser();
	},
	
	_createBrowser : function() {
		$(this.element).MediaManager(this.settings);
	},
	
	/**
	 * Get the base directory
	 */
	getBaseDir : function() {
		return this._call('getBaseDir');
	},
	
	/**
	 * Get current directory
	 */
	getCurrentDir : function() {
		return this._call('getCurrentDir');
	},
	
	/**
	 * Get a list of selected items optionally fitlered by key
	 */
	getSelectedItems : function(key) {
		return this._call('getSelectedItems', key);
	},
	
	/**
	 * Refresh the browser
	 */
	refresh : function() {
		return this._call('refresh');
	},
	
	error : function(error) {
		return this._call('error', error);
	},
	
	status : function(message, state) {
		return this._call('setStatus', {message : message, state : state});
	},
	
	/**
	 * Load the browser and set optional return items to select
	 */
	load : function(items) {
		return this._call('load', items);
	},
	
	resize : function(fh) {
		return this._call('resize', [null, fh]);
	},
	
	/**
	 * Compatability function
	 */
	get : function(fn, args) {
		return this._call(fn, args);
	},
	
	_call : function(fn, args) {
		return $(this.element).MediaManager(fn, args);
	}
});