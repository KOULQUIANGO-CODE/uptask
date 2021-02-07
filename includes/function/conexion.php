<?php
// credenciales database
define('DB_USUARIO','root');
define('DB_PASSWORD','root');
define('DB_HOST','localhost:3307');
define('DB_NAME','uptask');
$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NAME);
// comrueba conexion
// echo $conn->ping(); 
if ($conn->connect_error){
    echo $conn->connect_error;
}
// asegura que no haya errores por acentos 
$conn->set_charset('utf8');
?>