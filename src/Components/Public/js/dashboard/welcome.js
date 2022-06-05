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
        if (!$('.miuky-select input[name="channel"]:checked').val()) {
            return $('.miuky-select .miuky-input-error').css({ 'display': 'block' });
        } else {
            $('.miuky-select .miuky-input-error').css({ 'display': 'none' });
        }
        if (!$('.miuky-textarea').val().trim().replace(/(?:\r\n|\r|\n)/g, '').length) {
            return $('.miuky-areatext .miuky-input-error').css({ 'display': 'block' });
        } else {
            $('.miuky-areatext .miuky-input-error').css({ 'display': 'none' });
        }

        $('#formSave')[0].submit();
    });

    $('#resetForm').click(function () {
        $('#formSave')[0].reset();
        $('#placeholder').text($('#placeholder').data('titleselect'));
        $('#MessageTextareaCounter').text(`${$('.miuky-textarea').val().trim().replace(/(?:\r\n|\r|\n)/g, '').length} / ${$('.miuky-textarea').attr('maxlength')}`);
        $('.miuky-input-error').css({ 'display': 'none' });

        setTimeout(() => {
            $('#save-popup').addClass('hidden');
            setTimeout(() => $('#save-popup').addClass('none'), 800);
        }, 500);
    });
});