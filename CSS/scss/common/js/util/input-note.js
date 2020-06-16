define(['jquery'], function ($) {
    var InputNote = {
        init: function () {
            var self = this;
            $.each($("input[type='text'],input[type='password']"), function (i, n) {
                if ($(this).data("note")) {
                    if ($(this).val() == '')
                        $(this).val($(this).data("note"));
                    if ($(this).val() != $(this).data("note"))
                        $(this).addClass('input-focus');
                    self.bindEvent($(this));
                }
            });
        },
        bindEvent: function (ele) {
            ele.on('focus', function () {
                if (ele.val() == ele.data("note")) {
                    ele.val('');
                    ele.addClass('input-focus');
                }
                if (ele.data("pass") == 1) {
                    ele.attr('type', 'password');
                }
            }).on('blur', function () {
                if (ele.val() == '') {
                    ele.val(ele.data("note"));
                    ele.removeClass('input-focus');
                    if (ele.data("pass") == 1) {
                        ele.attr('type', 'text');
                    }
                }
            });
        }
    }
    return InputNote;
});