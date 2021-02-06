<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<?php 
    $actual = obtenederPaginaActual();
    if($actual === 'crear-cuenta' || $actual === 'login'){
        echo '<script src="js/formulario.js"></script>';
    }else{
        echo '<script src="js/script.js"></script>';
    }
?>
</body>

</html>