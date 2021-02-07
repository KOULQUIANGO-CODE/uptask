<?php
$tarea = filter_var($_POST['tarea'],FILTER_SANITIZE_STRING);
$accion = $_POST['accion'];
$id_proyecto = (int) $_POST['id_proyecto'];
if($accion === 'crear'){
    require('../function/conexion.php');
    try{
        $stmt = $conn->prepare("INSERT INTO tareas(nombre_tarea,id_proyecto) VALUES (?,?)");
        $stmt->bind_param('si',$tarea,$id_proyecto);
        $stmt->execute();
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_tarea' => $stmt->insert_id,
                'tipo' => $accion,
                'tarea' => $tarea
            );
        }else{
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conn->close();
    }catch(\Exception $e){
        $respuesta = array('error' => $e->getMessage());
    }
    echo json_encode($respuesta);
} ?>
