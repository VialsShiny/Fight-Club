<?php

namespace App\controllers;

use App\EntityManager;

class FighterController extends Controller
{
    private $entityManager;
    public function __construct() {
        $this->entityManager = new EntityManager();
    }
    public function index() {
        $fighters = $this->entityManager->findAll('combattant');
        return $this->render('fighters', ['fighters' => $fighters]);
    }
}