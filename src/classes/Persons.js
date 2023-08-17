import Request from '../helpers/Request.js';
import {API_ENDPOINTS} from '../settings/API.js';

class Persons {
    data = []

    #API_ENDPOINTS = {
        CONTROLLER: API_ENDPOINTS.PEOPLE.CONTROLLER,
        METHODS: API_ENDPOINTS.PEOPLE.METHODS
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
            return this.data
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

export default new Persons()
