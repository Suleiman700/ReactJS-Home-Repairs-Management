<?php

class Saving_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    public function getAllData()
    {
        global $ERROR_CODES, $Errors;

        // get all saving
        $this->setModel('Saving_Model');
        $saving = $this->model->getAllData();

        if (!$saving || empty($saving)) {
            $errorText = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['NAME'];
            $errorCode = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
            $this->state = false;
        }
        else {
            $this->data = $saving;
            $this->state = true;
        }

        return $this;
    }

    /**
     * check if record exists by its ID
     * @return $this
     */
    function doesRecordExistByID() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['SAVING']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['SAVING']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Saving_Model');
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
                $errorText = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
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
            $errorText = $ERROR_CODES['SAVING']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['SAVING']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // get record data
            $this->setModel('Saving_Model');
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
                $errorText = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['SAVING']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['SAVING']['UPDATE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['SAVING']['UPDATE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('id parameter is required in order to update data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Saving_Model');
            $columnsToUpdate = [
                'name' => ['s', $this->params['name']],
                'amount' => ['s', $this->params['amount']],
                'description' => ['s', isset($this->params['description'])?$this->params['description']:''],
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

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['SAVING']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['SAVING']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('Saving_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['SAVING']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['SAVING']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
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


        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Saving_Model');
            $createResults = $this->model->createNewRecord($this->params);

            // check result
            if ($createResults['state'] && is_numeric($createResults['newID'])) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['SAVING']['CREATE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['SAVING']['CREATE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
                $this->state = false;
            }
        }

        return $this;
    }
}
