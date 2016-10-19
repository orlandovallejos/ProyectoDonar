<?php
 
	$target_dir = "./imagenes/";

	if(!($_POST['folder'] === NULL)){
		$target_dir = $target_dir . $_POST['folder'] . "/";
	}

	if (!file_exists($target_dir)) {
    	mkdir($target_dir, 0777, true);
	}

	?>