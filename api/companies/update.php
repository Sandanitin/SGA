<?php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Company ID required"]);
    exit();
}

$id = intval($data['id']);
$name = trim($data['company_name']);
$slug = !empty($data['slug']) ? trim($data['slug']) : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
$logo = $data['logo'];
$shortDesc = $data['short_description'];
$fullDesc = $data['full_description'];
$websiteUrl = $data['website_url'];
$discount = $data['discount'];
$promoCode = $data['promo_code'];
$dealUrl = $data['deal_url'];
$featured = intval($data['featured']);
$status = $data['status'];
$maxFunding = $data['max_funding'];
$profitSplit = $data['profit_split'];
$startPrice = $data['start_price'];
$rating = floatval($data['rating']);
$platform = $data['platform'];

$pdo = getDbConnection();

$sql = "UPDATE companies SET 
        company_name=?, slug=?, logo=?, short_description=?, full_description=?, website_url=?, 
        discount=?, promo_code=?, deal_url=?, featured=?, status=?, max_funding=?, profit_split=?, 
        start_price=?, rating=?, platform=? 
        WHERE id=?";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $name, $slug, $logo, $shortDesc, $fullDesc, $websiteUrl, 
        $discount, $promoCode, $dealUrl, $featured, $status, $maxFunding, $profitSplit, 
        $startPrice, $rating, $platform, $id
    ]);
    
    echo json_encode([
        "success" => true,
        "message" => "Company updated successfully"
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error updating company: " . $e->getMessage()]);
}
?>
