<?php

$dir = $_POST['folder'];
return json_encode(scandir($dir)); 

?>