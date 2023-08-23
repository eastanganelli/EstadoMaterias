const alertPlaceholder = $(`#liveAlertPlaceholder`);

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