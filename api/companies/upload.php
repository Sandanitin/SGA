<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

if (!isset($_FILES['logo']) || $_FILES['logo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No valid file uploaded."]);
    exit();
}

$file = $_FILES['logo'];
$maxSize = 5 * 1024 * 1024; // 5MB limit
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "File size exceeds maximum limit of 5MB."]);
    exit();
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid file extension. Only JPG, JPEG, PNG, WEBP allowed."]);
    exit();
}

// Generate unique secure filename
$newFileName = 'logo_' . uniqid() . '_' . time() . '.' . $ext;
$targetPath = UPLOAD_DIR . $newFileName;

if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $fileUrl = UPLOAD_URL . $newFileName;
    echo json_encode([
        "success" => true,
        "message" => "Logo uploaded successfully",
        "file_url" => $fileUrl
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to save uploaded file."]);
}
?>
