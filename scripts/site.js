"use strict";
(function () {
    "use strict";
    let registerForm = document.getElementById("registerForm");
    addFormSubmitListener(registerForm);
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
