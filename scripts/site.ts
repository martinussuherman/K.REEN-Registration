(function () {
    "use strict";

    let registerForm = document.getElementById("registerForm") as HTMLFormElement;
    addFormSubmitListener(registerForm);
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
