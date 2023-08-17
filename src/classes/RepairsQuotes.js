import Request from '../helpers/Request.js';
import {API_ENDPOINTS} from '../settings/API.js';

class RepairsQuotes {
    data = []

    #API_ENDPOINTS = {
        CONTROLLER: API_ENDPOINTS.REPAIRS_QUOTES.CONTROLLER,
        METHODS: API_ENDPOINTS.REPAIRS_QUOTES.METHODS
    }

    constructor() {}

    async fetchDataFromServer() {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.GET_ALL_RECORDS,
        }
        const response = await Request.send(data)
        if (response.state) {
            this.data = response.data
            return response
        }
    }

    /**
     * Get record data
     * @param _recordId {number}
     * @return {Promise<object>}
     */
    async getRecordData(_recordId) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.GET_RECORD_DATA,
            params: {
                id: _recordId
            }
        }
        return await Request.send(data)
    }

    /**
     * Get record data by key and value
     * Example: Get record data where repairId = 15
     * @param _key {string} E.g. repairId
     * @param _value {string} E.g. 15
     * @return {Promise<object>}
     */
    async getRecordDataByKeyAndValue(_key, _value) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.GET_RECORD_DATA_BY_KEY_AND_VALUE,
            params: {
                id: '',
                key: _key,
                value: _value
            }
        }
        return await Request.send(data)
    }


    /**
     * Update record data
     * @param _recordId {number}
     * @param _newRecordData {object}
     * @return {Promise<object>}
     */
    async updateRecordData(_recordId, _newRecordData) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.UPDATE_RECORD_DATA,
            params: {
                id: _recordId,
                ..._newRecordData
            }
        }
        return await Request.send(data)
    }

    /**
     * Update record data
     * @param _newRecordData {object}
     * @return {Promise<object>}
     */
    async addNewRecord(_newRecordData) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.ADD_NEW_RECORD,
            params: {
                ..._newRecordData
            }
        }
        return await Request.send(data)
    }

    /**
     * Delete record
     * @param _recordId {number}
     * @return {Promise<object>}
     */
    async deleteRecord(_recordId) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.DELETE_RECORD,
            params: {
                id: _recordId
            }
        }
        return await Request.send(data)
    }
}

export default new RepairsQuotes()
