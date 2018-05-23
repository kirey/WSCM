import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
    selector: '[hour]'
})
export class HourDirective {
    @Input() allowedNegative: boolean = false;

    constructor(private ctrl: NgControl, private eltRef: ElementRef) { }

    @HostListener('input', ['$event']) onEvent($event) {
        let val = this.ctrl.control.value;

        if(val > 23) {
            val = (<string>val.toString()).substr(0, 1);
        }

        if(val < 0 || !val) {
            val = 0;
        }

        this.ctrl.control.patchValue(val, { onlySelf: true, emitEvent: false });
        this.ctrl.control.updateValueAndValidity();
    };
}