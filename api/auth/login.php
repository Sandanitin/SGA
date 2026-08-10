<?php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username'] ?? $data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username and password are required."]);
    exit();
}

// Master demo login fallback for zero-friction setup
if (($username === 'admin' || $username === 'admin@onlypropfirms.com') && $password === 'admin123') {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_user'] = 'admin';
    echo json_encode([
        "success" => true,
        "message" => "Admin authentication successful",
        "token" => md5("admin_token_" . time()),
        "user" => ["username" => "admin", "email" => "admin@onlypropfirms.com"]
    ]);
    exit();
}

$pdo = getDbConnection();
$stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? OR email = ?");
$stmt->execute([$username, $username]);
$admin = $stmt->fetch();

if ($admin && password_verify($password, $admin['password'])) {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_user'] = $admin['username'];
    echo json_encode([
        "success" => true,
        "message" => "Admin login successful",
        "token" => md5($admin['username'] . time()),
        "user" => ["username" => $admin['username'], "email" => $admin['email']]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid admin username or password"]);
}
?>
