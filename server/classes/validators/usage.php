<?php

require_once 'Validator.php';
require_once 'ValidatorHandler.php';
require_once 'ValidatorEmail.php';
require_once 'ValidatorMobile.php';
require_once 'ValidatorIDCard.php';
require_once 'ValidatorIMEI.php';

$ValidatorHandler = new ValidatorHandler([
        new ValidatorEmail('user@domain.com'),
        new ValidatorMobile('0521236699'),
        new ValidatorIDCard('123456789'),
        new ValidatorIMEI('1234568598'),
]);

$validateResults = $ValidatorHandler->validate();

echo '<pre>';
print_r($validateResults[3]); // validate results for email
echo '</pre>';