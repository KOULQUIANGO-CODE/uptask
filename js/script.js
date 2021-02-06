eventListeners();
const listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    //Boton para crear proyectos;
    document.querySelector(".crear-proyecto a").addEventListener('click', nuevoProyecto);
}

function nuevoProyecto(e) {
    e.preventDefault();
    // console.log('Presionaste')
    // crea un input para el nombre del nuevo proyecto
    const nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
    // seleccionar el id con el nuevo proyecto
    let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
    document.getElementById('nuevo-proyecto').focus()
        // al precionar enter crear el nuevo proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        // console.log(e); 
        const tecla = e.with || e.keyCode;
        if (tecla === 13) {
            guardarProyectoDB(inputNuevoProyecto.value);
            // remover el input
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto) {
    // llamado a jax
    // crear el objecto
    const xhr = new XMLHttpRequest();
    // enviar datos por FormData
    const datos = new FormData();
    datos.append('proyectos', nombreProyecto);
    datos.append('accion', 'crear');
    // abrir la conexion
    xhr.open('POST', 'includes/models/modelo-proyecto.php', true);
    // pasar los datos
    xhr.onload = function() {
            if (this.status === 200) {
                // obtener datos de la respuesta
                // console.log(JSON.parse(xhr.responseText));
                const respuesta = JSON.parse(xhr.responseText);
                let proyecto = respuesta.nombreProyecto,
                    id_proyecto = respuesta.id_proyecto,
                    tipo = respuesta.tipo,
                    resultado = respuesta.respuesta;
                // comprobar insercion
                if (resultado === 'correcto') {
                    console.log(2);
                    // fue exitoso
                    if (tipo === 'crear') {
                        // se creo un nuevo proyecto
                        // inyectar en el html
                        const nuevoProyecto = document.createElement('li');
                        nuevoProyecto.innerHTML = `<a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}"> ${nombreProyecto} </a>`;
                        //    agregar al html
                        listaProyectos.appendChild(nuevoProyecto);
                        Swal.fire({
                            icon: 'success',
                            title: 'Proyecto Creado',
                            text: '¡El proyecto ' + proyecto + ' se creó correctamente!'
                        }).then(resultado => {
                            // redireccionar a la nueva URL
                            if (resultado.value) {
                                window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                            }
                        })

                    } else {
                        // se actualizo o se elimino
                    }
                } else {
                    // huno un error
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR',
                        text: '¡Hubo un error!'
                    })
                }
            }

        }
        // enviar datos
    xhr.send(datos);
    // inyectar el Html

}