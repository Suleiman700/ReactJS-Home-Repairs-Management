<?php

class RepairsQuotes_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    /**
     * get persons from DB
     */
    function getAllRecords()
    {
        $this->setModel('RepairsQuotes_Model');
        $repairs = $this->model->getAllRecords();

        // check for errors
        if (empty($repairs->errors)) {
            $this->state = true;
            $this->data = $repairs;
        }
        else {
            $this->state = false;
        }

        return $this;
    }

    /**
     * get record data by its ID
     * @return $this
     */
    function getRecordData() {

        global $ERROR_CODES, $Errors;
        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['NAME'];
            $errorCode = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // get record data
            $this->setModel('RepairsQuotes_Model');
            $filterParams = [
                'id' => $this->params['id']
            ];
            $doesExist = $this->model->filter($filterParams);
            if (!empty($doesExist)) {
                $this->state = true;
                $this->data = $doesExist[0];
            }
            else {
                // store error
                $errorText = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    /**
     * Get record data by key and value
     * Example: Get record data where repairId = 15
     * @return $this
     */
    function getRecordDataByKeyAndValue() {

        global $ERROR_CODES, $Errors;
//        if (!isset($this->params['id'])) {
//            // store error
//            $errorText = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['NAME'];
//            $errorCode = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['CODE'];
//            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
//            $this->state = false;
//        }

        // check errors
        if (empty($this->errors)) {
            // get record data
            $this->setModel('RepairsQuotes_Model');
            $filterParams = [
                $this->params['key'] => $this->params['value']
            ];
            $doesExist = $this->model->filter($filterParams);
            if (!empty($doesExist)) {
                $this->state = true;
                $this->data[] = $doesExist[0];
            }
            else {
                // store error
                $errorText = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id']) || empty($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['QUOTES']['UPDATE']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['NAME'];
            $errorCode = $ERROR_CODES['QUOTES']['UPDATE']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('name')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('RepairsQuotes_Model');
            $columnsToUpdate = [
                'person_id' => ['s', isset($this->params['person_id'])?$this->params['person_id']:''],
                'name' => ['s', isset($this->params['name'])?$this->params['name']:''],
                'description' => ['s', isset($this->params['description'])?$this->params['description']:''],
                'price' => ['s', isset($this->params['price'])?$this->params['price']:''],
                'comment' => ['s', isset($this->params['comment'])?$this->params['comment']:''],
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

    function deleteRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id']) || empty($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['QUOTES']['DELETE']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['NAME'];
            $errorCode = $ERROR_CODES['QUOTES']['DELETE']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('RepairsQuotes_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['QUOTES']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['QUOTES']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('An error occured while deleting record')->gen();
                $this->state = false;
            }

        }

        return $this;
    }

    /**
     * Add new record
     * @return void
     */
    function addNewRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['name'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['CREATE']['MISSING_REQUEST_PARAMS']['NAME']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['CREATE']['MISSING_REQUEST_PARAMS']['NAME']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('name')->setErrorDetails('name parameter is required in order to create record')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('RepairsQuotes_Model');
            $createResults = $this->model->addNewRecord($this->params);

            // check result
            if ($createResults['state'] && is_numeric($createResults['newID'])) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['REPAIRS']['CREATE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['CREATE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('phone')->setErrorDetails('phone parameter is required in order to update person data')->gen();
                $this->state = false;
            }
        }

        return $this;
    }



















    /**
     * get repair quotes
     * @return void
     */
    function getRepairQuotes() {
        global $ERROR_CODES, $Errors;
        if (!isset($this->params['repairID'])) {
            // store error
            $errorText = $ERROR_CODES['QUOTES']['GET_REPAIR_QUOTES']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['NAME'];
            $errorCode = $ERROR_CODES['QUOTES']['GET_REPAIR_QUOTES']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('RepairsQuotes_Model');
            $filterParams = [
                'repairID' => $this->params['repairID']
            ];
            $doesExist = $this->model->filter($filterParams);
            $this->state = true;
            if (!empty($doesExist)) {
                $this->state = true;
                $this->data = $doesExist;
            }
            else {
//                // store error
//                $errorText = $ERROR_CODES['QUOTES']['GET_REPAIR_QUOTES']['RESULTS']['NO_RESULTS']['NAME'];
//                $errorCode = $ERROR_CODES['QUOTES']['GET_REPAIR_QUOTES']['RESULTS']['NO_RESULTS']['CODE'];
//                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
//                $this->state = false;
            }
        }

        return $this;
    }


    /**
     * check if record exists by its ID, also stores person data if found
     * @return $this
     */
    function doesRecordExistByID() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['NAME'];
            $errorCode = $ERROR_CODES['QUOTES']['GET']['MISSING_REQUEST_PARAMS']['QUOTE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('RepairsQuotes_Model');
            $filterParams = [
                'id' => $this->params['id']
            ];
            $doesExist = $this->model->filter($filterParams);
            if (!empty($doesExist)) {
                $this->state = true;
                $this->data = $doesExist[0];
            }
            else {
                // store error
                $errorText = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['QUOTES']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function testFailureMethod()
    {
        global $Errors, $ERROR_CODES;

        if (!isset($this->params['userId'])) {
            // store error
            $errorText = $ERROR_CODES['TEST']['MISSING_REQUEST_PARAMS']['USER_ID']['NAME'];
            $errorCode = $ERROR_CODES['TEST']['MISSING_REQUEST_PARAMS']['USER_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('langCode')->setErrorDetails('')->gen();
        }

        // check for errors
        if (empty($this->errors)) {
            $this->state = true;
        }
        else {
            $this->state = false;
        }

        return $this;
    }
}
