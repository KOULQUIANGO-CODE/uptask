<?php

include_once 'includes/function/secciones.php';
include_once 'includes/function/funciones.php';
include_once 'includes/templates/header.php'; 
include_once 'includes/templates/barra.php';
// var_dump($_SESSION);
$id_perfil = $_SESSION['id'];
// Obtener el ID de la URL
if(isset($_GET['id_proyecto'])){
    $id_proyecto = $_GET['id_proyecto'];
}
?>
<div class="contenedor">
    <?php include_once 'includes/templates/sidebar.php'; ?>
    <main class="contenido-principal">
        <input type="hidden" id="perfil" value="<?php echo $id_perfil?>">
        <div class="menu-contenedor">
            <div class="menu-movil"><i class="fas fa-bars menu"></i></div>
        </div>
        <?php $proyectos = obtenerNombreProyecto($id_proyecto);
        if($proyectos):?>
        <h1 class="tituloProyecto">
            Diseño Actual:
            <button class="boton btn-eliminar" id="eliminarProyecto:<?php echo $id_proyecto?>">Eliminar
                Proyecto</button>
            <?php foreach($proyectos as $nombre):?>
            <span><?php echo $nombre['nombre']; ?></span>
            <?php endforeach; ?>
        </h1>
        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        <?php 
        else: 
            echo '<p>Seleccionar un Proyecto a la Izquierda</p>';
        
        endif;
        ?>


        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes" id="lis-tarea">
            <ul>
                <!-- obtiene las tareas del proyecto actual -->
                <?php $tareas = obtenerTareaProyecto($id_proyecto);
                
                if($tareas->num_rows > 0){
                    foreach($tareas as $tarea):?>
                <!-- si hay tareas  -->
                <li id="tarea:<?php echo $tarea['id_tareas'] ?>" class="tarea">
                    <p><?php echo $tarea['nombre_tarea']; ?></p>
                    <div class="acciones">
                        <i class="far fa-check-circle <?php echo($tarea['estado'] === '1' ? 'completo' : '');?>"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>
                <?php endforeach; 
                }else{
                    //  no hay tareas 
                    echo"<p id='noExisteTarea'>No hay tareas en este proyecto</p>";
                }?>


            </ul>
        </div>
        <div class="avance">
           <span class="tituloAvance"></span>
            <div class="barra-avance" id="barra-avance">
            
                <div class="porcentaje" id="porcentaje">
                </div>
            </div>
        </div>
    </main>
</div>
<!--.contenedor-->
<?php include_once 'includes/templates/footer.php'; ?>