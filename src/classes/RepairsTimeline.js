import Request from '../helpers/Request.js';
import {API_ENDPOINTS} from '../settings/API.js';

class RepairsTimeline {
    data = []

    #API_ENDPOINTS = {
        CONTROLLER: API_ENDPOINTS.REPAIRS_TIMELINE.CONTROLLER,
        METHODS: API_ENDPOINTS.REPAIRS_TIMELINE.METHODS
    }

    constructor() {}

    /**
     * Update repair timeline comment
     * @param _recordId {number}
     * @param _comment {string}
     * @return {Promise<object>}
     */
    async updateRepairTimelineComment(_recordId, _comment) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.UPDATE_REPAIR_TIMELINE_COMMENT,
            params: {
                timelineID: _recordId,
                comment: _comment
            }
        }
        return await Request.send(data)
    }

    /**
     * Add new repair timeline comment
     * @param _repairId {number}
     * @param _comment {string}
     * @return {Promise<object>}
     */
    async addNewRepairTimelineComment(_repairId, _comment) {
        const data = {
            controller: this.#API_ENDPOINTS.CONTROLLER,
            method: this.#API_ENDPOINTS.METHODS.ADD_NEW_REPAIR_TIMELINE_COMMENT,
            params: {
                repairID: _repairId,
                comment: _comment
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
            method: this.#API_ENDPOINTS.METHODS.DELETE_REPAIR_TIMELINE,
            params: {
                timelineID: _recordId
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
}

export default new RepairsTimeline()
