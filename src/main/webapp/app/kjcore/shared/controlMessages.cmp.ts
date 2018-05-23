import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './services/validation.service';

@Component({
  selector: 'control-messages',
  template: `<span *ngIf="errorMessage !== null" class="label label-danger pull-right">{{errorMessage.title | translate}} {{errorMessage.value}}</span>`,
})
export class ControlMessages {

  @Input() control: FormControl;

  constructor() {}

  get errorMessage(): string {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}