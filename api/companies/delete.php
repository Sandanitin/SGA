<?php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? intval($_GET['id']) : (isset($data['id']) ? intval($data['id']) : 0);

if ($id === 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Company ID required"]);
    exit();
}

$pdo = getDbConnection();
$stmt = $pdo->prepare("DELETE FROM companies WHERE id = ?");
$stmt->execute([$id]);

echo json_encode([
    "success" => true,
    "message" => "Company deleted successfully"
]);
?>
