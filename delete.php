<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if ($data) {
  $id = intval($data);

  $sql = "DELETE FROM users WHERE id=:id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(['id' => $id]);

  if ($stmt->rowCount()) {
    echo "Deleted Successfully";
  }
}
?>