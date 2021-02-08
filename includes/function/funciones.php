<?php 
 
// obteneder pagina actual
function obtenederPaginaActual(){
    // server accede a los archivos donde se encuentra hospedado
    $archivo = basename($_SERVER['PHP_SELF']);
    // remplaza una parte de un string con otra
    $pagina = str_replace(".php","",$archivo);
    return $pagina;
}
// obtener todos los Proyectos
function ObtenerProyectos($id){
    require('conexion.php');
    try {
        return $conn->query("SELECT id_proyecto,nombre FROM proyectos WHERE id_usuario = {$id}");
    } catch (\Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}
// obtner el nombre del proyecto
function obtenerNombreProyecto($id = null){
    require('conexion.php');
    try {     
        return $conn->query("SELECT nombre FROM proyectos WHERE id_proyecto = {$id}");
    } catch (\Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}
// obtner las tareas del protecto
function obtenerTareaProyecto($id = null){
    require('conexion.php');
    try {
        return $conn->query("SELECT id_tareas,nombre_tarea,estado FROM tareas WHERE id_proyecto = {$id}");
    } catch (\Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}

?>