<?php
require_once __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$firstName = trim($data['first_name'] ?? '');
$lastName = trim($data['last_name'] ?? '');
$youtube = trim($data['youtube_username'] ?? '');
$email = trim($data['email'] ?? '');
$consent = isset($data['consent']) && $data['consent'] ? 1 : 0;

if (empty($firstName) || empty($lastName) || empty($youtube) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields (First Name, Last Name, YouTube Username, Email) are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email address format."]);
    exit();
}

if (!$consent) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Consent agreement is required."]);
    exit();
}

$pdo = getDbConnection();

// Check duplicate entry by email
$checkStmt = $pdo->prepare("SELECT id FROM giveaway_entries WHERE email = ?");
$checkStmt->execute([$email]);
if ($checkStmt->fetch()) {
    echo json_encode([
        "success" => true,
        "message" => "Your entry is already recorded! Good luck!"
    ]);
    exit();
}

$stmt = $pdo->prepare("INSERT INTO giveaway_entries (first_name, last_name, youtube_username, email, consent) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$firstName, $lastName, $youtube, $email, $consent]);

echo json_encode([
    "success" => true,
    "message" => "Your entry has been submitted successfully.",
    "id" => $pdo->lastInsertId()
]);
?>
