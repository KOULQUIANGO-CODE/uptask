eventListeners();
const listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    //Boton para crear proyectos;
    document.querySelector(".crear-proyecto a").addEventListener('click', nuevoProyecto);
    if (document.querySelector('.agregar-tarea')) {
        // boton para una nueva tarea
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }
}
// menu-movil
document.querySelector('.menu-contenedor').addEventListener('click', menu);

function menu() {
    const contenedor = document.querySelector('.contenedor-proyectos');
    if (document.querySelector('.agregar-tarea')) {
        const newtarea = document.querySelector('.nueva-tarea');
        newtarea.classList.toggle('ocultar');
    }
    contenedor.classList.toggle('ocultar-menu');

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
    datos.append('id_perfil', document.querySelector('#perfil').value);


    // abrir la conexion
    xhr.open('POST', 'includes/models/modelo-proyecto.php', true);
    // pasar los datos
    xhr.onload = function() {
            if (this.status === 200) {
                // obtener datos de la respuesta
                console.log(JSON.parse(xhr.responseText));
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
}
// Agregar una nueva Tarea al proyecto actual
function agregarTarea(e) {
    e.preventDefault();
    let nombreTarea = document.querySelector('.nombre-tarea').value;
    // validar que el campo tenga algo escrito
    if (nombreTarea === '') {
        Swal.fire({
            icon: 'info',
            title: 'Información',
            text: '¡El campo no puede ir vacio!'
        })
    } else {
        // la tarea tiene algo, insertar en php
        // llamado a ajax
        // crear el objecto
        const xhr = new XMLHttpRequest();
        // crear FormData
        const datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);
        // abrir la conexion
        xhr.open('POST', 'includes/models/modelo-tareas.php', true);
        // ejecutar y respuesta
        xhr.onload = function() {
                if (this.status === 200) {
                    // console.log(JSON.parse(xhr.responseText));
                    // leemos la respuesta de PHP
                    const respuesta = JSON.parse(xhr.responseText);
                    // console.log(respuesta);
                    const resultado = respuesta.respuesta,
                        tarea = respuesta.tarea,
                        id_insertado = respuesta.id_tarea,
                        tipo = respuesta.tipo;
                    if (resultado === 'correcto') {
                        // se agrego correctamente
                        if (tipo === 'crear') {
                            Swal.fire({
                                    icon: 'success',
                                    title: 'Tarea Creada',
                                    text: 'La tarea: ' + tarea + 'se creó correctamente'
                                })
                                // contruir el template
                            const nuevaTarea = document.createElement('li');
                            // agregar el ID
                            nuevaTarea.id = 'tarea:' + id_insertado;
                            // agregar la clase tarea
                            nuevaTarea.classList.add('tarea');
                            //construir el html
                            nuevaTarea.innerHTML =
                                `<p>${tarea}</p>
                                <div class="acciones">
                                    <i class="far fa-check-circle"></i>
                                    <i class="fas fa-trash"></i>
                                </div>`;
                            // agregar al html
                            const listado = document.querySelector('.listado-pendientes ul');
                            listado.appendChild(nuevaTarea);
                            // limpiar el formulario
                            document.querySelector('.agregar-tarea').reset();
                        }
                    } else {
                        // hubo un error
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

    }
}