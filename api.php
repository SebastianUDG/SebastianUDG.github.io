<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    if (isset($_GET['id'])) {
      $id = intval($_GET['id']);
      $result = $conn->query("SELECT * FROM users WHERE id=$id");
      echo json_encode($result->fetch_assoc());
    } else {
      $result = $conn->query("SELECT * FROM users");
      $data = [];
      while($row = $result->fetch_assoc()) $data[] = $row;
      echo json_encode($data);
    }
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    if (isset($data['id']) && $data['id'] != '') {
      $id = intval($data['id']);
      $conn->query("UPDATE users SET name='$name', email='$email' WHERE id=$id");
    } else {
      $conn->query("INSERT INTO users (name, email) VALUES ('$name', '$email')");
    }
    break;

  case 'DELETE':
    parse_str(file_get_contents("php://input"), $data);
    $id = intval($data['id']);
    $conn->query("DELETE FROM users WHERE id=$id");
    break;
}
?>
