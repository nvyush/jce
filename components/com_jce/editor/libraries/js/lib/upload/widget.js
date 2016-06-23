/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2013 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

/*global plupload:true */

(function($) {

    function UploadWidget(element, options) {
        this.element = element || $('<div />');

        // uplaoder object
        this.uploader = {};
        // error count
        this.errors = 0;
        // uploading flag
        this.uploading = false;

        this.options = $.extend({
            field           : $('input[name=file]:first'),
            max_size        : false,
            limit           : 0,
            filetypes       : "*",
            insert          : true,
            buttons         : {},
            websafe_mode    : 'utf-8',
            browse_button   : '#upload-browse',
            upload_button   : '#upload-start',
            drop_target     : '#upload-body',
        }, options);

        this.init();
    }

    UploadWidget.prototype = {

        FILE_SIZE_ERROR: 600,
        FILE_EXTENSION_ERROR: 601,
        FILE_EXISTS_ERROR: 700,
        FILE_INVALID_ERROR: 800,

        /**
         * Shortcut function for event triggering
         * @param {string} ev Event name
         * @param {Mixed} args Arguments
         * @returns {void}
         */
        _trigger: function (ev, args) {
            $(this.element).trigger('uploadwidget:' + ev.toLowerCase(), args);
        },
        init: function() {
            var self = this;

            // clear old uploader
            if (this.uploader instanceof Uploader) {
                this.uploader.destroy();
            }

            $(this.options.field).remove();

            this._createUploader();
        },
        _createUploader: function() {
            var self = this;

            if (!$.support.xhr2) {
                $(this.element).addClass('wf-uploader-html4');
            }

            //try {
            this.uploader = new Uploader(this.options);

            // on Uploader init
            this.uploader.on('init', function() {
                self._createDragDrop();
            });

            // on add file
            this.uploader.on('fileadded', function(e, file) {
                self._createQueue(file);
            });

            // on upload file
            this.uploader.on('uploadstart', function(e, file) {
                self._onStart(file);
            });

            this.uploader.on('allcomplete', function() {
                self._onAllComplete();
            });

            this.uploader.on('uploadcomplete', function(e, o) {
                self._onComplete(o);
            });

            this.uploader.on('dragover', function(e, o) {
                $(self.options.drop_target).addClass('wf-upload-dragover');
            });

            this.uploader.on('dragleave', function(e, o) {
                $(self.options.drop_target).removeClass('wf-upload-dragover');
            });

            this.uploader.on('drop', function(e, o) {
                $(self.options.drop_target).removeClass('wf-upload-dragover');
            });

            /**
             * Handle Error
             */
            this.uploader.on('error', function(up, error) {
                var file = error.file;

                if (typeof error === "string") {
                    error = {"message" : error, "code" : 500};
                }

                if (file) {
                    if (error.code < 600) {
                        $(file.element).removeClass('load').addClass('error');
                    } else {
                        $(file.element).remove();
                    }

                    self._showError(error, file);
                }

                self.errors++;
            });

            this.uploader.on('fileremoved', function(file) {
            });

            this.uploader.on("progress", function(o, file) {
                self._onProgress(file);
            });

            this.uploader.init();
        },

        _showError: function(error, file) {
            var self = this;

            error = $.extend({"message": "", "code": 500}, error);

            if ($.type(error.message) === "array") {
                error.message = error.message.join("\n");
            }

            // create language key from message
            var msg     = error.message.replace(/[^a-z ]/gi, '').replace(/\s+/g, '_').toLowerCase();
            // get code as string
            var code    = error.code.toString();

            // get details
            var details = $.Plugin.translate('error_' + code.replace(/[\D]/g, ''), "");
            var message = $.Plugin.translate(msg, error.message);

            // clean up message a bit
            message = message.replace(/<br[\s\/]+?>/gi, '');

            if (error.details) {
                details = '<br />' + error.details;
            } else {
                switch (error.code) {
                    case self.FILE_EXTENSION_ERROR:
                    case self.FILE_INVALID_ERROR:
                        details = details.replace('%s', file.name);
                        break;

                    case self.FILE_SIZE_ERROR:
                        details = details.replace(/%([fsm])/g, function($0, $1) {
                            switch ($1) {
                                case 'f':
                                    return file.name;
                                case 's':
                                    return $.String.formatSize(file.size);
                                case 'm':
                                    return $.String.formatSize(self.options.max_size);
                            }
                        });

                        break;
                }

                if (details) {
                    message += '<br />' + details;
                }
            }

            $('.ui-progress', file.element).hide();
            $('<div class="ui-alert ui-alert-danger" />').html(message).appendTo(file.element);

            //$.Modal.alert(message);
        },

        _onStart: function(file) {
            this._trigger('uploadstart', file);

            $(file.element).addClass('load disabled').find('input[type="text"]').prop('disabled', true);
        },
        _isError: function(err) {
            if (err) {
                if ($.isArray(err)) {
                    return err.length;
                }

                return true;
            }

            return false;
        },
        _onComplete: function(o) {
            var self = this, file = o.file;

            // add success class
            $(file.element).removeClass('load').addClass('complete');

            // trigger callback
            this._trigger('filecomplete', file);
        },
        _onAllComplete: function() {
            this.uploading = false;
            this._trigger('uploadcomplete', this.getErrorCount());
        },
        _setProgress: function(el, percent) {
            $('.ui-progress-bar', el).css('width', percent + '%').attr('aria-valuenow', percent + '%').text(percent + '%');
        },
        _onProgress: function(file) {
            if (!file.size) {
                return;
            }

            var percent = Math.floor(file.loaded / file.size * 100);

            if (file.size === file.loaded) {
                percent = 100;
            }

            this._setProgress(file.element, percent);
        },
        upload: function(args) {
            // Only if there are files to upload
            var files = this.uploader.files;

            if (files.length) {
                this.uploading = true;

                // set multipart params
                this.uploader.options.data = args || {};

                // start upload
                this.uploader.start();
            }
            return false;
        },
        refresh: function() {
        },
        close: function() {
            if (this.uploader instanceof Uploader) {
                if (this.uploading) {
                    this.uploader.stop();
                }

                this.uploader.destroy();
            }

            this.errors     = 0;
            this.uploader   = {};
            this.uploading  = false;
        },
        getErrorCount: function() {
            return this.errors;
        },
        isUploading: function() {
            return this.uploading;
        },
        stop: function() {
            this.uploader.stop();
        },
        start: function() {
            this.uploader.start();
        },
        setStatus: function(s) {
            var file = this.currentFile;

            if (file) {
                $(file.element).removeClass('load complete error').addClass(s.state || '');

                if (s.state && s.state === 'error') {
                    this.errors++;

                    if (s.message) {
                        $('.ui-progress', file.element).hide();
                        $('<div class="ui-alert ui-alert-danger" />').html(s.message).appendTo(file.element);
                    }
                }
            }
        },
        _createDragDrop: function() {
            // remove existing drag placeholder
            $('#upload-queue-drag').remove();

            // empty queue
            $('#upload-queue').empty();

            if ($.support.dragdrop) {
                $('<div id="upload-queue-drag" class="ui-block ui-block-large ui-text-center ui-text-large"><i class="ui-icon-cloud-upload ui-icon-medium ui-margin-right ui-text-muted"></i>' + $.Plugin.translate('upload_drop', 'Drop files here') + '</div>').appendTo('#upload-queue-block').show()
            }
        },
        /**
         * Rename a file in the uploader files list
         * @param {Object} file File object
         * @param {String} name New name
         */
        _renameFile: function(file, name) {
            this.uploader.renameFile(file, name);

            this._trigger('filerename', file);
        },
        /**
         * Remove all files
         * @private
         */
        _removeFiles: function() {
            this.uploader.splice();
            // insert empty list element
            $(this.element).empty();
        },
        /**
         * Check if a file is in the queue already
         * @param file
         * @returns {Boolean}
         * @private
         */
        _fileExists: function(file) {
            return this.uploader.fileExists(file);
        },
        /**
         * Remove a file from the queue
         * @param {String} file File to remove
         */
        _removeFile: function(file) {
            this._trigger('fileDelete', file);

            $(file.element).remove();

            this.uploader.removeFile(file);
        },
        _createQueue: function(file) {
            var self = this;

            // get the file title from the file name (without any path)
            var name = $.String.basename(file.filename);

            // sanitize name
            name = $.String.safe(name, self.options.websafe_mode, self.options.websafe_spaces);

            // set updated file name
            file.filename = name;

            // remove extension
            var title = $.String.stripExt(name);

            // create file list element
            file.element = document.createElement('div');

            // status / delete
            var remove = $('<a href="#" role="button" class="ui-button" />').attr({
                'title': $.Plugin.translate('delete', 'Delete')
            }).addClass('queue-item-action').click(function(e) {
                e.preventDefault();

                if ($(this).hasClass('disabled')) {
                    return;
                }

                if (self.uploading) {
                    return self._stop(file);
                }

                return self._removeFile(file);
            }).append('<i class="ui-icon ui-icon-trash" />');

            var type = /image\//.test(file.type) ? 'image' : 'file';

            // spinner / icon
            var spinner = $('<div />').addClass('file').addClass(type).addClass(file.extension.toLowerCase());

            // input
            var input   = $('<div class="queue-item-input"><input type="text" value="' + title + '" /><div class="queue-item-extension">.' + file.extension + '</div></div>');

            var name    = $('<div class="queue-item-name" />').append([spinner, input]);

            var buttons = [remove];

            // add optional buttons
            $.each(self.options.buttons, function(name, props) {
                var btn = $('<a href="#" role="button" title="' + props.title || name + '" class="" role="button" />').addClass(props['class']).click(function(e) {
                    if ($(this).hasClass('disabled')) {
                        e.preventDefault();
                        return;
                    }

                    var fn = props.click || $.noop;
                    fn.call(self, this);

                    e.preventDefault();
                });

                buttons.push(btn);
            });

            var size = null;

            if (file.size) {
                // size
                size = $('<div class="queue-item-size" title="' + $.String.formatSize(file.size) + '" role="presentation" />').html($.String.formatSize(file.size));
            }

            // create actions container
            var actions = $('<div class="queue-item-actions" />').appendTo(file.element).append(size).append(buttons);

            $('input[type="text"]', input).on('change keyup', function(e) {
                var v = this.value;
                // make web safe
                v = $.String.safe(this.value, self.options.websafe_mode, self.options.websafe_spaces);

                if (v !== this.value) {
                    $(this).addClass('invalid');

                    return;
                }

                $(this).removeClass('invalid');

                if (e.type === "change") {
                    self._renameFile(file, v + '.' + file.extension);
                }
            }).change();

            var progress = $('<div class="ui-progress"><div class="ui-progress-bar"></div></div>');

            $(file.element).addClass('queue-item').appendTo($(self.element)).append([name, actions, progress]);

            self._trigger('fileSelect', file);
        },
        _stop: function(file) {
            this.uploader.stop();

            $(file.element).removeClass('load');
        }
    };

    // jQuery hook
    $.fn.uploader = function (options) {
        var self = this, inst = new UploadWidget(this, options);

        $(this).on('uploadwidget:upload', function (e, data) {
            if (inst.isUploading()) {
                cancel(e);

                return false;
            }

            inst.upload(data);
        });

        $(this).on('uploadwidget:close', function () {
            inst.close();
        });

        return this;
    };
})(jQuery);
