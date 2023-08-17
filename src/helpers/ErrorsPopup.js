import Swal from 'sweetalert2';

class ErrorsPopup {
    title = 'Error'
    html = ''

    constructor() {}

    show() {
        console.log(this.html)

        Swal.fire({
            icon: "error",
            title: this.title,
            html: `
                <div style="display: flex; flex-direction: column;">
                    ${this.html}
                </div>
            `,
            buttons: false,
            allowOutsideClick: true,
            showConfirmButton: true,
        });
    }

    closeLoader() {
        Swal.close()
    }
}

export default new ErrorsPopup()
