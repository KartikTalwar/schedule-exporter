<?php


$get = @$_POST['data'];

$decode = base64_decode($get);

$schedule = @explode("DELIMITER", $decode);
$schedule = @implode("\n", $schedule);

$file = "Schedule-".time()."ics";

header("Pragma: public"); 
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename=".$file);
header("Content-Description: File Transfer");
@readfile($file);

echo $schedule;

?>