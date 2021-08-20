<?php
require_once 'db.php';

if (isset($_GET)) {
  $sql = "select * from users";
  $stmt = $conn->prepare($sql);
  $stmt->execute();

  if ($stmt->rowCount()) {
    $result = $stmt->fetchAll();
    $result = json_encode($result);

    echo $result;
  }
}
?>