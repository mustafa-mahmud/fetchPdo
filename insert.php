<?php
require 'db.php';

if (isset($_POST)) {
  $name = filter_var(strip_tags($_POST['insertname']), FILTER_SANITIZE_STRING);
  $pass = strip_tags($_POST['insertpass']);

	$sql="insert into users (name,pass) values (:name,:pass)";
	$stmt=$conn->prepare($sql);
	$stmt->execute(['name'=>$name,'pass'=>$pass]);

	if($stmt->rowCount()){
		echo 'Successfully Inserted';
	}else{
		echo 'Wrong Something';
	}
}
?>