<?php
require_once __DIR__ . '/../db.php';

$pdo = getDbConnection();

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (empty($slug) && $id === 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Slug or ID parameter required"]);
    exit();
}

if (!empty($slug)) {
    $stmt = $pdo->prepare("SELECT * FROM companies WHERE slug = ?");
    $stmt->execute([$slug]);
} else {
    $stmt = $pdo->prepare("SELECT * FROM companies WHERE id = ?");
    $stmt->execute([$id]);
}

$company = $stmt->fetch();

if ($company) {
    echo json_encode(["success" => true, "data" => $company]);
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Company not found"]);
}
?>
