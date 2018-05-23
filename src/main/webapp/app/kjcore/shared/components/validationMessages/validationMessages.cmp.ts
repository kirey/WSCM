import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { RestResponse, ValidationError } from '../../models';

@Component({
    moduleId: module.id,
    selector: 'validation-messages',
    templateUrl: 'validationMessages.cmp.html'
})
export class ValidationMessagesCmp implements OnInit {
    @Input() errors: RestResponse<any>;
    @Input() inputName: string;

    errorMessages: string[];

    /*--------- Constructor --------*/
    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    /*--------- NG On Changes ---------*/
    ngOnChanges(changes: any) {
        this.errorMessages = [];
        if (this.errors && this.inputName) {
            for (let error of this.errors.errors) {
                if (error.fieldName == this.inputName) {
                    this.errorMessages.push(error.errorCode);
                }
            }
        } else if (this.errors && !this.inputName) {
            for (let error of this.errors.errors) {
                this.errorMessages.push(error.errorCode);
            }
        }
    }
    /*--------- NG On Init ---------*/
    ngOnInit() {
        this.errorMessages = [];
    }
}