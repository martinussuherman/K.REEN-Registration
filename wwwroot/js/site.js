// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

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
function flatpickrUpdateValidStatus(dates, currentDateString, self, data) {
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
function radioInputUpdateValidStatus(input) {
    if (input.validity.valid) {
        input.parentElement?.parentElement?.classList.add("is-valid");
        input.parentElement?.parentElement?.classList.remove("is-invalid");
        return;
    }
    input.parentElement?.parentElement?.classList.add("is-invalid");
    input.parentElement?.parentElement?.classList.remove("is-valid");
}
