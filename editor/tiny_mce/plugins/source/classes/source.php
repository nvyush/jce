<?php
/**
 * @version		$Id: source.php 226 2011-06-13 09:59:05Z happy_noodle_boy $
 * @package      JCE
 * @copyright    Copyright (C) 2005 - 2009 Ryan Demmer. All rights reserved.
 * @author		Ryan Demmer
 * @license      GNU/GPL
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
require_once (WF_EDITOR_LIBRARIES . DS . 'classes' . DS . 'plugin.php');

class WFSourcePlugin extends WFEditorPlugin {
	/**
	 * Constructor activating the default information of the class
	 *
	 * @access	protected
	 */
	function __construct()
	{
		parent::__construct();
	}

	/**
	 * Returns a reference to a plugin object
	 *
	 * This method must be invoked as:
	 * 		<pre>  $advlink =AdvLink::getInstance();</pre>
	 *
	 * @access	public
	 * @return	JCE  The editor object.
	 * @since	1.5
	 */
	function & getInstance()
	{
		static $instance;

		if(!is_object($instance)) {
			$instance = new WFSourcePlugin();
		}
		return $instance;
	}
	
	function display()
	{
		$document = WFDocument::getInstance();	
			
		$view = $this->getView();

		$view->addTemplatePath(WF_EDITOR_PLUGIN .DS. 'tmpl');
			
		$document->setTitle(WFText::_('WF_' . strtoupper($this->getName() . '_TITLE')));		
		
		$theme 	= JRequest::getWord('theme', 'textmate');

		$document->addScript(array('codemirror', 'mode/css', 'mode/javascript', 'mode/xml', 'mode/htmlmixed'), 'jce.tiny_mce.plugins.source.js.codemirror');
		$document->addScript(array('editor'), 'plugins');
		
		$document->addStyleSheet(array('codemirror', 'dialog', 'theme/' . $theme), 'jce.tiny_mce.plugins.source.css.codemirror');
		$document->addStyleSheet(array('editor'), 'plugins');				
	}
	
	function execute() {			
		$task = JRequest::getWord('task');

		if ($task == 'compile') {
			return $this->compile();
		}
		
		parent::execute();
	}

	function compile()
	{
		WFToken::checkToken() or die('RESTRICTED ACCESS');
			
		wfimport('admin.classes.packer');

		$base 	= dirname(dirname(__FILE__));		
		$editor = JRequest::getWord('editor', 'codemirror');		
		$theme 	= JRequest::getWord('theme', 'textmate');

		switch (JRequest::getWord('type', 'base')) {
			case 'base':
				$files = array();
				
				$files[] = $base . DS . 'js' . DS . 'codemirror' . DS . 'base.js';
				
				$type = 'javsacript';
				
				break;	
			case 'parser' :
				$files = array();

				$files[] = $base . DS . 'js' . DS . 'codemirror' . DS . 'parser.js';

				// javascript

				$type = 'javsacript';

				break;
			case 'css' :
				$path = $base . DS . 'css' . DS . 'codemirror';
				$files = array($path . DS . 'editor.css', $path . DS . 'theme' . DS . $theme . '.css');

				$type = 'css';

				break;
		}

		$packer = new WFPacker(array('type' => $type));

		// set files
		$packer->setFiles($files);
		// pack!
		$packer->pack(true, $this->getParam('editor.compress_gzip', 0));
	}
}
