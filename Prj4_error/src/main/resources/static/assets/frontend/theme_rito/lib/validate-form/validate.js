function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    let selectorRules = {};

    function validate(inputElement, rule) {
        let errorMessage;
        let errorElement = getParent(inputElement, options.formGroupSelector)?.querySelector(options.errorSelector);
        let rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                    const checkedInput = formElement.querySelector(rule.selector + ':checked');
                    if (!checkedInput) {
                        errorMessage = rules[i](null);
                    } else {
                        errorMessage = rules[i](checkedInput.value);
                    }
                    break;
                case 'checkbox':
                    const checkedCheckbox = inputElement.checked ? inputElement.value : null;
                    errorMessage = rules[i](checkedCheckbox);
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            if (errorMessage) break;
        }
        if (errorMessage) {
            if (errorElement) {
                errorElement.innerText = errorMessage;
            }
            inputElement.classList.add('invalid');
        } else {
            if (errorElement) {
                errorElement.innerText = '';
            }
            inputElement.classList.remove('invalid');
        }

        return !errorMessage;
    }

    let formElement = document.querySelector(options.form)
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            let isFormValid = true;
            options.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            })

            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    let enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    let formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value
                        switch (input.type) {
                            case 'radio':
                                const selectedRadio = formElement.querySelector('input[name="'+input.name+'"]:checked');
                                values[input.name] = selectedRadio ? selectedRadio.value : '';
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {})
                    options.onSubmit(formValues)
                }
            }
        }

        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            let inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
                inputElement.oninput = function () {
                    let errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.classList.remove('invalid');
                }
            })
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            if (selector === '[name=amount]') {
                const selectedRadio = document.querySelector(selector + ':checked');
                value = selectedRadio ? selectedRadio.value : null;
            }
            if (value === null || value === '') {
                return message || 'Vui lòng chọn mệnh giá';
            }
            return undefined;
        }
    }
}


Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Nhập tối thiểu ${min} kí tự`;
        }
    }
}

Validator.maxLength = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= max ? undefined : message || `Nhập tối đa ${max} kí tự`;
        }
    }
}

Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
