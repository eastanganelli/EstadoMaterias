import * as bootstrap from 'bootstrap'
import { Toast, Modal } from 'bootstrap';
import { materia, iri, lpii } from './materia.api';

const btnBuscar  = document.querySelector(`#buscar`);

btnBuscar.addEventListener('click', () => {
    
    switch(document.getElementById(`matSelection`)) {
        case 1: {
            let modal_ = new Modal();
            modal_.show();
        }
        case 2: {

        }
        default: {
            console.log("No se eligió una materia");
            let alerta = new Toast("No se eligió una materia");
            alerta.show();
        }
    }

});