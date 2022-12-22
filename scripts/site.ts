import flatpickr from "flatpickr";
import HTMLElement from "flatpickr/dist/types/globals";
import axios from "axios";
import IMask, { AnyMaskedOptions, HTMLMaskElement } from 'imask';

type SelectData = {
    kode: number,
    nama: string
};

(function () {
    "use strict";

    let registerForm = document.getElementById("registerForm") as HTMLFormElement;
    addFormSubmitListener(registerForm, triggerInputChangeEvent);
    radioInputAttachValidationHook();
    selectProvinsiAttachChangeHook();

    let today = new Date();
    let picker = flatpickr(
        "#tanggalLahir",
        {
            altInput: true,
            onValueUpdate: flatpickrUpdateValidStatus,
            onClose: flatpickrUpdateValidStatus,
            minDate: new Date(today.getFullYear() - 90, today.getMonth(), today.getDay()),
            maxDate: new Date(today.getFullYear() - 7, today.getMonth(), today.getDay())
        });

    fetchProvinsi();
})();

function addFormSubmitListener<T extends AnyMaskedOptions>(
    form: HTMLFormElement,
    hook?: (inputMasks?: IMask.InputMask<T>[]) => void,
    inputMasks?: IMask.InputMask<T>[]) {
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (hook != null) {
            hook(inputMasks);
        }

        form.classList.add("was-validated");
    }, false);
}

function flatpickrUpdateValidStatus(
    dates: Date[],
    currentDateString: string,
    self: flatpickr.Instance,
    data?: any) {
    if (!self.input.required || self.selectedDates.length != 0) {
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

function fetchSelectList<T extends SelectData>(url: string, elementId: string, params?: any) {
    axios
        .get(
            url,
            {
                params: params
            })
        .then(function (response) {
            let list = response.data as T[];
            let select = document.getElementById(elementId) as HTMLSelectElement;
            select.length = 1;
            select.selectedIndex = 0;

            list.map(item => select
                .appendChild(new Option(item.nama, item.kode.toString()))
                .cloneNode(true));
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
}

function fetchProvinsi() {
    fetchSelectList<SelectData>("/api/List/Provinsi", "provinsi");
}

function fetchKabupatenKota(kodeProvinsi: object) {
    fetchSelectList<SelectData>("/api/List/KabupatenKotaByProvinsi", "kabupatenKota", kodeProvinsi);
}

function selectProvinsiAttachChangeHook() {
    let select = document.getElementById("provinsi") as HTMLSelectElement;

    select.addEventListener("change", function (event) {
        let kodeProvinsi = parseInt(select.value);

        if (kodeProvinsi != 0) {
            fetchKabupatenKota({ kodeProvinsi: kodeProvinsi });
        }
    }, false);
}

function setPhoneMask() {
    let input = document.getElementById("phone") as HTMLInputElement;
    let phoneMask = IMask(input, {
        mask: '+{62}-000-0000-00[000]',
        lazy: false,
        placeholderChar: '#'
    });

    phoneMask.on("accept", function () {
        imaskUpdateValidStatus(phoneMask);
    });

    return phoneMask;
}

function imaskUpdateValidStatus<T extends AnyMaskedOptions>(imask: IMask.InputMask<T>) {
    let element = imask.el as HTMLMaskElement;
    let input = element.input as HTMLInputElement;

    if (imask.masked.isComplete) {
        input.parentElement?.classList.add("is-valid");
        input.parentElement?.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.setCustomValidity("");
        return;
    }

    input.parentElement?.classList.add("is-invalid");
    input.parentElement?.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.setCustomValidity("Error");
}
