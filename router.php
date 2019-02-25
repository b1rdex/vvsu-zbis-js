<?php

declare(strict_types=1);

if (preg_match('/\.(?:png|jpg|jpeg|gif|js|html)$/', $_SERVER["REQUEST_URI"])) {
    return false;
}

if (file_exists($_SERVER["SCRIPT_FILENAME"])) {
    require $_SERVER["SCRIPT_FILENAME"];
}
