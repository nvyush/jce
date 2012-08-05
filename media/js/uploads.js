/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2012 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function($) {
	$.widget("ui.upload", {
		options : {
			labels : {
				browse 	: 'Browse',
				alert 	: 'Incorrect file type'
			},
			extensions 	: ['xml'],
			readonly	: false,
			width		: 200,
			task		: null,
			button		: null,
			iframe		: false,
			report		: null
		},

		/**
		 * Initilaise plugin
		 * @param {Object} elements INPUT FILE elements to process
		 * @param {Object} options Options object
		 */
		_init: function() {
			var self = this;
			
			// Safari needs to wait for the window to finish loading...!!!
			if ($.browser.webkit && /Safari/.test(navigator.userAgent)) {
				$(window).load(function() {
					self._createUploader();
				});
			} else {
				self._createUploader();
			}
		},
		
		_createUploader : function() {
			var self = this, o = this.options, iframe;
			
			var re = '.(' + o.extensions.join('|') + ')$';
			
			$form = $('form[name="adminForm"]');

			if (o.iframe) {
				iframe = this.createIFrame();
			}
			
			// create button
			var $button = $('<button/>');

			var $buttoncontainer = $('<span/>').addClass('upload_button_container').insertBefore(this.element).append(this.element).hover( function() {
				$button.addClass('ui-state-hover');
			}, function() {
				$button.removeClass('ui-state-hover');
			});
			
			var $inputcontainer = $('<span/>').addClass('upload_input_container').insertBefore($buttoncontainer);
			
			var $input = $('<input/>').attr({
				'type' 			: 'text',
				'name'			: $(this.element).attr('name') + '_input',
				'placeholder'	: $(this.element).attr('placeholder')
			}).addClass('ui-widget-content upload_text ui-corner-all').css({
				'width': o.width
			}).appendTo($inputcontainer);

			if (o.readonly) {
				$input.prop('readonly', 'readonly').appendTo($buttoncontainer);
			}

			$('<span/>').addClass('upload_clear ui-icon ui-icon-circle-close').css('opacity' , 0.15).appendTo($inputcontainer).click( function() {
				$input.val('').focus();
				$(self.element).val('');
			});
			
			$button.html(o.labels.browse).button({
				icons: {
					primary: 'browse'
				}
			}).click( function(e) {
				e.preventDefault();
			});
			// hide file input element
			$(this.element).css({
				'width'		: '100%',
				'height'	: '100%',
				'font-size'	: '2em',
				'opacity' : 0
			});

			// check for placeholder and create
			$input.placeholder();

			// remove value on click if file input
			$input.click( function() {
				if ($(self.element).val()) {
					// reset inputs
					$(this, self.element).val('');
				}
			});
			
			$button.insertBefore($(this.element));

			// submit button
			if (o.button) {
				var btn = document.getElementById(o.button), submit = o.submit;

				$(btn).click( function(e) {
					if ($input.hasClass('placeholder')) {
						$input.val('');
					}

					if (iframe) {
						// Set Target
						$form.attr('target', iframe.name);
					}

					if ($(self.element).val() || $input.val()) {
						$(this).addClass('ui-state-loading');
						$('input[name="task"]').val(o.task || '');
						$form.submit();
					}

					e.preventDefault();
				}).button({
					icons: {
						primary: 'import'
					}
				});

				$buttoncontainer.append(btn);

				// add input wrapper
				$('<span style="position:absolute;overflow:hidden;display:inline-block;"></span>').css({
					'top' 		: $button.css('margin-top'),
					'left'		: $button.css('margin-left'),
					'width' 	: $button.outerWidth(),
					'height' 	: $button.outerHeight()
				}).insertBefore(this.element).append(this.element);
			}

			// some IE6 support
			if (!window.XMLHttpRequest) {
				$(this.element).addClass('ie_upload_input_file');
				$input.addClass('ie_input_text');
				$button.addClass('ie_button');
			}

			$(this.element).change( function() {
				file = self.getFileName($(this).val());

				if (!new RegExp(re).test(file)) {
					// reset input
					alert(o.labels.alert);
					$(this).val('');
				} else {
					// update fake input value and class
					$input.val(file).addClass('upload_file').removeClass('placeholder');
				}
			});
		},
		
		createIFrame : function() {
			var o = this.options;

			var iframe = document.getElementById('upload_iframe');

			// only create it once
			if (!iframe) {
				iframe 		= document.createElement('iframe');
				var $form 	= $('form[name="adminForm"]');

				$(iframe).attr({
					'src' 	: 'javascript:""',
					'name'	: 'upload_iframe',
					'id'	: 'upload_iframe'
				}).hide().load( function(e) {
					var n = e.target, el;

					try {
						el = n.contentWindow.document || n.contentDocument || window.frames[n.id].document;
					} catch (ex) {
						alert("UPLOAD SECURITY ERROR");
						return;
					}
					// Return on first load
					if (el.location.href == 'about:blank') {
						return;
					}
					// Get result
					var result = el.body.innerHTML || el.documentElement.innerText || el.documentElement.textContent;

					// Assume no error
					if (result != '') {
						$form.removeAttr('target');
						// append result
						if (!document.getElementById(o.report)) {
							$('#jce').append('<div id="'+ o.report +'"></div>');
						}
						$('div#' + o.report, '#jce').hide().html(result).fadeIn();
					}
					if (o.button) {
						var btn = document.getElementById(o.button);
						$(btn).removeClass('loading');
					}

				}).appendTo($form);
				// Change iframe name
				if (!$.support.cssFloat) {
					window.frames['upload_iframe'].name = 'upload_iframe';
				}

				$('<input/>').attr({
					'type' 	: 'hidden',
					'name'	: 'method'
				}).val('iframe').appendTo($form);
			}

			return iframe;
		},
		getFileName : function(file) {
			file = file.replace(/\\/g, '/');
			return file.substring(file.lastIndexOf('/') + 1);
		},
		destroy: function() {
			$.Widget.prototype.destroy.apply( this, arguments );
		}
	});
})(jQuery);