<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $firstName = trim($data['first_name'] ?? '');
    $lastName = trim($data['last_name'] ?? '');
    $youtube = trim($data['youtube_username'] ?? '');
    $email = trim($data['email'] ?? '');
    $consent = isset($data['consent']) && $data['consent'] ? 1 : 0;
    
    if (empty($firstName) || empty($lastName) || empty($youtube) || empty($email)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "All fields (First Name, Last Name, YouTube Username, Email) are required."]);
        exit();
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email address format."]);
        exit();
    }
    
    $stmt = $pdo->prepare("INSERT INTO giveaway_entries (first_name, last_name, youtube_username, email, consent) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $lastName, $youtube, $email, $consent]);
    
    echo json_encode([
        "status" => "success",
        "message" => "Congratulations! Your giveaway entry has been registered successfully.",
        "entry_id" => $pdo->lastInsertId()
    ]);
} elseif ($method === 'GET') {
    // Admin list of entries
    $stmt = $pdo->prepare("SELECT * FROM giveaway_entries ORDER BY created_at DESC");
    $stmt->execute();
    $entries = $stmt->fetchAll();
    
    echo json_encode(["status" => "success", "data" => $entries]);
}
?>
