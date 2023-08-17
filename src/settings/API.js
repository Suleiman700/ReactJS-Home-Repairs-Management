
export const API_ENDPOINTS = {
    PEOPLE: {
        CONTROLLER: 'Persons_Controller',
        METHODS: {
            GET_ALL_RECORDS: 'getAllRecords',
            GET_RECORD_DATA: 'getRecordData',
            UPDATE_RECORD_DATA: 'updateRecordData',
            ADD_NEW_RECORD: 'addNewRecord',
            DELETE_RECORD: 'deleteRecord',
        },
    },
    REPAIRS: {
        CONTROLLER: 'Repairs_Controller',
        METHODS: {
            GET_ALL_RECORDS: 'getAllRecords',
            GET_RECORD_DATA: 'getRecordData',
            GER_RECORD_AND_RELATED_DATA: 'getRecordAndRelatedData',
            UPDATE_RECORD_DATA: 'updateRecordData',
            ADD_NEW_RECORD: 'addNewRecord',
            DELETE_RECORD: 'deleteRecord',
        },
    },
    REPAIRS_TIMELINE: {
        CONTROLLER: 'Repairs_Controller',
        METHODS: {
            UPDATE_REPAIR_TIMELINE_COMMENT: 'updateRepairTimelineComment',
            ADD_NEW_REPAIR_TIMELINE_COMMENT: 'addNewRepairTimelineComment',
            DELETE_REPAIR_TIMELINE: 'deleteRepairTimeline',
        },
    },
    REPAIRS_QUOTES: {
        CONTROLLER: 'RepairsQuotes_Controller',
        METHODS: {
            GET_ALL_RECORDS: 'getAllRecords',
            GET_RECORD_DATA: 'getRecordData',
            GET_RECORD_DATA_BY_KEY_AND_VALUE: 'getRecordDataByKeyAndValue',
            UPDATE_RECORD_DATA: 'updateRecordData',
            ADD_NEW_RECORD: 'addNewRecord',
            DELETE_RECORD: 'deleteRecord',
        },
    },
    PAYMENTS: {
        CONTROLLER: 'Payments_Controller',
        METHODS: {
            GET_ALL_RECORDS_AND_RELATED_DATA: 'getAllRecordsAndRelatedData',
            GER_RECORD_AND_RELATED_DATA: 'getRecordAndRelatedData',
            UPDATE_RECORD_DATA: 'updateRecordData',
            ADD_NEW_RECORD: 'addNewRecord',
            DELETE_RECORD: 'deleteRecord',
        },
    },
    WORKLOG: {
        CONTROLLER: 'WorkLog_Controller',
        METHODS: {
            GET_ALL_RECORDS_AND_RELATED_DATA: 'getAllRecordsAndRelatedData',
            GER_RECORD_AND_RELATED_DATA: 'getRecordAndRelatedData',
            UPDATE_RECORD_DATA: 'updateRecordData',
            CREATE_NEW_RECORD: 'createNewRecord',
            DELETE_RECORD: 'deleteRecord',
        },
    },
    DEBTS: {
        CONTROLLER: 'Debts_Controller',
        METHODS: {
            GET_PERSON_DEBT_ITEMS: 'getPersonDebtItems',
        },
    },
}
