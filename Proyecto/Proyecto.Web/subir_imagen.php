<?php
 
// $file_content = $_POST['file'];
// $file_content = substr($file_content,
//     strlen('data:text/plain;base64,'));
// $file_content = base64_decode($file_content);



     $target_dir = "./imagenes/";
     $name = $_FILES["file"]["name"];
     print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);

     move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);




	//  if(isset($_POST["submit"]))
	//  {
	 	
	// 	$dir_actual = getcwd();	 	
	// 	$destino = $dir_actual."/imagenes/".$_FILES['imagen']['name'];
		 	
	// 	if(isset($_FILES['imagen']['tmp_name']) && @copy ($_FILES['imagen']['tmp_name'], $destino))
	// 		echo "Se guardo en $destino";
	// 	else
	// 		echo "Error al guardar imagen.";
			
		
			
	// }
	?>
	
	
	


