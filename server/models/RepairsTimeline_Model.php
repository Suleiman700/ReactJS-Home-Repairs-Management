<?php

class RepairsTimeline_Model extends Model
{
    function __construct()
    {
        $this->db = new DB();
        $this->table = "repairs_timeline";
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
            'repairID' => ['i']
        );
        return parent::filter($_params, $array_search);
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
     * create new record
     * @param array $_personData - E.g. {name: '', description: '', ...etc}
     * @return array
     */
    function createNewRecord(array $_data)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        // prepare default customer data array
        $personColumn = $this->createDefaultColumns($_data);
        $createdResult = $this->db->insert($personColumn, $this->table);

        if (isset($createdResult) && is_numeric($createdResult)) {
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

    /**
     * get language translations
     * @return Repairs_Model
     */
    public function getRepairs() {
        global $ERROR_CODES, $Errors;

        $data = $this->db->mysqli->query("SELECT * FROM $this->table")->fetch_all(MYSQLI_ASSOC);

        if (!$data || empty($data)) {
            $errorText = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
            $errorCode = $ERROR_CODES['REPAIRS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
            return $this;
        } else {
            return $data;
        }
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


    private function createDefaultColumns(array $_yourColumns): array
    {
        date_default_timezone_set('Asia/Jerusalem');
        
        $defaultColumns = [
            'repairID' => ['i', isset($_yourColumns['repairID'])?$_yourColumns['repairID']:''],
            'comment' => ['s', isset($_yourColumns['comment'])?$_yourColumns['comment']:''],
            'created_at' => ['s', date('Y-m-d H:i:s')],
        ];

        return $defaultColumns;
    }

}

?>