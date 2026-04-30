<?php

$name = $_POST['club-name'];
$members = $_POST['club-members'];
$time = $_POST['club-time'];
$tags = $_POST['club-tags'];
$desc = $_POST['club-desc'];

echo "<h1>Club Submitted!</h1>";
echo "<p><strong>Name:</strong> $name</p>";
echo "<p><strong>Members:</strong> $members</p>";
echo "<p><strong>Meeting Time:</strong> $time</p>";
echo "<p><strong>Tags:</strong> $tags</p>";
echo "<p><strong>Description:</strong> $desc</p>";

?>