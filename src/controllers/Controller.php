<?php

namespace App\controllers;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class Controller
{
    public function render($view, $data)
    {
        $loader = new FilesystemLoader("src/views");
        $twig = new Environment($loader);

        echo $twig->render("$view.html.twig", $data);
    }
}