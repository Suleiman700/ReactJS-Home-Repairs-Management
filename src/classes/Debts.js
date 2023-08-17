import Request from '../helpers/Request.js';
import {API_ENDPOINTS} from '../settings/API.js';

class Debts {
    data = []

    #API_ENDPOINTS = {
        CONTROLLER: API_ENDPOINTS.DEBTS.CONTROLLER,
        METHODS: API_ENDPOINTS.DEBTS.METHODS
    }

    constructor() {}

    /**
     * Get person debt items
     * @return {Promise<[{}]>}
     */
    async getPersonDebtItems(_personId) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.GET_PERSON_DEBT_ITEMS,
            params: {
                personId: _personId,
            }
        }
        return await Request.send(data)
    }

































    /**
     * Get record data and its related data
     * @param _recordId {number}
     * @return {Promise<object>}
     */
    async getRecordAndRelatedData(_recordId) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.GER_RECORD_AND_RELATED_DATA,
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
    async createNewRecord(_newRecordData) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.CREATE_NEW_RECORD,
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

export default new Debts()
