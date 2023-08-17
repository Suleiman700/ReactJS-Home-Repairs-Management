<?php

class WorkLog_Model extends Model
{
    function __construct()
    {
        $this->db = new DB();
        $this->table = "work_log";
    }

    /**
     * search for data
     * @param array $_params
     * @param array $array_search
     * @return array|string
     */
    public function filter($_params = [], $array_search = [])
    {
        $array_search = array(
            'id' => ['s']
        );
        return parent::filter($_params, $array_search);
    }

    /**
     * get language translations
     * @return Repairs_Model
     */
    public function getWorkLogs() {
        global $ERROR_CODES, $Errors;

        $data = $this->db->mysqli->query("SELECT * FROM $this->table")->fetch_all(MYSQLI_ASSOC);

        if (!$data || empty($data)) {
            $errorText = $ERROR_CODES['WORKLOG']['GET']['RESULTS']['NO_RESULTS']['NAME'];
            $errorCode = $ERROR_CODES['WORKLOG']['GET']['RESULTS']['NO_RESULTS']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
            return $this;
        } else {
            return $data;
        }
    }

    /**
     * update record specific columns
     * @param $_ID - E.g. 1
     * @param array $_columnsToUpdate
     * Pass the columns you want to update
     * $columnsToUpdate = [
     *      'name' => ['s', 'New Name']
     * ];
     * @return $this
     */
    function updateRecordData($_ID, array $_columnsToUpdate)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        return $this->db->update($_columnsToUpdate, $this->table, " WHERE id='$_ID'");
    }

    /**
     * delete record from DB
     * @param $_ID - E.g. 1
     * @return bool
     */
    public function deleteRecord($_ID) {
        global $ERROR_CODES, $Errors;

        $deleteResponse = $this->db->mysqli->query("DELETE FROM $this->table WHERE id = '$_ID'");

        if (isset($deleteResponse) && ($deleteResponse == 1 || $deleteResponse == true)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * create new record
     * @param array $_personData - E.g. {name: '', description: '', ...etc}
     * @return array
     */
    function createNewRecord(array $_personData)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        // prepare default customer data array
        $personColumn = $this->createDefaultColumns($_personData);
        $createdResult = $this->db->insert($personColumn, $this->table);

        if (isset($createdResult) && is_numeric($createdResult) && $createdResult > 0) {
            return [
                'state' => true,
                'newID' => $createdResult
            ];
        }
        else {
            return [
                'state' => false,
            ];
        }
    }

    private function createDefaultColumns(array $_yourColumns): array
    {
        date_default_timezone_set('Asia/Jerusalem');

        $defaultColumns = [
            'personId' => ['i', isset($_yourColumns['personId'])?$_yourColumns['personId']:''],
            'repairId' => ['i', isset($_yourColumns['repairId'])?$_yourColumns['repairId']:''],
            'date' => ['s', isset($_yourColumns['date'])?$_yourColumns['date']:''],
            'startHour' => ['s', isset($_yourColumns['startHour'])?$_yourColumns['startHour']:''],
            'endHour' => ['s', isset($_yourColumns['endHour'])?$_yourColumns['endHour']:''],
            'isPaid' => ['s', isset($_yourColumns['isPaid'])?$_yourColumns['isPaid']:''],
            'comment' => ['s', isset($_yourColumns['comment'])?$_yourColumns['comment']:''],
            'created_at' => ['s', date('Y-m-d H:i:s')],
            'updated_at' => ['s', date('Y-m-d H:i:s')],
        ];

        return $defaultColumns;
    }

}

?>
