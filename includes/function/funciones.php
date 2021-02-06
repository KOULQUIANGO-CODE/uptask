<?php 
// obteneder pagina actual
function obtenederPaginaActual(){
    // server accede a los archivos donde se encuentra hospedado
    $archivo = basename($_SERVER['PHP_SELF']);
    // remplaza una parte de un string con otra
    $pagina = str_replace(".php","",$archivo);
    return $pagina;
}
function ObtenerProyectos(){
    require_once('includes/function/conexion.php');
    try {
        return $conn->query("SELECT id_proyecto,nombre FROM proyectos");
    } catch (Exception $e) {
        echo "¡ERROR!" . $e->getMessage() . '<br>';
        return false;
    }
}


?>