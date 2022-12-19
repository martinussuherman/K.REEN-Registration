import flatpickr from "flatpickr";
import HTMLElement from "flatpickr/dist/types/globals";

(function () {
    "use strict";

    let registerForm = document.getElementById("registerForm") as HTMLFormElement;
    addFormSubmitListener(registerForm, triggerInputChangeEvent);

    let today = new Date();
    let picker = flatpickr(
        "#tanggalLahir",
        {
            altInput: true,
            onValueUpdate: flatpickrUpdateValidStatus,
            minDate: new Date(1940, 1, 1),
            maxDate: new Date(today.getFullYear() - 7, today.getMonth(), today.getDay())
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

function flatpickrUpdateValidStatus(
    dates: Date[],
    currentDateString: string,
    self: flatpickr.Instance,
    data?: any) {
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
    let picker = (document.getElementById("tanggalLahir") as HTMLElement)._flatpickr;
    picker?.updateValue(true);

    let inputList = document.getElementsByClassName("form-check-input") as HTMLCollectionOf<HTMLInputElement>;

    Array
        .prototype
        .slice
        .call(inputList)
        .forEach(function (input: HTMLInputElement) {
            if (input.type == "radio") {
                input.dispatchEvent(new Event("change"));
            }
        });
}

function radioInputUpdateValidStatus(input: HTMLInputElement) {
    if (input.validity.valid) {
        input.parentElement?.parentElement?.classList.add("is-valid");
        input.parentElement?.parentElement?.classList.remove("is-invalid");
        return;
    }

    input.parentElement?.parentElement?.classList.add("is-invalid");
    input.parentElement?.parentElement?.classList.remove("is-valid");
}

function radioInputAttachValidationHook() {
    let inputList = document.getElementsByClassName("form-check-input") as HTMLCollectionOf<HTMLInputElement>;

    Array
        .prototype
        .slice
        .call(inputList)
        .forEach(function (input: HTMLInputElement) {
            if (input.type == "radio") {
                input.addEventListener("change", function (event) {
                    radioInputUpdateValidStatus(input);
                });
            }
        });
}
