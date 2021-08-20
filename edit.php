<?php
require_once 'db.php';

if (isset($_POST)) {

  $id = $_POST['id'];
  $name = $_POST['insertname'];
  $pass = $_POST['insertpass'];

  $sql = "UPDATE users SET name=:name,pass=:pass WHERE id=:id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['id' => $id, 'name' => $name, 'pass' => $pass]);

  if ($stmt->rowCount()) {
    echo 'Updated successfully';
  }
}
?>