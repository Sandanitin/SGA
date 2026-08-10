<?php
require_once __DIR__ . '/../db.php';

$pdo = getDbConnection();

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$featuredOnly = isset($_GET['featured']) && $_GET['featured'] == '1';
$adminView = isset($_GET['admin']) && $_GET['admin'] == '1';

$sql = "SELECT * FROM companies WHERE 1=1";
$params = [];

if (!$adminView) {
    $sql .= " AND status = 'active'";
}

if ($featuredOnly) {
    $sql .= " AND featured = 1";
}

if (!empty($search)) {
    $sql .= " AND (company_name LIKE ? OR short_description LIKE ? OR platform LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY featured DESC, rating DESC, id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$companies = $stmt->fetchAll();

echo json_encode([
    "success" => true,
    "data" => $companies
]);
?>
