<?php
// credenciales database
define('DB_USUARIO','uzxmtajyybhicc3x');
define('DB_PASSWORD','2DEoFRnnPyAjzhmWVnEX');
define('DB_HOST','bse4ahk5bxa5sqgazam3-mysql.services.clever-cloud.com');
define('DB_NAME','bse4ahk5bxa5sqgazam3');
$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NAME);
// comrueba conexion
// echo $conn->ping(); 
if ($conn->connect_error){
    echo $conn->connect_error;
}
// asegura que no haya errores por acentos 
$conn->set_charset('utf8');
?>