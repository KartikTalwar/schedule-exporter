<?php


$get = $_POST['data'];
$serialize = base64_decode($get);

$file = "test.txt";
$fh = @fopen($file, 'w');


$data = explode(',', $serialize);
$stringData = "";

for(i=0; i<count($data); i++)
{
	$stringData = $data[i];
	fwrite($fh, $stringData);
}

fclose($fh);

if (file_exists($file)) 
{
	header('Content-Description: File Transfer');
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename='.basename($file));
	header('Content-Transfer-Encoding: binary');
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	header('Pragma: public');
	header('Content-Length: ' . filesize($file));
	ob_clean();
	flush();
	readfile($file);
	exit;
}


?>
