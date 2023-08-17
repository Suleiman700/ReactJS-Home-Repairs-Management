<?php

class WorkLog_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    /**
     * Get all records and related data
     */
    function getAllRecordsAndRelatedData()
    {

        $this->setModel('WorkLog_Model');
        $worklog = $this->model->getWorkLogs();

        // Get persons
        $this->setModel('Persons_Model');
        $persons = $this->model->getPersons();

        // Get repairs
        $this->setModel('Repairs_Model');
        $repairs = $this->model->getAllRecords();

        // check for errors
        if (empty($worklog->errors)) {
            $this->state = true;
            $this->data['worklog'] = $worklog;
            $this->data['persons'] = $persons;
            $this->data['repairs'] = $repairs;
        }
        else {
            $this->state = false;
        }

        return $this;
    }

    /**
     * Get record and related data
     */
    function getRecordAndRelatedData()
    {
        global $ERROR_CODES, $Errors;

        $this->setModel('WorkLog_Model');
        $filterParams = [
            'id' => $this->params['id']
        ];
        $worklog = $this->model->filter($filterParams);

        // check for errors
        if (empty($worklog->errors)) {
            // Get persons
            $this->setModel('Persons_Model');
            $persons = $this->model->getPersons();

            // Get repairs
            $this->setModel('Repairs_Model');
            $repairs = $this->model->getAllRecords();

            if (!empty($worklog)) {
                $this->state = true;
                $this->data['worklog'] = $worklog[0];
                $this->data['persons'] = $persons;
                $this->data['repairs'] = $repairs;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['WORKLOG']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['WORKLOG']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
                $this->state = false;
            }
        }
        else {
            $this->state = false;
        }

        return $this;
    }


































    function deleteRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('WorkLog_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['WORKLOG']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['WORKLOG']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('An error occured while deleting record')->gen();
                $this->state = false;
            }

        }

        return $this;
    }

    /**
     * create new record
     * @return void
     */
    function createNewRecord() {
        global $ERROR_CODES, $Errors;

        if (empty($this->params['personId'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['CREATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['CREATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        if (empty($this->params['repairId'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['CREATE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['CREATE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('repairId')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('WorkLog_Model');
            $createResults = $this->model->createNewRecord($this->params);

            // check result
            if ($createResults['state'] && is_numeric($createResults['newID'])) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['WORKLOG']['CREATE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['WORKLOG']['CREATE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('phone')->setErrorDetails('phone parameter is required in order to update person data')->gen();
                $this->state = false;
            }
        }

        return $this;
    }


    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['personId'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['UPDATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['UPDATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        if (!isset($this->params['repairId'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['UPDATE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['UPDATE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('repairId')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('WorkLog_Model');
            $columnsToUpdate = [
                'personId' => ['i', $this->params['personId']],
                'repairId' => ['i', $this->params['repairId']],
                'date' => ['s', $this->params['date']],
                'startHour' => ['s', $this->params['startHour']],
                'endHour' => ['s', $this->params['endHour']],
                'isPaid' => ['s', $this->params['isPaid']],
                'comment' => ['s', isset($this->params['comment'])?$this->params['comment']:''],
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

    /**
     * set worklog paid or not
     * @return void
     */
    function setWorklogPaid()
    {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['WORKLOG']['UPDATE_IS_PAID']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['UPDATE_IS_PAID']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
            return $this;
        }

        // update data
        $this->setModel('WorkLog_Model');
        $columnsToUpdate = [
            'isPaid' => ['s', $this->params['isPaid']],
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
}
