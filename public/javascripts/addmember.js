// Event handler for submit button click
$(`#sendData`).click(() => {
    const mail_    = $(`#mailInput`).val();
    const subject_ = $(`#subject`).text() == 'IRI' ? 1 : 2;

    if (mail_.length == 0) {
        appendAlert(`No se ingreso Mail`, `danger`);
    } else {
        $.get(`/sendinvite`, { mail: mail_, subject: subject_ }).done((data) => {
            appendAlert(`Invitación enviada, revisa el SPAM!`, `success`);
            return;
        }).fail((err) => {
            appendAlert(err.responseText, `danger`);
        });
    }
});