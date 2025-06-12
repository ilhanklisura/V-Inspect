<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../factories/DaoFactory.php';

class StationService extends BaseService {
    public function __construct() {
        parent::__construct(DaoFactory::create('stations'));
    }
}
