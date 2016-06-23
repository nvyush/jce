/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function($) {

	var ImageManagerDialog = {
		settings: {},
		init: function() {
			var ed = tinyMCEPopup.editor,
				n = ed.selection.getNode(),
				self = this,
				br, el;

			// add insert button action
			$('#insert').click(function(e) {
				self.insert();
				e.preventDefault();
			});

			tinyMCEPopup.restoreSelection();

			// Get src and decode
			var src = decodeURIComponent(ed.dom.getAttrib(n, 'src'));

			// convert to relative
			src = ed.convertURL(src);

			//TinyMCE_Utils.fillClassList('classlist');

			// Show / hide attributes
			$.each(this.settings.attributes, function(k, v) {
				if (!parseFloat(v)) {
					$('#attributes-' + k).hide();
				}
			});

			// add focus behaviour to onmoueover / onmouseout
			$('#onmouseover, #onmouseout').focus(function() {
				$('#onmouseover, #onmouseout').removeClass('focus');
				$(this).addClass('focus');
			});

			// setup plugin
			$.Plugin.init({
				selectChange: function() {
					ImageManagerDialog.updateStyles();
				}
			});

			if (n && n.nodeName == 'IMG') {
				// set button
				$('#insert').button('option', 'label', tinyMCEPopup.getLang('update', 'Update', true));

				$('#src').val(src);

				// set preview
				$('#sample').attr({
					'src': n.src
				}).attr($.Plugin.sizeToFit(n, {
					width: 80,
					height: 60
				}));

				// Width & Height
				var w = $.Plugin.getAttrib(n, 'width'),
					h = $.Plugin.getAttrib(n, 'height');

					if (w || h) {
							$('#width, #height').addClass('ui-edited');
					} else {
							w = n.width, h = n.height;
					}

					$('#width').val(w);
					$('#height').val(h);

				$('#alt').val(ed.dom.getAttrib(n, 'alt'));
				$('#title').val(ed.dom.getAttrib(n, 'title'));
				// Margin
				$.each(['top', 'right', 'bottom', 'left'], function() {
					$('#margin_' + this).val($.Plugin.getAttrib(n, 'margin-' + this));
				});

				// Border
				$('#border_width').val(function() {
					var v = $.Plugin.getAttrib(n, 'border-width');

					if ($('option[value="' + v + '"]', this).length == 0) {
						$(this).append(new Option(v, v));
					}

					return v;
				});

				$('#border_style').val($.Plugin.getAttrib(n, 'border-style'));
				$('#border_color').val($.Plugin.getAttrib(n, 'border-color')).change();

				// if no border values set, set defaults
				if (!$('#border').is(':checked')) {
					$.each(['border_width', 'border_style', 'border_color'], function(i, k) {
						$('#' + k).val(self.settings.defaults[k]).change();
					});
				}

				$('#align').val($.Plugin.getAttrib(n, 'align'));

				// Class
				$('#classes').val(ed.dom.getAttrib(n, 'class'));
				//$('#classlist').val(ed.dom.getAttrib(n, 'class'));

				$('#style').val(ed.dom.getAttrib(n, 'style'));
				$('#id').val(ed.dom.getAttrib(n, 'id'));
				$('#dir').val(ed.dom.getAttrib(n, 'dir'));
				$('#lang').val(ed.dom.getAttrib(n, 'lang'));
				$('#usemap').val(ed.dom.getAttrib(n, 'usemap'));

				$('#insert').button('option', 'label', ed.getLang('update', 'Update'));

				// Longdesc may contain absolute url too
				$('#longdesc').val(ed.convertURL(ed.dom.getAttrib(n, 'longdesc')));

				// onmouseover / onmouseout
				$('#onmouseout').val(src);

				$.each(['onmouseover', 'onmouseout'], function() {
					v = ed.dom.getAttrib(n, this);
					v = $.trim(v);
					v = v.replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/, '$1');
					v = ed.convertURL(v);
					$('#' + this).val(v);
				});

				br = n.nextSibling;

				if (br && br.nodeName == 'BR' && br.style.clear) {
					$('#clear').val(br.style.clear);
				}
			} else {
				$.Plugin.setDefaults(this.settings.defaults);
			}

			if (ed.settings.filebrowser_position === "external") {
				$.Plugin.createBrowsers($('#src'), function(files) {
					var file = files.shift();
					self.selectFile(file);
				}, 'images');
			} else {
				$('#src').filebrowser().on('filebrowser:onfileclick', function(e, file, data) {
					self.selectFile(file, data);
				}).on('filebrowser:onfileinsert', function(e, file, data) {
					self.selectFile(file, data);
				});
			}

			// Setup border
			$.Plugin.setBorder();
			// Setup margins
			$.Plugin.setMargins(true);
			// Setup Styles
			$.Plugin.updateStyles();

			// update constrain after applying values
			$('.ui-constrain-checkbox').on('constrain:change', function(e, elms) {
				$(elms).removeClass('ui-text-muted').addClass('ui-edited');
			}).trigger('constrain:update');

			$('#width, #height').addClass('ui-text-muted');
		},
		insert: function() {
			var ed = tinyMCEPopup.editor,
				self = this;

			if ($('#src').val() === '') {
				$.Modal.alert(tinyMCEPopup.getLang('imgmanager_dlg.no_src', 'Please enter a url for the image'));
				return false;
			}
			if ($('#alt').val() === '') {
				$.Modal.confirm(tinyMCEPopup.getLang('imgmanager_dlg.missing_alt'), function(state) {
					if (state) {
						self.insertAndClose();
					}
				}, {
					width: 300,
					height: 200
				});
			} else {
				this.insertAndClose();
			}
		},
		insertAndClose: function() {
			var ed = tinyMCEPopup.editor,
				self = this,
				v, args = {},
				el, br = '';

			$.Plugin.updateStyles();

			tinyMCEPopup.restoreSelection();

			// Fixes crash in Safari
			if (tinymce.isWebKit) {
				ed.getWin().focus();
			}

			// Remove deprecated values
			args = {
				vspace: '',
				hspace: '',
				border: '',
				align: ''
			};

			// set attributes
			$.each(['src', 'width', 'height', 'alt', 'title', 'classes', 'style', 'id', 'dir', 'lang', 'usemap', 'longdesc'], function(i, k) {
				v = $('#' + k + ':enabled').val();

				if (k == 'src') {
					// prepare URL
					v = $.String.buildURI(v);
				}

				if (k == 'width' || k == 'height') {
					if (self.settings.always_include_dimensions) {
						v = $('#' + k).val();
					} else {
						v = $('#' + k + '.edited').val() || '';
					}
				}

				if (k == 'classes')
					k = 'class';

				args[k] = v;
			});

			args.onmouseover = args.onmouseout = '';

			// mouseover / mouseout on single files only
			var over = $('#onmouseover').val(),
				out = $('#onmouseout').val();

			if (over && out) {
				args.onmouseover = "this.src='" + ed.convertURL(over) + "';";
				args.onmouseout = "this.src='" + ed.convertURL(out) + "';";
			}

			el = ed.selection.getNode();
			br = el.nextSibling;

			if (el && el.nodeName == 'IMG') {
				ed.dom.setAttribs(el, args);
				// BR clear
				if (br && br.nodeName == 'BR') {
					if ($('#clear').is(':disabled') || $('#clear').val() === '') {
						ed.dom.remove(br);
					}
					if (!$('#clear').is(':disabled') && $('#clear').val() !== '') {
						ed.dom.setStyle(br, 'clear', $('#clear').val());
					}
				} else {
					if (!$('#clear').is(':disabled') && $('#clear').val() !== '') {
						br = ed.dom.create('br');
						ed.dom.setStyle(br, 'clear', $('#clear').val());
						ed.dom.insertAfter(br, el);
					}
				}
			} else {
				ed.execCommand('mceInsertContent', false, '<img id="__mce_tmp" src="" />', {
					skip_undo: 1
				});
				el = ed.dom.get('__mce_tmp');

				if (!$('#clear').is(':disabled') && $('#clear').val() !== '') {
					br = ed.dom.create('br');
					ed.dom.setStyle(br, 'clear', $('#clear').val());
					ed.dom.insertAfter(br, el);
				}

				ed.dom.setAttribs('__mce_tmp', args);
				ed.dom.setAttrib('__mce_tmp', 'id', '');
				ed.undoManager.add();
			}

			tinyMCEPopup.close();
		},

		selectFile: function(file, data) {
			var self = this,
				name = data.title,
				src = data.url;

			if ($('#rollover_tab').hasClass('ui-active')) {
				$('input.focus', '#rollover_tab').val(src);
			} else {
				name = $.String.stripExt(name);
				name = name.replace(/[-_]+/g, ' ');

				$('#alt').val(name);
				$('#onmouseout').val(src);
				$('#src').val(src);

				if (!data.width || !data.height) {
					var img = new Image();

					img.onload = function() {
						$.each(['width', 'height'], function(i, k) {
							$('#' + k).val(img[k]).data('tmp', img[k]).removeClass('ui-edited').addClass('ui-text-muted');
						});

					};

					img.src = src;
				} else {
					$.each(['width', 'height'], function(i, k) {
						var v = data[k] || "";
						$('#' + k).val(v).data('tmp', v).removeClass('ui-edited').addClass('ui-text-muted');
					});
				}

				var dim = $.Plugin.sizeToFit({
					width: data.width,
					height: data.height
				}, {
					width: 80,
					height: 60
				});

				// set preview
				$('#sample').attr({
					'src': data.preview
				}).attr(dim);
			}
		}

	};
	window.ImageManagerDialog = ImageManagerDialog;

	$(document).ready(function() {
		ImageManagerDialog.init();
	});
})(jQuery);
