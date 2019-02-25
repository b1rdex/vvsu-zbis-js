<?php

declare(strict_types=1);

$pdo = new PDO('sqlite:/' . __DIR__ . '/db.sqlite');

if (isset($_GET['score'], $_GET['name'])) {
    $name = $_GET['name'];
    $score = (int)$_GET['score'];
    $query = $pdo->prepare('insert into top (name, score) values (?, ?)');
    $query->execute([$name, $score]);
    header('Location: ' . basename($_SERVER['SCRIPT_FILENAME']));
    exit;
}

$query = $pdo->query('select * from top order by score desc');
$data = $query->fetchAll();

?>
<table>
    <tr>
        <th>Name</th>
        <th>Score</th>
    </tr>
    <?php foreach ($data as $row): ?>
        <tr>
            <td><?= $row['name']; ?></td>
            <td><?= $row['score']; ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<a href="index.html">Play again</a>
