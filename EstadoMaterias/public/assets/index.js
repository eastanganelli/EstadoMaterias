const init = () => {
    const actualyear = new Date().getUTCFullYear();
    $(`#nowYear`).text(actualyear);
};

// Event handler for submit button click
$(`#sendData`).click(() => {
    const student_ = $(`#studentInput`).val();
    const subject_ = $(`#studentSubject option:selected`).val();

    if (student_ == `` || subject_ == `Materia:`) {
        if (student_ == `` && subject_ == `Materia:`)
            appendAlert(`No se ingreso DNI/Mail ni seleccionó la materia`, `danger`);
        else if (student_ == ``)
            appendAlert(`No se ingreso DNI/Mail`, `danger`);
        else
        appendAlert(`No se seleccionó la materia`, `danger`);
    } else {
        $.get(`/mystatus`, { student: student_, subject: subject_ } ).done((data) => {
            console.log(data);
            // $(`#statusResponse`).html(data);
        }).fail((data) => {
            console.error(data.responseText);
        });
    }
});