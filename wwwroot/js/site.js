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

function flatpickrValidateRequired(dates, currentDateString, self, data) {
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
