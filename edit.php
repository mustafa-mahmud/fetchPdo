<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if ($data) {
  $data = explode(',', $data);
  $id = $data[0];
  $name = $data[1];
  $pass = $data[2];

  echo $id, $name, $pass;
}
?>