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
