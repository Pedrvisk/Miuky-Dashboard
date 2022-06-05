$(document).ready(() => {
    $('.dropdown-menu li input').click((res) => {
        let placeholder = res.target.dataset.placeholder;
        $('#placeholder').text(`${placeholder}`);
        $('.dropdown-toggle').removeClass('show');
        $('.dropdown-menu').removeClass('show');
    });

    // Default Values
    $('.miuky-textarea').on('input', function () {
        var maxlength = $(this).attr('maxlength');
        var currentLength = $(this).val().length;

        $('#MessageTextareaCounter').text(`${currentLength} / ${maxlength}`);
    });

    // Save Changes and Reset with Form
    $('.inputForm').on('input', function () {
        setTimeout(() => {
            $('#save-popup').removeClass('none');
            setTimeout(() => $('#save-popup').removeClass('hidden'), 800);
        }, 500);
    });

    $('#saveForm').click(function (e) {
        const isEmbed = $('#messages-tab .nav-link.active').data('myembed');
        if (isEmbed === 'true') {
            $('#MessageEmbed').val('true');
        } else {
            $('#MessageEmbed').val('false');

            if (!$('.miuky-textarea').val().length) {
                console.log('textarea')
            }
        }

        $('#formSave')[0].submit();
    });

    $('#resetForm').click(function () {
        $('#formSave')[0].reset();
        $('#placeholder').text($('#placeholder').data('titleselect'));
        $('#MessageTextareaCounter').text(`${$('.miuky-textarea').val().length} / ${$('.miuky-textarea').attr('maxlength')}`);

        setTimeout(() => {
            $('#save-popup').addClass('hidden');
            setTimeout(() => $('#save-popup').addClass('none'), 800);
        }, 500);
    });
});