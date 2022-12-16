import flatpickr from "flatpickr";
(function () {
    "use strict";
    let registerForm = document.getElementById("registerForm");
    addFormSubmitListener(registerForm, triggerInputChangeEvent);
    let today = new Date();
    let picker = flatpickr("#tanggalLahir", {
        altInput: true,
        onValueUpdate: flatpickrValidateRequired,
        minDate: new Date(1940, 1, 1),
        maxDate: new Date(today.getFullYear() - 7, today.getMonth(), today.getDay())
    });
})();
function addFormSubmitListener(form, hook) {
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
function flatpickrValidateRequired(dates, currentDateString, self, data) {
    if (self.input.validity.valid) {
        self.input.classList.add("is-valid");
        self.input.classList.remove("is-invalid");
        self.altInput?.classList.add("is-valid");
        self.altInput?.classList.remove("is-invalid");
        return;
    }
    self.input.classList.add("is-invalid");
    self.input.classList.remove("is-valid");
    self.altInput?.classList.add("is-invalid");
    self.altInput?.classList.remove("is-valid");
}
function triggerInputChangeEvent() {
    let picker = document.getElementById("tanggalLahir")._flatpickr;
    picker?.updateValue(true);
    let inputList = document.getElementsByClassName("form-check-input");
    Array
        .prototype
        .slice
        .call(inputList)
        .forEach(function (input) {
        if (input.type == "radio") {
            input.dispatchEvent(new Event("change"));
        }
    });
}
