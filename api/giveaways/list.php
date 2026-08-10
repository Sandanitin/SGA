<?php
require_once __DIR__ . '/../db.php';

$pdo = getDbConnection();

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$sql = "SELECT * FROM giveaway_entries WHERE 1=1";
$params = [];

if (!empty($search)) {
    $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR youtube_username LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$entries = $stmt->fetchAll();

echo json_encode([
    "success" => true,
    "data" => $entries
]);
?>
