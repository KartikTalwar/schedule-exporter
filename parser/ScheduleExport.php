<?php

error_reporting(0);	// treating unforseen consequences

$get = $_GET['data'];	// get the encoded array
$decode = base64_decode($get);	// decode the array


print_r(json_encode($decode));	// test output


?>
