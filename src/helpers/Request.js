// Request.js
import axios from 'axios';
import Swal from 'sweetalert2';

class Request {
    endpoint = process.env.REACT_APP_API_ENDPOINT;

    constructor() {}

    async send(_data) {
        // check data
        if (_data === undefined || _data.controller === undefined || _data.method === undefined) {
            Swal.fire({
                title: 'Error',
                text: 'Please make sure to pass controller and method',
                icon: 'error',
            });
        }
        else {
            try {
                const response = await axios({
                    url: this.endpoint,
                    params: {
                        controller: _data.controller,
                        method: _data.method,
                        params: _data.params??{},
                    },
                });

                if (!response.data.state) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: response.data.errors.map(error => {
                            return `
                                <div>${error.errorText}</div>
                                <hr style="margin: 10px 0;" />
                                <div><strong>Error Code:</strong> ${error.errorCode}</div>
                                ${(error.errorVariable !== undefined)? `<div><strong>Parameter:</strong> ${error.errorVariable}</div>`:''}
                                <div><strong>TraceID:</strong> ${error.errorTraceID}</div>
                            `
                        }),
                        confirmButtonText: 'Close'
                    });
                    return response.data
                }

                return response.data;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    const { message, errorCode } = error.response.data.errors[0];
                    // Show the error message using SweetAlert
                    Swal.fire({
                        title: 'Error',
                        html: `
                            ${message}
                            <strong>${errorCode}</strong>
                        `,
                        icon: 'error',
                    });
                    // throw new Error(`Request failed: ${message}`);
                } else {
                    // For other types of errors (non-500 errors or no specific error format), you can handle them here
                    console.log('Unknown Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An unknown error occurred. Please try again.',
                        icon: 'error',
                    });
                    // throw new Error('An unknown error occurred. Please try again.');
                }
            }
        }
    }
}

export default new Request();
