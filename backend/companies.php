<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM companies WHERE id = ?");
        $stmt->execute([$id]);
        $company = $stmt->fetch();
        if ($company) {
            echo json_encode(["status" => "success", "data" => $company]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Company not found"]);
        }
    } else {
        $query = "SELECT * FROM companies WHERE 1=1";
        $params = [];
        if ($search !== '') {
            $query .= " AND (name LIKE ? OR description LIKE ? OR platform LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        $query .= " ORDER BY featured DESC, rating DESC, id DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $companies = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $companies]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['name']) || empty($data['name'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Company name is required"]);
        exit();
    }
    
    $sql = "INSERT INTO companies (name, logo, description, max_funding, profit_split, start_price, rating, reviews_count, discount_code, discount_percentage, referral_url, featured, top_deal, platform) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $data['name'],
        $data['logo'] ?? 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150',
        $data['description'] ?? '',
        $data['max_funding'] ?? '$200,000',
        $data['profit_split'] ?? '80/20',
        $data['start_price'] ?? '$49',
        $data['rating'] ?? 4.8,
        $data['reviews_count'] ?? 100,
        $data['discount_code'] ?? 'OPF10',
        $data['discount_percentage'] ?? '10% OFF',
        $data['referral_url'] ?? '#',
        isset($data['featured']) ? intval($data['featured']) : 0,
        isset($data['top_deal']) ? intval($data['top_deal']) : 0,
        $data['platform'] ?? 'MT4, MT5'
    ]);
    
    echo json_encode(["status" => "success", "message" => "Company created", "id" => $pdo->lastInsertId()]);
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Company ID required"]);
        exit();
    }
    
    $sql = "UPDATE companies SET name=?, logo=?, description=?, max_funding=?, profit_split=?, start_price=?, rating=?, discount_code=?, discount_percentage=?, referral_url=?, featured=?, top_deal=?, platform=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $data['name'],
        $data['logo'],
        $data['description'],
        $data['max_funding'],
        $data['profit_split'],
        $data['start_price'],
        $data['rating'],
        $data['discount_code'],
        $data['discount_percentage'],
        $data['referral_url'],
        intval($data['featured']),
        intval($data['top_deal']),
        $data['platform'],
        intval($data['id'])
    ]);
    
    echo json_encode(["status" => "success", "message" => "Company updated"]);
} elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Company ID required"]);
        exit();
    }
    
    $stmt = $pdo->prepare("DELETE FROM companies WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["status" => "success", "message" => "Company deleted"]);
}
?>
