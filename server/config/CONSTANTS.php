<?php

$CONSTANTS = [
    'DEBUG' => false,
    'BASE_PATH' => $_SERVER['DOCUMENT_ROOT'],
    'SYS_CONTROLLERS' => [
        // controller class name (actual class name) => some data for later use
        "Persons_Controller" => [
            'className' => 'Persons_Controller',
        ],
        "Repairs_Controller" => [
            'className' => 'Repairs_Controller',
        ],
        "RepairsQuotes_Controller" => [
            'className' => 'RepairsQuotes_Controller',
        ],
        "Payments_Controller" => [
            'className' => 'Payments_Controller',
        ],
        "WorkLog_Controller" => [
            'className' => 'WorkLog_Controller',
        ],
        "Debts_Controller" => [
            'className' => 'Debts_Controller',
        ],
        "Stats_Controller" => [
            'className' => 'Stats_Controller',
        ],
        "Saving_Controller" => [
            'className' => 'Saving_Controller',
        ],
    ],
    'SYS_MODELS' => [
        // model class name (actual class name) => some data for later use
        'Persons_Model' => [
            'className' => 'Persons_Model',
        ],
        'Repairs_Model' => [
            'className' => 'Repairs_Model',
        ],
        'RepairsQuotes_Model' => [
            'className' => 'RepairsQuotes_Model',
        ],
        'RepairsTimeline_Model' => [
            'className' => 'RepairsTimeline_Model',
        ],
        'Payments_Model' => [
            'className' => 'Payments_Model',
        ],
        'WorkLog_Model' => [
            'className' => 'WorkLog_Model',
        ],
        'Debts_Model' => [
            'className' => 'Debts_Model',
        ],
        'DebtsTimeline_Model' => [
            'className' => 'DebtsTimeline_Model',
        ],
        'Saving_Model' => [
            'className' => 'Saving_Model',
        ],
    ],
];

$CONSTANTS['BASE_PATH'] = $baseUrl;
