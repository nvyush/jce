(function($) {
  $.fn.tabs = function (options) {
      return this.each(function() {
        var el = this;

        if ($(this).data('tabs')) {
            return this;
        }

        $(this).find('.tab-content .tab-pane').first().addClass('active');

        $(el).children('.nav-tabs').children('li').click(function (e) {
            e.preventDefault();

            // get current active panel
            var panel = $(el).children('.tab-content').children('.tab-pane.active').get(0);

            // get current active tab
            var tab = $(el).children('.nav-tabs').children('li.active').get(0);

            // trigger tab event
            $(el).trigger('tabs.beforeactivate', [tab, panel]);

            // toggle all tabs...
            $(el).children('.nav-tabs').children('li').removeClass('active');
            // ...and panels
            $(el).children('.tab-content').children('.tab-pane').removeClass('active');

            // activate tab
            $(this).addClass('active');

            // activate new panel
            var panel = $(el).children('.tab-content').children('.tab-pane').eq($(this).index()).addClass('active').get(0);

            // trigger tab event
            $(el).trigger('tabs.activate', [this, panel]);

            // kill default events
            e.preventDefault();
        }).first().addClass('active');

        $(this).data('tabs', true);
      });
  };

  $.fn.datalist = function() {
    return this.each(function() {
        var self = this;

        var id = $(this).attr('id'), name = $(this).attr('name');

        $(this).attr('id', id + '-select').removeAttr('name');

        if (!$(this).parent().hasClass('ui-datalist')) {
            $(this).wrap('<span class="ui-datalist" />');
        }

        var input = $(this).siblings('input[type="text"]');

        if (input.length === 0) {
          input = $('<input type="text" />').attr('id', id).attr('name', name).insertBefore(this);
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
