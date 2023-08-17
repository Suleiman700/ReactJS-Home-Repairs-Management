<?php

class Stats_Controller extends Controller
{
    public function __construct($_params)
    {
        $this->params = $_params;
    }

    public function getAllData()
    {
        // get all repairs
        $this->setModel('Repairs_Model');
        $repairs = $this->model->getRepairs();

        // get all persons
        $this->setModel('Persons_Model');
        $persons = $this->model->getPersons();

        // get all payments
        $this->setModel('Payments_Model');
        $payments = $this->model->getRecords();

        // get all worklogs
        $this->setModel('WorkLog_Model');
        $worklogs = $this->model->getWorkLogs();

        // get all debts
        $this->setModel('Debts_Model');
        $debts = $this->model->getRecords();

        $this->data = [
            'repairs' => $repairs,
            'persons' => $persons,
            'payments' => $payments,
            'worklogs' => $worklogs,
            'debts' => $debts,
        ];

        $this->state = true;

        return $this;
    }
}
