<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = trim($data['username'] ?? '');
    $password = trim($data['password'] ?? '');
    
    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Username and password are required"]);
        exit();
    }
    
    // Check master default credentials first for easy demo access
    if ($username === 'admin' && $password === 'admin123') {
        echo json_encode([
            "status" => "success",
            "message" => "Admin authentication successful",
            "token" => md5("admin_token_" . time()),
            "user" => ["username" => "admin", "role" => "administrator"]
        ]);
        exit();
    }
    
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
    
    if ($admin && password_verify($password, $admin['password_hash'])) {
        echo json_encode([
            "status" => "success",
            "message" => "Admin login successful",
            "token" => md5($admin['username'] . time()),
            "user" => ["username" => $admin['username'], "role" => "administrator"]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid admin username or password"]);
    }
}
?>
