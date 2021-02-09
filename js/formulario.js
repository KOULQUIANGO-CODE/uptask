// console.log('funciona');
(function() {
    'use strict';
    eventlisterns()

    function eventlisterns() {
        document.querySelector('#formulario').addEventListener('submit', validarRegistro);
    }
    // e evento
    function validarRegistro(e) {

        // e.preventDefault(); evita que el formulario se envie
        e.preventDefault();
        if (document.querySelector('#nombre')) {
            var nombre_usuario = document.querySelector('#nombre').value,
                confirmarPassword = document.querySelector('#confirmar_password').value;
        }
        let usuario = document.querySelector('#usuario').value,
            password = document.querySelector('#password').value,
            tipo = document.querySelector('#tipo').value;
        // console.log(usuario + ' ' + password);
        if (document.querySelector('#nombre')) {
            if (usuario === '' || password === '' || confirmarPassword === '' || nombre_usuario === '') {
                // la validacion fallo
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: '¡Todos los campos son obligatorios!'
                })
            } else if (password != confirmarPassword) {
                // validar contraseña
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: '¡Las contraseñas no coinciden!'
                })
                var ejercion = 1;
            }

        }
        if (ejercion != 1) {
            // desabilitar el boton para evitar crear mas de un registro
            const btnCrearCuenta = document.querySelector('.btnCrearCuenta');
            if (btnCrearCuenta) {
                btnCrearCuenta.value = "Guardando...";
                btnCrearCuenta.disabled = true;
            }
            if (usuario === '' || password === '') {
                // la validacion fallo
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: '¡Todos los campos son obligatorios!'
                })
            } else {

                // desabilitar el boton para evitar crear mas de un registro
                const btnlogin = document.querySelector('.btnlogin');
                if (btnlogin) {
                    btnlogin.value = "Cargando...";
                    btnlogin.disabled = true;
                }
                //Los dos campos son carrectos, mandar a llamar ajax
                let datos = new FormData();
                datos.append('usuario', usuario);
                if (document.querySelector('#nombre')) {
                    datos.append('nombre_usuario', nombre_usuario);
                }
                datos.append('password', password);
                datos.append('accion', tipo);
                // console.log(datos.get('accion'));
                // llamado ajax
                let xhr = new XMLHttpRequest();
                // abrir la conexion

                xhr.open('POST', 'includes/models/modelo-admin.php', true);

                // pasar los datos
                xhr.onload = function() {
                        if (this.status === 200) {
                            // console.log(JSON.parse(xhr.responseText));
                            const respuesta = JSON.parse(xhr.responseText);
                            // esto solo funcionara con el echo json_encod e($respuesta) en el php 
                            // console.log(respuesta);
                            // si la respuestas es correcta
                            if (respuesta.respuesta === 'correcto') {
                                if (respuesta.tipo === 'crear') {
                                    // notificacion de registro exitoso
                                    // ansy hace que primero se ejecute para el await  y despues de ejecute el if
                                    (async() => {
                                        const { value: ok } = await Swal.fire({
                                            icon: 'success',
                                            title: 'Usuario Creado',
                                            text: '¡Usuario Creado Exitosamente!',
                                            inputValue: 'ok'
                                        })
                                        if (ok) {
                                            window.location.href = 'login.php';
                                        }
                                    })();

                                } else if (respuesta.tipo === 'login') {
                                    // notificacion de login exitoso
                                    if (respuesta.validacion === 'exitosa') {
                                        window.location.href = 'index.php';
                                    } else if (respuesta.resultado === 'password_incorrecto') {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'ERROR',
                                            text: '¡Usuario o Contraseña Incorrecta!'
                                        })

                                    } else {
                                        // console.log(respuesta);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'ERROR',
                                            text: '¡Usuario no existe!'
                                        })
                                    }

                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'ERROR',
                                        text: '¡Hubo un error!'
                                    })
                                }
                            }
                        }
                    }
                    // enviar la peticion
                xhr.send(datos);
            }
        }
    }
})();