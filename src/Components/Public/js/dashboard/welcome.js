$(document).ready(() => {
    let error = 'miuky-input-error';

    // Miuky Select Dropdown
    $('.dropdown-menu li input').click(function () {
        let dropdownInput = $(this).closest('.miuky-select');
        return dropdownInput.find('.miuky-select-placeholder:first').text($(this).data('placeholder')), new mdb.Dropdown(dropdownInput.find('.dropdown-toggle:first')).toggle();
    });

    // Miuky Checkbox
    function checkBoxContainerToggler(e) {
        let switchContainer = $(e).closest('.container-box').find('.container-switch:first');
        return $(e).is(':checked') ? switchContainer.css({ 'display': 'block' }) : switchContainer.css({ 'display': 'none' });
    }

    $('.miuky-checkbox-switch input').click(function () {
        return checkBoxContainerToggler(this);
    });

    // Miuky Textarea
    $('.miuky-textarea').on('input', function () {
        let maxlength = $(this).attr('maxlength'), currentLength = $(this).val().length;
        return $(this).closest('.miuky-areatext').find('.MessageTextareaCounter:first').text(`${currentLength} / ${maxlength}`);
    })

    // Save popup for Changes in input
    $('.inputForm').on('input', function () {
        setTimeout(() => {
            $('#save-popup').removeClass('none'), setTimeout(() => $('#save-popup').removeClass('hidden'), 500);
        }, 200);
    })

    // Save Form
    $('#saveForm').click(function () {
        let invalid = !1;

        if ($('.miuky-checkbox-switch input[name="enabled"]').is(':checked')) {
            $('.miuky-select input[name="channel"]').is(':checked') ? $('.miuky-select input[name="channel"]').closest('.miuky-select').find('.miuky-select-button').removeClass(error) : ((invalid = !0), $('.miuky-select input[name="channel"]').closest('.miuky-select').find('.miuky-select-button').addClass(error));

            $('.miuky-textarea').each(function () {
                return $(this).val().trim().replace(/(?:\r\n|\r|\n)/g, '').length ? $(this).removeClass(error) : ((invalid = !0), $(this).addClass(error));
            });
        }

        if (invalid) return;
        else $('#formSave')[0].submit();
    })

    // Reset Form
    $('#resetForm').click(function () {
        $('#formSave')[0].reset(), $(`.${error}`).removeClass(error);

        $('.miuky-select-placeholder').each(function () {
            console.log($(this).data())
            return $(this).text($(this).data('titleselect'));
        });

        $('.miuky-checkbox-switch input').each(function () {
            return checkBoxContainerToggler(this);
        });

        $('.MessageTextareaCounter').each(function () {
            let textarea = $(this).closest('.miuky-areatext').find('.miuky-textarea');
            return $(this).text(`${textarea.val().trim().replace(/(?:\r\n|\r|\n)/g, '').length} / ${textarea.attr('maxlength')}`);
        });

        setTimeout(() => {
            $('#save-popup').addClass('hidden'), setTimeout(() => $('#save-popup').addClass('none'), 500);
        }, 200);
    });
});
//# sourceMappingURL=welcome.js.map
