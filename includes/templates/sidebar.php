<aside class="contenedor-proyectos" >
        <div class="panel crear-proyecto">
        <h2 class="Bienvenido">Bienvenido <?php echo $_SESSION['nombre_usuario'];?></h2>
            <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>

        <div class="panel lista-proyectos">
            <h2>Proyectos</h2>
            <ul id="proyectos" class="proyectos">
            
            <?php $proyectos = ObtenerProyectos()?>
            <?php if($proyectos){
                foreach($proyectos as $proyecto){    
            ?>
                <li>
                    <a href="index.php?id_proyecto=<?php echo$proyecto['id_proyecto']?>" id="<?php echo$proyecto['id_proyecto']?>">
                        <?php echo $proyecto['nombre']; ?> 
                    </a>
                </li> 
            <?php }
            }?>
             
            </ul>
        </div>
    </aside>
