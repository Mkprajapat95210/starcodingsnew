

(function ($) {
    'use strict';

    var form = $('#contact-form');
    var formMessages = $('#form-messages');

    $(form).submit(function (e) {
        e.preventDefault();

        // Spinner start
        var spinner = $('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
        var submitBtn = $(form).find('button[type="submit"]');
        submitBtn.prop('disabled', true).append(spinner);

        // Honeypot check
        if ($('#website').val()) {
            $(formMessages).removeClass('success').addClass('error').text('Spam detected.');
            submitBtn.prop('disabled', false);
            spinner.remove();
            return;
        }



        // Form data serialize
        var formData = $(form).serialize();
        var attempt = 0;
        var maxAttempts = 2;

        function sendAjax() {
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                $(formMessages).removeClass('error').addClass('success').text(response);
                $('#contact-name, #contact-email, #subject, #contact-message, #contact-phone').val('');
                $('#consent').prop('checked', false);
                submitBtn.prop('disabled', false);
                spinner.remove();
            })
            .fail(function (data) {
                attempt++;
                if (attempt <= maxAttempts) {
                    setTimeout(sendAjax, 1000); // Retry after 1s
                } else {
                    $(formMessages).removeClass('success').addClass('error');
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                    }
                    submitBtn.prop('disabled', false);
                    spinner.remove();
                }
            });
        }
        sendAjax();
    });

})(jQuery);
