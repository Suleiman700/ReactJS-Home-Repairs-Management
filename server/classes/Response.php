<?php
Class Response
{
    public $data;
    public bool $state;
    public array $errors;
    
    function __construct() //init response obj with state false, status success, msg null
    {
        $this->state = false;
        return $this;
    }

    function setState($_state) //change the state of the response
    {
        $this->state = $_state;
        return $this;
    }

    function setData($_data) //change the message of the response
    {
        $this->data = $_data;
        return $this;
    }

    /**
     * set errors
     * @param array $_errors
     * @return $this
     */
    public function setErrors(array $_errors) {
        $this->errors = $_errors;
        return $this;
    }

    function renderToEncode($encode = true) //return the response as json if true, else return the raw response obj
    {

        // if(!DEBUG){
        //     ob_clean();
        // }

	    if($encode) return json_encode($this);
	    return $this;
    }

    function renderToDecode() //return the response
    {
        return $this;
    }
}

?>