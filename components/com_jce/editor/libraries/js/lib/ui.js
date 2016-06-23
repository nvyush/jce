(function($) {

    $.fn.checkbox = function() {
      return this.each(function() {
        var self = this;

        if ($(this).hasClass('ui-form-constrain')) {
          return this;
        }

        $(this).wrap('<i class="ui-checkbox" />').click(function() {
            $(this).parent().toggleClass('ui-icon-check', this.checked);
        }).on('checkbox:check', function() {
          $(this).parent().toggleClass('ui-icon-check', self.checked);
        }).parent().toggleClass('ui-icon-check', self.checked).css('margin-top', $(self).parent().height() / 2);
      });
    };

    $.fn.constrain = function() {
        return this.each(function() {
            var cb = this, $elms = $(this).siblings('input[type="text"]');

            $(cb).addClass('ui-form-constrain').wrap('<i class="ui-constrain ui-icon-lock" />').click(function() {
                $(this).parent().toggleClass('ui-icon-unlock', !this.checked);
            });

            $elms.each(function() {
              $(this).data('tmp', this.value);
            }).change(function() {
              var a = this, b = $elms.not(this);

              var w = $(a).val(), h = $(b).val();

              if (w && h) {
                  // if constrain is on
                  if ($(cb).prop('checked')) {
                      var tw = $(a).data('tmp');

                      if (tw) {
                          var temp = ((h / tw) * w).toFixed(0);
                          $(b).val(temp).data('tmp', temp);

                          $(cb).trigger('constrain:change', [$elms]);
                      }
                  }
              }

              $(a).data('tmp', w);
            });

            $(this).on('constrain:update', function() {
              $elms.each(function() {
                $(this).data('tmp', this.value);
              });
            });
        });
    };

    $.fn.repeatable = function() {
      return this.each(function() {
        var self = this;

        $('.ui-repeatable-create', this).click(function(e) {
            // clone element
            var el = $(self).clone(true);

            // clear inputs
            $(el).find('input').val('');

            $(self).trigger('repeatable:create', [self, $(el).get(0)]);
            // add new element
            $(self).parent().append(el);

            e.preventDefault();
        });

        $('.ui-repeatable-delete', this).click(function(e) {
          $(this).parent().parent().remove();

          e.preventDefault();
        });
      });
    };

    $.fn.button = function(options, key, value) {
        options = options || {};

        var map = {
            "ui-icon-circle-arrow-w" : "ui-icon-refresh",
            "ui-icon-arrowreturnthick-1-w" : "ui-icon-undo",
            "ui-icon-circle-check" : "ui-icon-check",
            "ui-icon-check" : "ui-icon-check",
            "ui-icon-closethick" : "ui-icon-close"
        };

        return this.each(function() {
            // jQuery UI legacy
            if (typeof options === "string") {
              if (options === "option" && key && value) {
                  if (key === "label") {
                      $('.ui-button-text', this).text(value);
                  }
              }

              if (options === "enable") {
                  $(this).prop('disabled', false);
              }

              if (options === "disable") {
                  $(this).prop('disabled', true);
              }

              // end here so as not to re-create the button
              return this;
            }
            // add button classes
            $(this).addClass('ui-button').addClass(options.classes || "");
            // add icon
            $(this).html('<span class="ui-button-text">' + $(this).text() + '</span>');

            if (options.icons && options.icons.primary) {
                var icon = map[options.icons.primary] || options.icons.primary || "";

                $('<i />').addClass('ui-margin-small-right ui-icon ' + icon).prependTo(this);
            }
        });
    };

    $.fn.tabs = function (options, key, value) {
        return this.each(function() {

          var el = this;

          // jQuery UI legacy
          if (typeof options === "string") {
            // end here so as not to re-create the tabs
            return this;
          }

          if ($(this).data('tabs')) {
              return this;
          }

          $(this).addClass('ui-tabs');

          $(this).children('ul').addClass('ui-tab');

          if ($(this).children('.ui-switcher').length === 0) {
              $('<div class="ui-switcher" />').append($(this).children('div')).appendTo(this);
          }

          $(this).children('.ui-switcher').addClass('ui-tabs-panel').children().first().addClass('ui-active');

          $('.ui-tab li', el).click(function (e) {
              e.preventDefault();

              // legacy
              $(el).children('.ui-switcher').children().addClass('ui-tabs-hide');

              // get current active panel
              var panel = $(el).children('.ui-switcher').children('.ui-active').get(0);

              // get current active tab
              var tab = $(el).children('.ui-tab').children('.ui-active').get(0);

              // trigger tab event
              $(el).trigger('tabs.beforeactivate', [tab, panel]);

              // toggle all tabs and panels
              $(el).children('.ui-tab, .ui-switcher').children().removeClass('ui-active');

              // activate tab
              $(this).addClass('ui-active');

              // activate new panel
              var panel = $(el).children('.ui-switcher').children().eq($(this).index()).addClass('ui-active').removeClass('ui-tabs-hide').get(0);

              // trigger tab event
              $(el).trigger('tabs.activate', [this, panel]);

              // kill default events
              e.preventDefault();
          }).first().addClass('ui-active');

          $(this).data('tabs', true);
        });
    };

    $.fn.accordion = function(options, key, value) {
        var el = this, hidden = {'height' : 0, 'position' : 'relative', 'overflow' : 'hidden'};

        // jQuery UI legacy
        if (typeof options === "string") {
          if (options === "activate" && typeof key !== "undefined") {
            $('.ui-accordion-title', this).click();
          }
          // end here so as not to re-create the button
          return this;
        }

        //options = $.extend({index: 0}, options || {});

        $(this).children('h3').addClass('ui-accordion-title').next('div').addClass('ui-accordion-content').css(hidden);

        $('.ui-accordion-title', this).click(function(e) {
            e.preventDefault();

            var tab = this;

            // collapse all content
            $('.ui-accordion-content', el).height(0);
            // deactivate title
            $('.ui-accordion-title', el).removeClass('ui-active');

            $(this).addClass('ui-active').next('div').css('height', function(i, v) {
                if (parseInt(v) === 0) {
                    $(el).trigger('accordion:activate', [tab, this]);
                    return 'auto';
                }

                return 0;
            });
        });

        if ($.isPlainObject(options)) {
            if (typeof options.beforeActivate === "function") {
                $(this).on('accordion:activate', function(e, tab) {
                    var ui = {"newHeader" : tab};
                    options.beforeActivate(e, ui);
                });
            }
        }

        return this;
    };

    $.fn.dialog = function() {
        return this;
    };

    $.fn.datalist = function() {
      return this.each(function() {
          var self = this;

          var id = $(this).attr('id');

          $(this).attr('id', id + '-select');

          $(this).parent('.ui-form-controls').addClass('ui-datalist');

          if (!$(this).parent().hasClass('ui-datalist')) {
              $(this).wrap('<span class="ui-datalist" />');
          }

          var input = $(this).siblings('input[type="text"]');

          if (input.length === 0) {
            input = $('<input type="text" />').attr('id', id).insertBefore(this);
          }

          $(input).prop('disabled', $(this).prop('disabled'));

          // add external event
          $(input).change(function() {
            $(self).trigger('datalist:change');
          });

          $(this).change(function() {
            // special case for class list
            if (this.id === "classlist") {
              var $tmp = $('<span/>').addClass($(this).siblings('input').val()).addClass(this.value);
              value = $tmp.attr('class');
            }
            // pass value to input and trigger change
            $(input).val(this.value).change();
          });
      });
    };

})(jQuery);
