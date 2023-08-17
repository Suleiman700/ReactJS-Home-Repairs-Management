<?php

class Repairs_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    /**
     * Get all records
     */
    function getAllRecords()
    {

        $this->setModel('Repairs_Model');
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
            $errorText = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Repairs_Model');
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
                $errorText = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }




    /**
     * get record data by its ID and all its related data like persons, repair timeline ...etc
     * @return $this
     */
    function getRecordAndRelatedData() {

        global $ERROR_CODES, $Errors;
        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // Get record data
            $this->setModel('Repairs_Model');
            $filterParams = [
                'id' => $this->params['id']
            ];
            $repairData = $this->model->filter($filterParams);

            // Get persons data
            $this->setModel('Persons_Model');
            $persons = $this->model->getPersons();

            // Get repair timeline
            $this->setModel('RepairsTimeline_Model');
            $filterParams = [
                'repairID' => $this->params['id']
            ];
            $repairTimeline = $this->model->filter($filterParams);

            // Get repair quotes
            $this->setModel('RepairsQuotes_Model');
            $filterParams = [
                'repairID' => $this->params['id']
            ];
            $repairQuotes = $this->model->filter($filterParams);

            // Get repair payments
            $this->setModel('Payments_Model');
            $filterParams = [
                'repairID' => $this->params['id']
            ];
            $repairPayments = $this->model->filter($filterParams);

            if (!empty($repairData)) {
                $this->state = true;
                $this->data['repairData'] = $repairData[0];
                $this->data['persons'] = $persons;
                $this->data['repairTimeline'] = $repairTimeline;
                $this->data['repairQuotes'] = $repairQuotes;
                $this->data['repairPayments'] = $repairPayments;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function updateRecordData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['name']) || empty($this->params['name'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['UPDATE']['MISSING_REQUEST_PARAMS']['NAME']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['UPDATE']['MISSING_REQUEST_PARAMS']['NAME']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('name')->setErrorDetails('name parameter is required in order to update person data')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Repairs_Model');
            $columnsToUpdate = [
                'name' => ['s', $this->params['name']],
                'description' => ['s', isset($this->params['description'])?$this->params['description']:''],
                'isCompleted' => ['s', isset($this->params['isCompleted'])?$this->params['isCompleted']:''],
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
     * Add new record
     * @return void
     */
    function addNewRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['name']) || empty($this->params['name'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['CREATE']['MISSING_REQUEST_PARAMS']['NAME']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['CREATE']['MISSING_REQUEST_PARAMS']['NAME']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('name')->setErrorDetails('name parameter is required in order to create record')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update data
            $this->setModel('Repairs_Model');
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

    function deleteRecord() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['DELETE']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // delete record
            $this->setModel('Repairs_Model');
            $isDeleted = $this->model->deleteRecord($this->params['id']);
            if ($isDeleted) {
                $this->state = true;
            }
            else {
                // store error
                $errorText = $ERROR_CODES['REPAIRS']['DELETE']['QUERY_RESULTS']['FAILED']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['DELETE']['QUERY_RESULTS']['FAILED']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('An error occured while deleting record')->gen();
                $this->state = false;
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
            $errorText = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Repairs_Model');
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
                $errorText = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }


    function getRepairTimeline()
    {
        global $ERROR_CODES, $Errors;
        if (!isset($this->params['repairID'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['GET_TIMELINE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET_TIMELINE']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('RepairsTimeline_Model');
            $filterParams = [
                'repairID' => $this->params['repairID']
            ];
            $data = $this->model->filter($filterParams);
            $this->state = true;
            if (!empty($data)) {
                $this->state = true;
                $this->data = $data;
            }
            else {
//                // store error
//                $errorText = $ERROR_CODES['REPAIRS']['GET_TIMELINE']['RESULTS']['NO_RESULTS']['NAME'];
//                $errorCode = $ERROR_CODES['REPAIRS']['GET_TIMELINE']['RESULTS']['NO_RESULTS']['CODE'];
//                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
//                $this->state = false;
            }
        }

        return $this;
    }

    function getRepairData() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['id'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['GET_DATA']['MISSING_REQUEST_PARAMS']['ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET_DATA']['MISSING_REQUEST_PARAMS']['ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // check if person exist in DB
            $this->setModel('Repairs_Model');
            $filterParams = [
                'id' => $this->params['id']
            ];
            $doesExist = $this->model->filter($filterParams);
            if (!empty($doesExist)) {
                $this->state = true;
                $this->data['repairData'] = $doesExist[0];

                // get repair quotes
                $this->setModel('RepairsQuotes_Model');
                $filterParams = [
                    'repairID' => $this->params['id']
                ];
                $repairQuotes = $this->model->filter($filterParams);
                if (!empty($repairQuotes)) {
                    $this->data['repairQuotes'] = $repairQuotes;
                }

                // get repair timeline
                $this->setModel('RepairsTimeline_Model');
                $filterParams = [
                    'repairID' => $this->params['id']
                ];
                $repairTimeline = $this->model->filter($filterParams);
                if (!empty($repairQuotes)) {
                    $this->data['repairTimeline'] = $repairTimeline;
                }
            }
            else {
                // store error
                $errorText = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
                $errorCode = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
                $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('Could not find person in DB with id ['.$this->params['id'].']')->gen();
                $this->state = false;
            }
        }

        return $this;
    }

    function updateRepairTimelineComment() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['timelineID'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('timelineID')->setErrorDetails('')->gen();
            $this->state = false;
        }

        if (!isset($this->params['comment'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['COMMENT']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['UPDATE_TIMELINE']['MISSING_REQUEST_PARAMS']['COMMENT']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('comment')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('RepairsTimeline_Model');
            $columnsToUpdate = [
                'comment' => ['s', $this->params['comment']]
            ];
            $updateResult = $this->model->updateRecordData($this->params['timelineID'], $columnsToUpdate);

            // check result
            if (isset($updateResult) && ($updateResult == true || $updateResult == 1)) {
                $this->state = true;
            }
            else {
                $this->state = false;
            }
        }
    }

    function deleteRepairTimeline()
    {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['timelineID'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['DELETE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['DELETE_TIMELINE']['MISSING_REQUEST_PARAMS']['TIMELINE_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('id')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('RepairsTimeline_Model');
            $deleteResult = $this->model->deleteRecord($this->params['timelineID']);

            // check result
            if (isset($deleteResult) && ($deleteResult == true || $deleteResult == 1)) {
                $this->state = true;
            }
            else {
                $this->state = false;
            }
        }
    }

    function addNewRepairTimelineComment() {
        global $ERROR_CODES, $Errors;

        if (!isset($this->params['repairID'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['REPAIR_ID']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('repairID')->setErrorDetails('')->gen();
            $this->state = false;
        }

        if (!isset($this->params['comment'])) {
            // store error
            $errorText = $ERROR_CODES['REPAIRS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['COMMENT']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['CREATE_TIMELINE_COMMENT']['MISSING_REQUEST_PARAMS']['COMMENT']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('comment')->setErrorDetails('')->gen();
            $this->state = false;
        }

        // check errors
        if (empty($this->errors)) {
            // update timeline comment
            $this->setModel('RepairsTimeline_Model');
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
