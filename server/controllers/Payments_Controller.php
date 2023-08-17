<?php

class Payments_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }


    /**
     * Get all records and related data like repairs, persons ...etc
     * @return void
     */
    public function getAllRecordsAndRelatedData()
    {
        // Get payments
        $this->setModel('Payments_Model');
        $payments = $this->model->getRecords();

        // Get repairs
        $this->setModel('Repairs_Model');
        $repairs = $this->model->getAllRecords();

        // Get persons
        $this->setModel('Persons_Model');
        $persons = $this->model->getPersons();

        // check for errors
        if (empty($repairs->errors)) {
            $this->state = true;
            $this->data['payments'] = $payments;
            $this->data['repairs'] = $repairs;
            $this->data['persons'] = $persons;
        }
        else {
            $this->state = false;
        }

        return $this;
    }

    /**
     * Get record and related data like repairs, persons ...etc
     * @return void
     */
    public function getRecordAndRelatedData()
    {
        // Get payments
        $this->setModel('Payments_Model');
        $filterParams = [
            'id' => $this->params['id']
        ];
        $payment = $this->model->filter($filterParams);

        // Get repairs
        $this->setModel('Repairs_Model');
        $repairs = $this->model->getAllRecords();

        // Get persons
        $this->setModel('Persons_Model');
        $persons = $this->model->getPersons();

        // check for errors
        if (empty($repairs->errors)) {
            $this->state = true;
            $this->data['payment'] = $payment[0];
            $this->data['repairs'] = $repairs;
            $this->data['persons'] = $persons;
        }
        else {
            $this->state = false;
        }

        return $this;
    }

    /**
     * Create new record
     * @return void
     */
    function addNewRecord() {
        global $ERROR_CODES, $Errors;

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Payments_Model');
            $createResults = $this->model->createNewRecord($this->params);

            // check result
            if ($createResults['state'] && is_numeric($createResults['newID'])) {
                $this->state = true;
                $this->data['newID'] = $createResults['newID'];
            }
            else {
                // store error
                $errorText = $ERROR_CODES['PAYMENTS']['CREATE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['PAYMENTS']['CREATE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('phone')->setErrorDetails('phone parameter is required in order to update person data')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function deleteRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['PAYMENTS']['DELETE']['MISSING_REQUEST_PARAMS']['PAYMENT_ID']['NAME'];
            $errorCode = $ERROR_CODES['PAYMENTS']['DELETE']['MISSING_REQUEST_PARAMS']['PAYMENT_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('Payments_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['PAYMENTS']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['PAYMENTS']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('An error occured while deleting record')->gen();
                $this->state = false;
            }

        }

        return $this;
    }

    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['PAYMENTS']['UPDATE']['MISSING_REQUEST_PARAMS']['PAYMENT_ID']['NAME'];
            $errorCode = $ERROR_CODES['PAYMENTS']['UPDATE']['MISSING_REQUEST_PARAMS']['PAYMENT_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Payments_Model');
            $columnsToUpdate = [
                'personID' => ['i', isset($this->params['personID'])?$this->params['personID']:''],
                'repairID' => ['i', isset($this->params['repairID'])?$this->params['repairID']:''],
                'amount' => ['s', isset($this->params['amount'])?$this->params['amount']:''],
                'name' => ['s', isset($this->params['name'])?$this->params['name']:''],
                'description' => ['s', isset($this->params['description'])?$this->params['description']:''],
                'note' => ['s', isset($this->params['note'])?$this->params['note']:''],
                'method' => ['s', isset($this->params['method'])?$this->params['method']:''],
                'status' => ['s', isset($this->params['status'])?$this->params['status']:''],
            ];
            $updateResult = $this->model->updateRecordData($this->params['id'], $columnsToUpdate);

            // check result
            if (isset($updateResult) && ($updateResult == true || $updateResult == 1)) {
                $this->state = true;
            }
            else {
                $this->state = false;
            }
        }

        return $this;
    }


















}
