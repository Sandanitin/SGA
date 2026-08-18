<?php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['company_name'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Company name is required"]);
    exit();
}

$name = trim($data['company_name']);
$slug = !empty($data['slug']) ? trim($data['slug']) : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
$logo = $data['logo'] ?? 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200';
$shortDesc = $data['short_description'] ?? '';
$fullDesc = $data['full_description'] ?? $shortDesc;
$websiteUrl = $data['website_url'] ?? '#';
$discount = $data['discount'] ?? '10% OFF';
$promoCode = $data['promo_code'] ?? 'SGA';
$dealUrl = $data['deal_url'] ?? $websiteUrl;
$featured = isset($data['featured']) ? intval($data['featured']) : 0;
$status = isset($data['status']) && in_array($data['status'], ['active', 'inactive']) ? $data['status'] : 'active';

$maxFunding = $data['max_funding'] ?? '$200,000';
$profitSplit = $data['profit_split'] ?? '90/10';
$startPrice = $data['start_price'] ?? '$49';
$rating = isset($data['rating']) ? floatval($data['rating']) : 4.8;
$platform = $data['platform'] ?? 'MT4, MT5, cTrader';

$pdo = getDbConnection();

$sql = "INSERT INTO companies (company_name, slug, logo, short_description, full_description, website_url, discount, promo_code, deal_url, featured, status, max_funding, profit_split, start_price, rating, platform)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $name, $slug, $logo, $shortDesc, $fullDesc, $websiteUrl, $discount, $promoCode, $dealUrl, $featured, $status, $maxFunding, $profitSplit, $startPrice, $rating, $platform
    ]);
    
    echo json_encode([
        "success" => true,
        "message" => "Company created successfully",
        "id" => $pdo->lastInsertId(),
        "slug" => $slug
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error creating company: " . $e->getMessage()]);
}
?>
