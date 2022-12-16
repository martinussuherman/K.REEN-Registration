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
