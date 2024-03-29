﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

function addFormSubmitListener(form, hook, inputMasks) {
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
function flatpickrUpdateValidStatus(dates, currentDateString, self, data) {
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
function triggerInputChangeEvent(inputMasks) {
    let picker = document.getElementById("tanggalLahir")._flatpickr;
    picker?.updateValue(true);
    inputMasks?.forEach(function (input) {
        imaskUpdateValidStatus(input);
    });
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
function radioInputAttachValidationHook() {
    let inputList = document.getElementsByClassName("form-check-input");
    Array
        .prototype
        .slice
        .call(inputList)
        .forEach(function (input) {
        if (input.type == "radio") {
            input.addEventListener("change", function (event) {
                radioInputUpdateValidStatus(input);
            });
        }
    });
}
function fetchSelectList(url, elementId, params) {
    axios
        .get(url, {
        params: params
    })
        .then(function (response) {
        let list = response.data;
        let select = document.getElementById(elementId);
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
    fetchSelectList("/api/List/Provinsi", "provinsi");
}
function fetchKabupatenKota(kodeProvinsi) {
    fetchSelectList("/api/List/KabupatenKotaByProvinsi", "kabupatenKota", kodeProvinsi);
}
function selectProvinsiAttachChangeHook() {
    let select = document.getElementById("provinsi");
    select.addEventListener("change", function (event) {
        let kodeProvinsi = parseInt(select.value);
        if (kodeProvinsi != 0) {
            fetchKabupatenKota({ kodeProvinsi: kodeProvinsi });
        }
    }, false);
}
function initPhoneMaskInput() {
    let input = document.getElementById("phone");
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
function initPostalCodeMaskInput() {
    let input = document.getElementById("postalCode");
    let postalMask = IMask(input, {
        mask: '00000',
        lazy: false,
        placeholderChar: '#'
    });
    postalMask.on("accept", function () {
        imaskUpdateValidStatus(postalMask);
    });
    return postalMask;
}
function imaskUpdateValidStatus(imask) {
    let element = imask.el;
    let input = element.input;
    if (imask.masked.isComplete || !input.required) {
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
