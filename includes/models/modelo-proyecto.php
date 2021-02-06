<?php 
// echo json_encode($_POST);
$proyecto = filter_var($_POST['proyectos'],FILTER_SANITIZE_STRING);
$accion = $_POST['accion'];
if($accion === 'crear'){
    require_once ('../function/conexion.php');
    try{
        $stmt = $conn->prepare("INSERT INTO proyectos(nombre) VALUES (?)");
        $stmt->bind_param('s',$proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_proyecto' => $stmt->insert_id,
                'tipo' => $accion,
                'nombreProyecto' =>$proyecto
            );
        }
        $stmt->close();
        $conn->close();
    }catch(\Exception $e){
        $respuesta = array('error' => $e->getMessage());
    }
    echo json_encode($respuesta);
}
?>