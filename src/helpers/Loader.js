import Swal from 'sweetalert2';

class Loader {
    title = 'Please Wait'
    html = 'Loading Data...'
    showLoadingIcon = true

    constructor() {}

    showLoader() {
        Swal.fire({
            icon: "info",
            title: this.title,
            html: this.html,
            buttons: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                if (this.showLoadingIcon) Swal.showLoading();
            },
        });
    }

    closeLoader() {
        Swal.close()
    }
}

export default new Loader()
