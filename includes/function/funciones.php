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
function ObtenerProyectos(){
    require('conexion.php');
    try {
        return $conn->query("SELECT id_proyecto,nombre FROM proyectos");
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
function obtenerTareaProyecto($id1 = null){
    require('conexion.php');
    try {
        return $conn->query("SELECT id_tareas,nombre_tarea FROM tareas WHERE id_proyecto = {$id1}");
    } catch (\Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}

?>