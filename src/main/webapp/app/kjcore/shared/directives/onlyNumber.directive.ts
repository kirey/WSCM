import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
    selector: '[onlyNumber]'
})
export class OnlyNumber {
    @Input() allowedNegative: boolean = false;

    constructor(private ctrl: NgControl, private eltRef: ElementRef) { }

    @HostListener('input', ['$event']) onEvent($event) {
        let val = this.ctrl.control.value.toString();
        let newVal = val.replace(/\D+/g, "");
        
        if(this.allowedNegative && val.charAt(0) == '-') {
            val.replace(/-/g, "");
            newVal = "-"+val;
        }

        if(parseInt(newVal) === NaN) newVal = null;

        this.ctrl.control.patchValue(newVal, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };
}