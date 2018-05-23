import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
    selector: '[onlyDecimal]'
})
export class OnlyDecimal {

    @Input() allowedNegative: boolean = false;

    constructor(private ctrl: NgControl, private eltRef: ElementRef) {}

    @HostListener('input', ['$event']) onEvent($event) {
        let val = this.formatValue(this.ctrl.control.value.toString());
        this.ctrl.control.patchValue(val, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };

    private formatValue(value: string) {
        //Replaces every other DOT (.) except first one in given string
        //Taken from: http://stackoverflow.com/questions/8140612/remove-all-dots-except-the-first-one-from-a-string
        value = value.replace(/^([^.]*\.)(.*)$/, function (a, b, c) { 
            return b + c.replace(/\./g, '');
        });
        this.ctrl.control.errors;
        let newVal = value.toString().replace(/[^0-9.]/g, "");

        if(this.allowedNegative && value.charAt(0) == '-') {
            newVal.replace(/-/g, "");
            newVal = "-"+newVal;
        }

        return newVal;
    }
}