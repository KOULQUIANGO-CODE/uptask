<?php 
include_once 'includes/function/secciones.php';
include_once 'includes/function/funciones.php';
include_once 'includes/templates/header.php'; 
include_once 'includes/templates/barra.php';
// var_dump($_SESSION);
?>
<div class="contenedor">
<?php include_once 'includes/templates/sidebar.php'; ?>
    <main class="contenido-principal">
        <h1>
            <span>Diseño de Página Web</span>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>



        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                    <p><?php echo $proyecto['nombre']; ?></p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</div>
<!--.contenedor-->
<?php include_once 'includes/templates/footer.php'; ?>