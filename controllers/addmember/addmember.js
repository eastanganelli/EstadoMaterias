// Event handler for submit button click
$(`#sendData`).click(() => {
    const mail_    = $(`#mailInput`).val();
    const subject_ = $(`#studentSubject`).val();;

    if (mail_ == ``) {
        appendAlert(`No se ingreso Mail`, `danger`);
    } else {
        $.get(`/addmember`, { mail: mail_, subject: subject_ }).done((data) => {
            appendAlert(`Invitación enviada, revisa el SPAM!`, `success`);
        }).fail((err) => {
            appendAlert(err.responseText, `danger`);
        });
    }
});
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div id="myAlert" class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.html(wrapper).ready(() => {
        $(`#myAlert`).fadeTo(2000, 500).slideUp(500, () => {
            $(`#myAlert`).slideUp(500);
            $(`#myAlert`).remove();
        });
    });
}