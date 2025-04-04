<?php

namespace App\controllers;

class HomeController extends Controller
{
    public function index() {
        return $this->render('home', []);
    }

    public function fighter() {
        return $this->render('fighter', []);
    }
}