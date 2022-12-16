import flatpickr from "flatpickr";

(function () {
    "use strict";

    let registerForm = document.getElementById("registerForm") as HTMLFormElement;
    addFormSubmitListener(registerForm);

    let picker = flatpickr(
        "#tanggalLahir",
        {
            altInput: true,
            onValueUpdate: flatpickrValidateRequired,
        });
})();

function addFormSubmitListener(form: HTMLFormElement, hook?: () => void) {
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (hook != null) {
            hook();
        }

        form.classList.add("was-validated");
    }, false);
}

function flatpickrValidateRequired(
    dates: Date[],
    currentDateString: string,
    self: flatpickr.Instance,
    data?: any) {
    if (!self.input.required) {
        return;
    }

    if (dates.length == 0) {
        self.input.classList.add("is-invalid");
        self.input.classList.remove("is-valid");
        self.altInput?.classList.add("is-invalid");
        self.altInput?.classList.remove("is-valid");
        return;
    }

    self.input.classList.add("is-valid");
    self.input.classList.remove("is-invalid");
    self.altInput?.classList.add("is-valid");
    self.altInput?.classList.remove("is-invalid");
}
