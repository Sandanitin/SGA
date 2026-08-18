<?php
require_once __DIR__ . '/../db.php';

header("Content-Type: text/csv; charset=UTF-8");
header("Content-Disposition: attachment; filename=sga_giveaway_entries_" . date('Y-m-d') . ".csv");

$pdo = getDbConnection();
$stmt = $pdo->prepare("SELECT id, first_name, last_name, youtube_username, email, consent, created_at FROM giveaway_entries ORDER BY created_at DESC");
$stmt->execute();
$entries = $stmt->fetchAll();

$output = fopen("php://output", "w");
fputcsv($output, ["ID", "First Name", "Last Name", "YouTube Username", "Email Address", "Consent", "Submission Date"]);

foreach ($entries as $row) {
    fputcsv($output, [
        $row['id'],
        $row['first_name'],
        $row['last_name'],
        $row['youtube_username'],
        $row['email'],
        $row['consent'] ? 'Yes' : 'No',
        $row['created_at']
    ]);
}

fclose($output);
exit();
?>
