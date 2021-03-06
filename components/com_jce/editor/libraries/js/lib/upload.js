/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2016 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

(function ($) {

    /**
     * Test if valid JSON string
     * https://github.com/douglascrockford/JSON-js/blob/master/json2.js
     * @param {string} s
     * @return {boolean}
     */
    function isJSON(s) {
        return /^[\],:{}\s]*$/
                .test(s.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    }

    $.widget("ui.uploader", {
        // uploader object
        uploader: {},
        // error count
        errors: 0,
        uploading: false,
        options: {
            field: $('input[name=file]:first'),
            size: false,
            limit: 5,
            debug: false,
            filter: null,
            swf: 'uploader.swf',
            xap: 'uploader.xap',
            runtimes: 'html5,flash,html4',
            urlstream_upload: true,
            insert: true,
            buttons: {},
            required: ['multipart'],
            websafe_mode: 'utf-8',
            canvasResize: true
        },
        /**
         * File extension error. If the user selects a file that isn't valid according to the filters setting.
         *
         * @property FILE_EXTENSION_ERROR
         * @final
         */

        FILE_SIZE_ERROR: -600,
        FILE_EXTENSION_ERROR: -601,
        FILE_INVALID_ERROR: -800,
        _init: function () {
            var self = this;

            this.field = this.options.field;
            this.files = [];
            this.current = null;

            $(this.field).remove();

            this._createUploader();
        },
        _createSimple: function () {
            $.extend(this.options, {
                runtimes: 'html4',
                required: ['multipart']
            });

            if (this.uploader) {
                this.uploader.destroy();
            }

            $('#upload-queue').empty();

            this._createUploader();
        },
        _createUploader: function () {
            var self = this;
            var options = this.options, filters = [];

            if ($.isPlainObject(options.filter)) {
                $.each(options.filter, function (k, v) {
                    filters.push({
                        title: k,
                        extensions: v.replace(/\*\./g, '').replace(/;/, ',')
                    });
                });
            }

            // check size for older format and add kb label
            var size = this.options.size;
            // older version of file size, add kb
            if (!/kb/.test(size)) {
                size = parseFloat(size) + 'kb';
            }

            // add an id to the button parent
            var container = $('#upload-browse').parent().attr('id');

            if (!container) {
                container = 'upload_buttons_container';
                $('#upload-browse').parent().attr('id', container);
            }

            $('#upload-browse').addClass('loading').button('disable');

            /*var runtimes = options.runtimes.split(',');

             if (runtimes.length > 1) {
             var required = options.required.join(',');

             if (!options.canvasResize && runtimes.indexOf('html5') != -1 && /(jpg|png)resize/.test(required)) {
             runtimes.splice(runtimes.indexOf('html5'), 1);
             }
             }*/

            try {

                this.uploader = new plupload.Uploader({
                    container: container,
                    runtimes: options.runtimes,
                    unique_names: false,
                    browse_button: 'upload-browse',
                    browse_button_hover: 'ui-state-hover',
                    browse_button_active: 'ui-state-active',
                    drop_element: 'upload-queue-block',
                    max_file_size: size,
                    url: options.url,
                    flash_swf_url: options.swf,
                    silverlight_xap_url: options.xap,
                    filters: filters,
                    //chunk_size		: options.chunk_size,
                    multipart: true,
                    required_features: options.required.join(','),
                    rename: true,
                    urlstream_upload: true
                });

                // on Uploader init
                this.uploader.bind('Init', function (up) {
                    $('#upload-browse').removeClass('loading').button('enable');
                    self._createDragDrop();
                    up.features.triggerDialog = false;
                });

                // on Uploader init
                this.uploader.bind('PostInit', function (up) {
                    // this has some issues in Chrome
                    if (up.runtime == 'html5') {
                        $('#' + up.id + '_html5').attr('accept', '');
                    }
                });

                // on Uploader refresh
                this.uploader.bind('Refresh', function (up) {
                });

                // on add file
                this.uploader.bind('QueueChanged', function () {
                    var files = self.uploader.files;

                    $('#upload-queue-drag, #upload-queue-queue').css('display', 'none');

                    self._createQueue(files);
                });

                // on upload file
                this.uploader.bind('UploadFile', function (up, file) {
                    self._onStart(file);
                });

                this.uploader.bind('UploadComplete', function (up) {
                    self._onAllComplete();
                });

                this.uploader.bind('FileUploaded', function (up, file, o) {
                    var status = '';

                    switch (file.status) {
                        case plupload.DONE	:
                            status = 'complete';
                            break;
                        case plupload.FAILED:
                            status = 'error';
                            self.errors++;
                            break;
                    }

                    // no reponse text perhaps server error
                    if (o.response === '') {
                        if (o.status === 200) {
                            o.response = '{"error":false,"files":["' + file.name + '"]}';
                        } else {
                            o.response = '{"error":"Upload failed: Error code - ' + o.status + '"}';
                        }
                    }

                    if (!isJSON(o.response)) {
                        o.response = '{"error":"Upload failed: ' + $.trim(o.response) + '"}';
                    }

                    self._onComplete(file, $.parseJSON(o.response), status);
                });

                this.uploader.bind('Error', function (up, err) {
                    var file = err.file, message, details;

                    // no runtime meets requirements, revert to simple html4
                    if (err.code === plupload.INIT_ERROR) {
                        self._createSimple();
                    }

                    if (file) {
                        // create language key from message
                        var msg = err.message.replace(/[^a-z ]/gi, '').replace(/\s+/g, '_').toLowerCase();
                        // get code as string
                        var code = err.code.toString();

                        // get details
                        details = $.Plugin.translate('error_' + code.replace(/[\D]/g, ''), code);

                        message = '<p><strong>' + $.Plugin.translate(msg, err.message) + '</strong></p>';

                        if (err.details) {
                            message += '<p>' + err.details + '</p>';
                        } else {
                            switch (err.code) {
                                case self.FILE_EXTENSION_ERROR:
                                case self.FILE_INVALID_ERROR:
                                    details = details.replace('%s', file.name);
                                    break;

                                case self.FILE_SIZE_ERROR:
                                    details = details.replace(/%([fsm])/g, function ($0, $1) {
                                        switch ($1) {
                                            case 'f':
                                                return file.name;
                                            case 's':
                                                return plupload.formatSize(file.size);
                                            case 'm':
                                                return plupload.formatSize(up.settings.max_file_size);
                                        }
                                    });

                                    break;
                            }
                            message += '<p>' + details + '</p>';
                        }

                        $.Dialog.alert(message);
                    }

                });

                this.uploader.bind('FilesRemoved', function (files) {
                });

                this.uploader.bind("UploadProgress", function (o, file) {
                    self._onProgress(file);
                });

                // Set timeout between chunks for servers using mod_security
                if (this.uploader.settings.chunk_size) {
                    this.uploader.bind('ChunkUploaded', function (file, o) {
                        window.setTimeout(function () {
                        }, 1000);
                    });
                }

                this.uploader.init();
            } catch (e) {
            }
        },
        _getUploader: function () {
            return this.uploader;
        },
        _onStart: function (file) {
            this.currentFile = file;

            var el = file.element;
            // Add loader
            $(el).addClass('load');
            // disable insert, rename, name
            $('span.queue-item-rename, span.queue-item-insert', '#upload-queue').addClass('disabled');
            // show progressbar for flash
            if (this.uploader.runtime != 'html4') {
                // show progress bar
                $('span.queue-item-progress', el).show();
            }
        },
        _isError: function (err) {
            if (err) {
                if ($.isArray(err)) {
                    return err.length;
                }

                return true;
            }

            return false;
        },
        _onComplete: function (file, response, status) {
            var self = this;
            // remove loader
            $(file.element).removeClass('load');

            if (this._isError(response.error)) {
                status = 'error';
                this.errors++;

                var msg = response.error;

                // pass text to error if available
                if (response.text) {
                    msg = response.text;
                }

                if ($.isPlainObject(response.error) && response.error.text) {
                    msg = response.error.text;
                }

                // join error array
                if ($.isArray(response.error)) {
                    msg = response.error.join(' : ');
                }

                // show error text
                $(file.element).addClass('error').after('<li class="queue-item-error"><span>' + msg + '</span></li>');
                // hide progress
                $('span.queue-item-progress', file.element).hide();
            } else {
                $(file.element).addClass(status);

                if (file.status == plupload.DONE) {
                    if (response.files && response.files.length) {
                        file.name = response.files[0];
                    }

                    var item = {
                        name: file.name, //plupload.cleanName(file.name),
                        insert: $('span.queue-item-insert', file.element).hasClass('selected')
                    };

                    this._trigger('fileComplete', null, item);
                }
            }

            $('span.queue-item-status', file.element).addClass(status);
        },
        _onAllComplete: function () {
            this.uploading = false;

            this._trigger('uploadComplete');
        },
        _setProgress: function (el, percent) {
            $('span.queue-item-progress', el).css('width', percent + '%');
        },
        _onProgress: function (file) {
            $('span.queue-item-size', file.element).html(plupload.formatSize(file.loaded));

            var percent = file.percent;

            if (file.size == file.loaded) {
                percent = 100;
            }

            $('span.queue-item-size', file.element).html(percent + '%');

            this._setProgress(file.element, percent);
        },
        upload: function (args) {
            // Only if there are files to upload
            var files = this.uploader.files;

            if (files.length) {
                this.uploading = true;

                if (this.uploader.runtime == 'html5') {
                    if (!this.options.canvasResize) {
                        args.resize = null;
                    }
                }

                // set resize options
                this.uploader.settings.resize = args.resize;
                // set multipart params
                this.uploader.settings.multipart_params = args || {};

                this.uploader.start();
            }
            return false;
        },
        refresh: function () {
            if (!this.uploading)
                this.uploader.refresh();
        },
        close: function () {
            if (this.uploading)
                this.uploader.stop();

            this.uploader.destroy();
        },
        getErrors: function () {
            return this.errors;
        },
        isUploading: function () {
            return this.uploading;
        },
        stop: function () {
            this.uploader.stop();
        },
        start: function () {
            this.uploader.start();
        },
        setStatus: function (s) {
            var file = this.currentFile;

            if (file) {
                $(file.element).removeClass('load complete error').addClass(s.state || '');

                if (s.state && s.state == 'error') {
                    this.errors++;

                    if (s.message) {
                        $(file.element).after('<li class="queue-item-error"><span>' + s.message + '</span></li>');
                    }
                }
            }
        },
        _createDragDrop: function () {
            if (this.uploader.features.dragdrop) {
                $('<li id="upload-queue-drag">' + $.Plugin.translate('upload_drop', 'Drop files here') + '</li>').appendTo('ul#upload-queue').show('slow');
            } else {
                $('<li id="upload-queue-queue">' + $.Plugin.translate('upload_queue', 'Upload Queue') + '</li>').appendTo('ul#upload-queue').show('slow');
            }
        },
        /**
         * Rename a file in the uploader files list
         * @param {Object} file File object
         * @param {String} name New name
         */
        _renameFile: function (file, name) {
            this.uploader.getFile(file.id).name = name;

            this._trigger('fileRename', null, file);
        },
        _removeFiles: function () {
            this.uploader.splice();

            $(this.element).html('<li style="display:none;"></li>');

            this._createDragDrop();
        },
        /**
         * Remove a file from the queue
         * @param {String} file File to remove
         */
        _removeFile: function (file) {
            this._trigger('fileDelete', null, file);

            $(file.element).remove();

            this.uploader.removeFile(file);

            if (!this.uploader.files.length) {
                this._createDragDrop();
            }
        },
        _createQueue: function (files) {
            var self = this, doc = document, max_file_size = this.uploader.settings.max_file_size, input, info;

            $(this.element).empty();

            var filters = $.map(this.uploader.settings.filters, function (o) {
                if (o.extensions.indexOf('*') == -1) {
                    return o.extensions.split(',');
                }
            });

            function _triggerError(file) {
                self.uploader.trigger('Error', {
                    code: self.FILE_INVALID_ERROR,
                    message: 'File invalid error',
                    file: file
                });

                self.uploader.removeFile(file);

                if (!self.uploader.files.length) {
                    self._createDragDrop();
                }
            }

            function isValidName(s) {
                return /\.(php|php(3|4|5)|js|exe|html|htm|phtml|java|perl|py|asp|dll|go|ade|adp|bat|chm|cmd|com|cpl|hta|ins|isp|jse|lib|mde|msc|msp|mst|pif|scr|sct|shb|sys|vb|vbe|vbs|vxd|wsc|wsf|wsh)\./i.test(s) === false;
            }

            $.each(files, function (x, file) {
                var title = $.String.basename(file.name);

                if (filters.length) {
                    if (new RegExp('\\.(' + filters.join('|') + ')$', 'i').test(title) === false) {
                        _triggerError(file);

                        return false;
                    }
                }

                // check for extension in file name, eg. image.php.jpg
                if (!isValidName(title)) {
                    _triggerError(file);

                    return false;
                }

                // sanitize name
                title = $.String.safe(title, self.options.websafe_mode, self.options.websafe_spaces, self.options.websafe_textcase);
                // rename file
                self._renameFile(file, title);

                // create file list element
                file.element = doc.createElement('li');

                var status = doc.createElement('span');
                var size = doc.createElement('span');
                var name = doc.createElement('span');
                var rename = doc.createElement('span');
                var insert = doc.createElement('span');
                var input = doc.createElement('input');

                // status
                $(status).attr({
                    'title': $.Plugin.translate('delete', 'Delete'),
                    'role': 'button'
                }).addClass('queue-item-status delete').click(function () {
                    if (self.uploading) {
                        return self._stop(file);
                    }

                    return self._removeFile(file);
                });

                // text
                $(name).attr({
                    'title': title,
                    'role': 'presentation'
                }).addClass('queue-item-name').append('<span class="queue-item-progress" role="presentation"></span><span class="queue-item-name-text">' + title + '</span>').appendTo(file.element);

                // size
                $(size).attr({
                    'title': plupload.formatSize(file.size),
                    'role': 'presentation'
                }).addClass('queue-item-size').html(plupload.formatSize(file.size));

                // input
                $(input).attr({
                    'type': 'text',
                    'aria-hidden': true
                }).appendTo(name).hide();

                // rename
                $(rename).attr({
                    'title': $.Plugin.translate('rename', 'Rename'),
                    'role': 'button'
                }).addClass('queue-item-rename').not('.disabled').click(function (e) {
                    $('span.queue-item-name-text', name).click();
                    e.preventDefault();
                });

                // insert
                $(insert).attr({
                    'title': $.Plugin.translate('upload_insert', 'Insert after upload'),
                    'role': 'button'
                }).click(function (e) {
                    // set all others disabled
                    $('li.queue-item span.queue-item-insert').each(function () {
                        if (this == e.target) {
                            $(this).toggleClass('disabled').toggleClass('selected');
                        } else {
                            $(this).addClass('disabled').removeClass('selected');
                        }
                    });

                }).addClass('queue-item-insert disabled').toggle(self.options.insert);

                var buttons = [size, rename, insert, status];

                // add optional buttons
                $.each(self.options.buttons, function (name, props) {
                    var btn = document.createElement('span');

                    $(btn).attr({
                        'title': (props.title || name),
                        'role': 'button'
                    }).addClass(props['class']).click(function () {
                        var fn = props.click || $.noop;

                        fn.call(self, this);
                    });

                    buttons.push(btn);
                });

                // create actions container
                $('<span class="queue-item-actions"></span>').appendTo(file.element).append(buttons);

                $('#upload-body').click(function (e) {
                    if ($(e.target).is('input, span.queue-item-rename, span.queue-item-name-text', file.element))
                        return;

                    $(input).blur();
                });

                $('span.queue-item-name-text', name).click(function (e) {
                    if (self.uploading) {
                        e.preventDefault();
                        return;
                    }

                    var name, txt = this;

                    $(this).hide();

                    // remove extension
                    name = $.String.stripExt(file.name);
                    // make web safe
                    name = $.String.safe(name, self.options.websafe_mode, self.options.websafe_spaces, self.options.websafe_textcase);

                    $(input).val(name).show().attr('aria-hidden', false);

                    $(input).bind('blur', function () {
                        var v = $(input).val() + '.' + $.String.getExt($(txt).text());
                        // make web safe
                        v = $.String.safe(v, self.options.websafe_mode, self.options.websafe_spaces, self.options.websafe_textcase);

                        if (isValidName(v)) {
                            self._renameFile(file, v);
                        } else {
                            v = file.name;
                        }

                        // show name element
                        $(txt).show().text(v);

                        // remove input element
                        $(input).hide().attr('aria-hidden', true);

                        $(rename).unbind('click.blur');
                    });

                    $(rename).bind('click.blur', function () {
                        $(input).blur();

                        $(rename).unbind('click.blur');
                    });

                    $(input).focus();
                });

                $(file.element).addClass('queue-item').addClass('file').addClass($.String.getExt(file.name)).appendTo($(self.element));

                self._trigger('fileSelect', null, file);
            });

        },
        _stop: function (file) {
            this.uploader.stop();

            $(file.element).removeClass('load');
        },
        destroy: function () {
            this.uploader.destroy();
            $.Widget.prototype.destroy.apply(this, arguments);
        }

    });

    $.extend($.ui.uploader, {
        version: "@@version@@"
    });

})(jQuery);
