<?php
 $usuario = filter_var($_POST['usuario'],FILTER_SANITIZE_STRING);
 $password = filter_var($_POST['password'],FILTER_SANITIZE_STRING);
 $accion = $_POST['accion'];
// codigo para crear los admistradores
if($accion === 'crear'){
    // hashear passwords
    $opciones = array(
    // para un gran numeromde usuarios remonstable 10
        'costo' => 12 
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
    // llamamos a la conexion
    require_once ('../function/conexion.php');
    // die es como un echo
    // die(json_encode($_POST));
    // validamos entradas
    try{
        $stmt = $conn->prepare("INSERT INTO usuarios(usuario, password) VALUES (?,?)");
        $stmt->bind_param('ss', $usuario,$hash_password);
        $stmt->execute();
        //en el caso de haber un error ejecutar este codigo para identificarlo 
        // $respuesta = array(
        //     'respuesta' => $stmt->error_list,
        //     'error' => $stmt->error
        // );
        if($stmt->affected_rows > 0){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
                // 'datos' => array(
                //     'usuario' => $usuario,
                //     'password' => $hash_password)
            );
        }else{
            $respuesta = array(
                'respuesta' => 'error'
            ); 
        }
        $stmt->close();
        $conn->close();
    }catch(\Exception $e){
        $respuesta = array('pass' => $e->getMessage());
    }
    echo json_encode($respuesta);
}
if($accion === 'login'){
    // escribe codigo que loguee a los administradores
    require_once ('../function/conexion.php');
    try{
        // seleccinar el administrador de la base de datos
        $stmt = $conn->prepare("SELECT  id_usuario,usuario, password FROM usuarios WHERE usuario = ?");
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        // loguear al usuario
        $stmt->bind_result($nombre_usuario,$id_usuario,$pass_usuario);
        $stmt->fetch();
        if($nombre_usuario){
            // el usuario existe verificar el password
            if(password_verify($password,$pass_usuario)){
                // iniciamos seccion
                session_start();
                $_SESSION['nombre_usuario'] = $usuario;
                $_SESSION['id'] = $id_usuario;
                $_SESSION['login'] = true;
                // login correcto
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'nombre' =>$nombre_usuario,
                    'tipo' => $accion,
                    'culumna' => $stmt->affected_rows,
                    'validacion' => 'exitosa'
                );
            }else{
                // login incorrecto, eviar error
                $respuesta = array(
                    'tipo' => $accion,
                    'respuesta' => 'correcto',
                    'resultado' => 'password_incorrecto'
                );
            }
            
        }else{
            $respuesta = array(
                'respuesta' => 'correcto',
                'tipo' => $accion,
                'error' => 'Usuario no existe'
            );
                
        } 
        $stmt->close();
        $conn->close();
}catch(\Exception $e){
    $respuesta = array('pass' => $e->getMessage());
}
echo json_encode($respuesta);
}

?>