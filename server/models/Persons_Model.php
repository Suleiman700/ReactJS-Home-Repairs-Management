<?php

class Persons_Model extends Model
{
    function __construct()
    {
        $this->db = new DB();
        $this->table = "persons";
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
     * update person specific columns
     * @param $_personID - E.g. 1
     * @param array $_columnsToUpdate
     * Pass the columns you want to update
     * $columnsToUpdate = [
     *      'name' => ['s', 'New Name']
     * ];
     * @return $this
     */
    function updatePersonData($_personID, array $_columnsToUpdate)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        return $this->db->update($_columnsToUpdate, $this->table, " WHERE id='$_personID'");
    }

    /**
     * Create new record
     * @param array $_personData - E.g. {name: '', job: '', ...etc}
     * @return array
     */
    function createNewRecord(array $_personData)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        // prepare default customer data array
        $personColumn = $this->createDefaultColumns($_personData);
        $createdResult = $this->db->insert($personColumn, $this->table);

        if (isset($createdResult) && is_numeric($createdResult)) {
            return [
                'state' => true,
                'newId' => $createdResult
            ];
        }
        else {
            return [
                'state' => false,
            ];
        }
    }

    /**
     * check if langCode exists in database
     * @param string $_langCode
     * @return boolean
     */
    public function isLangCodeExist(string $_langCode)
    {
        $translationsData = $this->db->mysqli->query("SELECT $_langCode AS value FROM Translations");
        if (!empty($translationsData)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * get language translations
     * @return Persons_Model
     */
    public function getPersons() {
        global $ERROR_CODES, $Errors;

        $translationsData = $this->db->mysqli->query("SELECT * FROM $this->table")->fetch_all(MYSQLI_ASSOC);

        if (!$translationsData) {
            $errorText = $ERROR_CODES['PERSONS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
            $errorCode = $ERROR_CODES['PERSONS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
            return $this;
        } else {
            return $translationsData;
        }
    }

    /**
     * Delete record
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
        $defaultColumns = [
            'name' => ['s', isset($_yourColumns['name'])?$_yourColumns['name']:''],
            'job' => ['s', isset($_yourColumns['job'])?$_yourColumns['job']:''],
            'phone' => ['s', isset($_yourColumns['phone'])?$_yourColumns['phone']:''],
            'address' => ['s', isset($_yourColumns['address'])?$_yourColumns['address']:''],
        ];

        return $defaultColumns;
    }

}

?>
