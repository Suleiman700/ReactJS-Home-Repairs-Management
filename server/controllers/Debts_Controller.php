<?php

class Debts_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    function getPersonDebtItems()
    {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['personId'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('')->gen();
            $this->state = false;
        }

        $this->setModel('Debts_Model');

        // get person debt items
        $searchArr = [
            'personId' => $this->params['personId'],
        ];
        $personDebtItems = $this->model->filter($searchArr);
        $this->data['debtItems'] = $personDebtItems;

        // Get person data
        $this->setModel('Persons_Model');
        $searchArr = [
            'id' => $this->params['personId'],
        ];
        $personData = $this->model->filter($searchArr);
        if (!empty($personData)) {
            $this->data['personData'] = $personData[0];
            $this->state = true;
        }
        else {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NOT_PERSON_FOUND']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NOT_PERSON_FOUND']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('Could not find person in DB with id ['.$this->params['personId'].']')->gen();
            $this->state = false;
        }
        return $this;
    }



















































    /**
     * get persons from DB
     */
    function getRecords()
    {

        $this->setModel('Debts_Model');
        $repairs = $this->model->getRecords();

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
     * check if record exists by its ID, also stores person data if found
     * @return $this
     */
    function doesRecordExistByID() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Debts_Model');
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
                $errorText = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
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
            $errorText = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Debts_Model');
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
                $errorText = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }


    function deleteRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('Debts_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['DEBTS']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['DEBTS']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
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
            $errorText = $ERROR_CODES['DEBTS']['CREATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['CREATE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('personId parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Debts_Model');
            $createResults = $this->model->createNewRecord($this->params);

            // check result
            if ($createResults['state'] && is_numeric($createResults['newID'])) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['DEBTS']['CREATE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['DEBTS']['CREATE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorDetails('Query failed')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['UPDATE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['UPDATE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('id parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            date_default_timezone_set('Asia/Jerusalem');

            // update data
            $this->setModel('Debts_Model');
            $columnsToUpdate = [
                'itemName' => ['s', $this->params['itemName']],
                'itemPrice' => ['s', $this->params['itemPrice']],
                'itemQuantity' => ['s', $this->params['itemQuantity']],
                'itemDescription' => ['s', $this->params['itemDescription']],
                'itemStatus' => ['s', $this->params['itemStatus']],
                'takenBy' => ['s', isset($this->params['takenBy'])?$this->params['takenBy']:''],
                'isPaid' => ['s', $this->params['isPaid']],
                'comment' => ['s', isset($this->params['comment'])?$this->params['comment']:''],
                'updated_at' => ['s', date('Y-m-d H:i:s')],
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

    function getTimeline()
    {
        global $ERROR_CODES, $Errors;
        if (!isset($this->params['personId'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['GET_TIMELINE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET_TIMELINE']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('DebtsTimeline_Model');
            $filterParams = [
                'personId' => $this->params['personId']
            ];
            $data = $this->model->filter($filterParams);
            $this->state = true;
            if (!empty($data)) {
                $this->state = true;
                $this->data = $data;
            }
            else {
//                // store error
//                $errorText = $ERROR_CODES['DEBTS']['GET_TIMELINE']['RESULTS']['NO_RESULTS']['NAME'];
//                $errorCode = $ERROR_CODES['DEBTS']['GET_TIMELINE']['RESULTS']['NO_RESULTS']['CODE'];
//                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
//                $this->state = false;
            }
        }

        return $this;
    }

    function deleteTimelineComment()
    {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['timelineId'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['DELETE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['DELETE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('timelineId')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('DebtsTimeline_Model');
            $deleteResult = $this->model->deleteRecord($this->params['timelineId']);

            // check result
            if (isset($deleteResult) && ($deleteResult == true || $deleteResult == 1)) {
                $this->state = true;
            }
            else {
                $this->state = false;
            }
        }
    }

    function updateTimelineComment() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['timelineId'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('timelineId')->setErrorDetails('')->gen();
            $this->state = false;
        }

        if (!isset($this->params['comment'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['COMMENT']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['COMMENT']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('DebtsTimeline_Model');
            $columnsToUpdate = [
                'comment' => ['s', $this->params['comment']]
            ];
            $updateResult = $this->model->updateRecordData($this->params['timelineId'], $columnsToUpdate);

            // check result
            if (isset($updateResult) && ($updateResult == true || $updateResult == 1)) {
                $this->state = true;
            }
            else {
                $this->state = false;
            }
        }
    }

    function addNewTimelineComment() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['personId'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['PERSON_ID']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['PERSON_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('personId')->setErrorDetails('')->gen();
            $this->state = false;
        }

        if (!isset($this->params['comment'])) {
            // store error
            $errorText = $ERROR_CODES['DEBTS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['COMMENT']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['COMMENT']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('comment')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('DebtsTimeline_Model');
            $createdResult = $this->model->createNewRecord($this->params);

            // check result
            if (isset($createdResult['state']) && ($createdResult['state'] == true || $createdResult['state'] == 1)) {
                $this->state = $createdResult['state'];
                $this->data['newID'] = $createdResult['newID'];
            }
            else {
                $this->state = false;
            }
        }

        return $this;
    }
}
