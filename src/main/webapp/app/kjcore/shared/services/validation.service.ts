import { FormControl, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class ValidationService {
    /**
     * Get error message according to validation type 
     * @author Kirey
     */
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
        //console.log('Validator name: ' +validatorName)

        let config = {
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
    }

    /**
     * Validate only numbers
     * @author Ciprian Dorofte
     */
    static validateOnlyNumbers() {
        return (formControl: AbstractControl) => {
            if (formControl.value) {
                if (formControl.value.toString().match(/^\d+$/)) {
                    return null;
                } else {
                    return { 'acceptJustNumbers': true };
                }
            }
        }
    }


    /**
     * Validate min value of number
     * @author Mario Petrovic
     */
    static validateMin(min: number): Object {
        //console.log('validateMin: ' + min + '-' + parseInt(formControl.value));
        return (formControl: AbstractControl) => {
            if (formControl.value) {
                if (!((parseInt(formControl.value) >= min))) {
                    return { validateMin: (parseInt(formControl.value) >= min) };
                }
            }
        }
    }

    /**
     * Validate max value of number
     * @author Mario Petrovic
     */
    static validateMax(max: number) {
        //console.log('validateMin: ' + max + '-' + parseInt(formControl.value));
        return (formControl: AbstractControl) => {
            if (formControl.value) {
                if (!((parseInt(formControl.value) <= max))) {
                    return { validateMax: max };
                }
            }
        }
    }

    /**
     * Validate email
     * @author Svrkota Stefan
     */
    static emailValidator() {
        return (formControl: AbstractControl) => {
            if (formControl.value) {
                if (formControl.value.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/)) {
                    return null;
                } else {
                    return { 'invalidEmailAddress': true };
                }
            }
        }
    }

    /**
     * Checking length of number
     * @author Nikola Gavric
     */
    static validateMaxLength(max: number) {
        return (formControl: AbstractControl) => {
            if (formControl.value) {
                return (formControl.value.toString().length > max) ? { 'validateMax': true } : null;
            }
        }
    }

    /**
     * Checking the matching passwords
     * @param passwordKey 
     * @param passwordConfirmationKey
     * @author Nikola Gavric
     */
    static matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let password = group.controls[passwordKey];
            let passwordConfirmation = group.controls[passwordConfirmationKey];
            if (password.value != passwordConfirmation.value) {
                passwordConfirmation.setErrors({mismatchedPasswords: true})
            } else {
                passwordConfirmation.setErrors(null);
            }
        }
    }

    /**
     * When using multiple controls and only
     * one is allowed to be used/searched by
     * @param keys string[]
     * @author Nikola Gavric
     */
    static onlyOneAllowed(keys: string[]) {
        return (group: FormGroup) => {
            let falseFields = 0;
            keys.forEach(key => group.controls[key].value?falseFields++:null);
            if(falseFields>1) keys.forEach(key => group.controls[key].setErrors({onlyOneAllowed: true}));
            else keys.forEach(key => group.controls[key].setErrors(null));
        }
    }

    /**
     * When validating valid range
     * @param min number
     * @param max number
     * @author Nikola Gavric
     */
    static validateRange(min: number, max: number) {
        return (formControl: AbstractControl) => {
            if(formControl.value < min || formControl.value > max) {
                return { range: min + '<=>' + max };
            }
        }
    }
}