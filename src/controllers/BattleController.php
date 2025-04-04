<?php

namespace App\controllers;

use App\EntityManager;

class BattleController extends Controller
{
    private $entityManager;

    public function __construct()
    {
        $this->entityManager = new EntityManager();
    }

    public function index()
    {
        $combattant1 = $this->entityManager->findById('combattant', rand(1, 11));
        $combattant1[] = $this->entityManager->executeQuery('SELECT a.nom AS "aptitude_name", ca.note FROM aptitude a 
                                                                 INNER JOIN combattant_aptitude ca ON ca.id_aptitude = a.Id 
                                                                 INNER JOIN combattant c ON c.Id = ca.id_combattant
                                                                 WHERE c.Id = :id
                                                                 ORDER BY ca.note', [':id' => $combattant1['Id']]);
        $combattant2 = $this->entityManager->findById('combattant', rand(1, 11));
        $combattant2[] = $this->entityManager->executeQuery('SELECT a.nom AS "aptitude_name", ca.note FROM aptitude a 
                                                                 INNER JOIN combattant_aptitude ca ON ca.id_aptitude = a.Id 
                                                                 INNER JOIN combattant c ON c.Id = ca.id_combattant
                                                                 WHERE c.Id = :id
                                                                 ORDER BY ca.note', [':id' => $combattant2['Id']]);

        return $this->render('battle', ['combattant1' => $combattant1, 'combattant2' => $combattant2]);
    }
}