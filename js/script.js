eventListeners();
const listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    //Boton para crear proyectos;
    document.querySelector(".crear-proyecto a").addEventListener('click', nuevoProyecto);
    if (document.querySelector('.agregar-tarea')) {
        // boton para una nueva tarea
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }
    // menu-movil
    document.querySelector('.menu-contenedor').addEventListener('click', menu);
    // botones para las acciones de las tarea
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
    // eliminar Proyecto
    if (document.querySelector('.btn-eliminar')) {
        document.querySelector('.btn-eliminar').addEventListener('click', eliminarProyecto);
    }

}


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
    // desabilitar boton de añadir proyecto
    const nuevoProyectobtn = document.querySelector('.btn-agregar-Proyecto');
    nuevoProyectobtn.classList.add('no-activo');
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
                        nuevoProyecto.innerHTML = `<a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}"> ${nombreProyecto} </a>`;
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
        // Desabilitar boton para evitar mas de una insercion
        const nuevaTareabtn = document.querySelector('.nueva-tarea');
        nuevaTareabtn.value = "Guardando...";
        nuevaTareabtn.disabled = true;
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
                                    text: 'La tarea: ' + tarea + ' se creó correctamente'
                                })
                                // habilitar de nuevo del boton
                            nuevaTareabtn.value = "Agregar";
                            nuevaTareabtn.disabled = false;
                            // contruir el template
                            const nuevaTarea = document.createElement('li');
                            // eliminar el parrafo de no existe tareas
                            if (document.querySelector('#noExisteTarea')) {
                                document.querySelector('#noExisteTarea').remove();
                            }
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
// cambia el estado de las tareas o las elimina
// metodo delegation video 666
function accionesTareas(e) {
    e.preventDefault();
    // target de vuelve el elemento en que doy click para asi evitar crear muchos addEventListener
    // contains = si contiene
    if (e.target.classList.contains('fa-check-circle')) {
        if (e.target.classList.contains('completo')) {
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        } else {
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }
    if (e.target.classList.contains('fa-trash')) {
        Swal.fire({
            title: '¿Seguro(a)?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const tareaEliminada = e.target.parentElement.parentElement;
                //borrar de la base de datos
                eliminarTareaBD(tareaEliminada)
                    // borrar del Html
                tareaEliminada.remove();
                Swal.fire(
                    'Eliminado!',
                    'La tarea fue elimanda cón exito!',
                    'success'
                )
            }
        })
    }
}
// completa o descompleta una tarea
function cambiarEstadoTarea(tarea_parametro, estado) {
    // split va separa en los parametros por ejemplo tarea:1 va ser igual a 'tarea','1'-> : es el parametro del split
    const idTarea = tarea_parametro.parentElement.parentElement.id.split(':');
    // console.log(idTarea[1]);
    // llamado a ajax
    // crear el objecto
    const xhr = new XMLHttpRequest();
    // crear FormData
    const datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);
    // abrir la conexion
    xhr.open('POST', 'includes/models/modelo-tareas.php', true);
    // ejecutar y respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                // console.log(JSON.parse(xhr.responseText));
                // leemos la respuesta de PHP
                const respuesta = JSON.parse(xhr.responseText);
                // console.log(respuesta);
            }
        }
        // enviar la peticion
    xhr.send(datos);
}
// elimina las tareas de la base de datos
function eliminarTareaBD(tareaEliminada) {
    const idTarea = tareaEliminada.id.split(':');
    const xhr = new XMLHttpRequest();
    // crear FormData
    const datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');
    // abrir la conexion
    xhr.open('POST', 'includes/models/modelo-tareas.php', true);
    // ejecutar y respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                // console.log(JSON.parse(xhr.responseText));
                // leemos la respuesta de PHP
                const respuesta = JSON.parse(xhr.responseText);
                //    elimnar que haya tareas restanes
                const tareasRestantes = document.querySelectorAll('li.tarea');
                if (tareasRestantes.length === 0) {
                    document.querySelector('.listado-pendientes ul').innerHTML = "<p id='noExisteTarea'>No hay tareas en este proyecto</p>";
                }
            }
        }
        // enviar la peticion
    xhr.send(datos);
}
// // elimina las proyecto de la base de datos
function eliminarProyecto(e) {
    e.preventDefault();
    const proyectoEliminar = e.target.id.split(':');
    Swal.fire({
        title: '¿Seguro(a)?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //borrar de la base de datos
            eliminarProyectoBD(proyectoEliminar);

        }
    })
}

function eliminarProyectoBD(eliminarProyecto) {

    const proyectoEliminar = eliminarProyecto;
    // llamado a ajax
    // crear el objecto
    const xhr = new XMLHttpRequest();
    // crear FormData
    const datos = new FormData();
    datos.append('id_proyecto', proyectoEliminar[1]);
    datos.append('accion', 'eliminar');
    // abrir la conexion
    xhr.open('POST', 'includes/models/modelo-proyecto.php', true);
    // ejecutar y respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                if (respuesta.respuesta === 'correcto') {
                    // Notificacion
                    Swal.fire(
                        'Eliminado!',
                        'El proyecto fue elimanda cón exito!',
                        'success'
                    ).then(resultado => {
                        // redireccionar a la nueva URL
                        if (resultado.value) {
                            window.location.href = 'index.php';
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'ERROR',
                        text: '¡No se puede eliminar el proyecto si contiene tareas, eliminalas e intenta de nuevo!'
                    })
                }
            }
        }
        // enviar la peticion
    xhr.send(datos);
}