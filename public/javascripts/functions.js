const alertPlaceholder = $(`#liveAlertPlaceholder`);
const statusResponse = $(`#statusResponse`);
const loadingPlaceholder = $(`#loadingPlaceholder`);

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

const loadingCard = () => {
    const wrapper = `<div class="animate__animated animate__zoomIn card placeholder-glow">
                        <div class="card-header">
                            <h5 class="card-title"><span class="placeholder col-6"></span></h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary"><span class="placeholder col-6"></span></h6>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>Notas</p>
                                <footer class="blockquote-footer"><span class="placeholder col-7"></span></footer>
                            </blockquote>
                            <blockquote class="blockquote mb-0">
                                <p>Porcentaje de Asistencia Teórica:</p>
                                <footer class="blockquote-footer"><span class="placeholder col-7"></span></footer>
                            </blockquote>
                            <blockquote class="blockquote mb-0">
                                <p>Porcentaje de Asistencia Práctica:</p>
                                <footer class="blockquote-footer"><span class="placeholder col-7"></span></footer>
                            </blockquote>
                        </div>
                    </div>`;
    statusResponse.html(wrapper).ready(() => {
        
    });
};