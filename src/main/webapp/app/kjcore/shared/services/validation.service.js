"use strict";
var ValidationService = (function () {
    function ValidationService() {
    }
    /**
     * Get error message according to validation type
     * @author Kirey
     */
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        //console.log('Validator name: ' +validatorName)
        var config = {
            'required': {
                title: 'fe.generalComponentContent.validationMessages.required'
            },
            'validateMin': {
                title: 'fe.generalComponentContent.validationMessages.validateMin'
            },
            'validateMax': {
                title: 'fe.generalComponentContent.validationMessages.validateMax',
                value: validatorValue
            },
            'minlength': {
                title: 'fe.generalComponentContent.validationMessages.minlength',
                value: validatorValue.requiredLength
            },
            'maxlength': {
                title: 'fe.generalComponentContent.validationMessages.maxlength'
            },
            'invalidEmailAddress': {
                title: 'fe.generalComponentContent.validationMessages.invalidEmailAddress'
            },
            'acceptJustNumbers': {
                title: 'fe.generalComponentContent.validationMessages.acceptJustNumbers'
            },
            'mismatchedPasswords': {
                title: 'fe.generalComponentContent.validationMessages.passwordMismatch'
            },
            'onlyOneAllowed': {
                title: 'fe.generalComponentContent.validationMessages.onlyOneAllowed'
            },
            'validPhoneNumber': {
                title: 'fe.generalComponentContent.validPhoneNumber'
            },
            'notUnique': {
                title: 'fe.adminRoles.roleUniqueMessage'
            },
            'range': {
                title: 'fe.generalComponentContent.notInRange'
            }
        };
        return config[validatorName];
    };
    /**
     * Validate only numbers
     * @author Ciprian Dorofte
     */
    ValidationService.validateOnlyNumbers = function () {
        return function (formControl) {
            if (formControl.value) {
                if (formControl.value.toString().match(/^\d+$/)) {
                    return null;
                }
                else {
                    return { 'acceptJustNumbers': true };
                }
            }
        };
    };
    /**
     * Validate min value of number
     * @author Mario Petrovic
     */
    ValidationService.validateMin = function (min) {
        //console.log('validateMin: ' + min + '-' + parseInt(formControl.value));
        return function (formControl) {
            if (formControl.value) {
                if (!((parseInt(formControl.value) >= min))) {
                    return { validateMin: (parseInt(formControl.value) >= min) };
                }
            }
        };
    };
    /**
     * Validate max value of number
     * @author Mario Petrovic
     */
    ValidationService.validateMax = function (max) {
        //console.log('validateMin: ' + max + '-' + parseInt(formControl.value));
        return function (formControl) {
            if (formControl.value) {
                if (!((parseInt(formControl.value) <= max))) {
                    return { validateMax: max };
                }
            }
        };
    };
    /**
     * Validate email
     * @author Svrkota Stefan
     */
    ValidationService.emailValidator = function () {
        return function (formControl) {
            if (formControl.value) {
                if (formControl.value.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/)) {
                    return null;
                }
                else {
                    return { 'invalidEmailAddress': true };
                }
            }
        };
    };
    /**
     * Checking length of number
     * @author Nikola Gavric
     */
    ValidationService.validateMaxLength = function (max) {
        return function (formControl) {
            if (formControl.value) {
                return (formControl.value.toString().length > max) ? { 'validateMax': true } : null;
            }
        };
    };
    /**
     * Checking the matching passwords
     * @param passwordKey
     * @param passwordConfirmationKey
     * @author Nikola Gavric
     */
    ValidationService.matchingPasswords = function (passwordKey, passwordConfirmationKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var passwordConfirmation = group.controls[passwordConfirmationKey];
            if (password.value != passwordConfirmation.value) {
                passwordConfirmation.setErrors({ mismatchedPasswords: true });
            }
            else {
                passwordConfirmation.setErrors(null);
            }
        };
    };
    /**
     * When using multiple controls and only
     * one is allowed to be used/searched by
     * @param keys string[]
     * @author Nikola Gavric
     */
    ValidationService.onlyOneAllowed = function (keys) {
        return function (group) {
            var falseFields = 0;
            keys.forEach(function (key) { return group.controls[key].value ? falseFields++ : null; });
            if (falseFields > 1)
                keys.forEach(function (key) { return group.controls[key].setErrors({ onlyOneAllowed: true }); });
            else
                keys.forEach(function (key) { return group.controls[key].setErrors(null); });
        };
    };
    /**
     * When validating valid range
     * @param min number
     * @param max number
     * @author Nikola Gavric
     */
    ValidationService.validateRange = function (min, max) {
        return function (formControl) {
            if (formControl.value < min || formControl.value > max) {
                return { range: min + '<=>' + max };
            }
        };
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map