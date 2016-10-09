<?php
 
	$target_dir = "./imagenes/";

	if(!($_POST['folder'] === NULL)){
		$target_dir = $target_dir . $_POST['folder'] . "/";
	}

	if (!file_exists($target_dir)) {
    	mkdir($target_dir, 0777, true);
	}
     
     $name = $_FILES["file"]["name"];

     print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);
	 
	 print_r($target_file);

     move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

	?>