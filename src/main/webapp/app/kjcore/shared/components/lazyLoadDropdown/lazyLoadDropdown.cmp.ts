import { Component, OnInit, Input, SimpleChange, forwardRef, Output, EventEmitter, ViewChild, ElementRef, HostListener, ViewChildren, QueryList } from '@angular/core';

import { AbstractControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AppService } from '../../services/app.service';

import { Timeout } from '../../decorators/decorators';

import { FilterDropdown } from './../../pipes/filterDropdown.pipe';

const LAZY_LOAD_DROPDOWN_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LazyLoadDropdownCmp),
    multi: true
};


@Component({
    moduleId: module.id,
    selector: 'lazyload-dropdown',
    templateUrl: 'lazyLoadDropdown.cmp.html',
    providers: [LAZY_LOAD_DROPDOWN_VALUE_ACCESSOR]
})
export class LazyLoadDropdownCmp implements OnInit, ControlValueAccessor {

    @Input()
    value: any;

    @Input()
    label: string

    @Input()
    clear: boolean;

    @Input()
    disabled: boolean;

    @Input()
    display: string;

    @Input()
    inline: boolean;

    @Input()
    matchProperty: string;

    @Input()
    placeholder: string;

    @Input()
    filterPlaceholder: string;

    @Input()
    showSearch: boolean;

    @Output() onChange: EventEmitter<any>;
    @Output() onClick: EventEmitter<any>;
    @Output() onClear: EventEmitter<any>;

    result: any;
    filter: string = "";
    toggleVar: boolean;
    focusElement: any;
    valuesCopy: any;
    currentIndex: any;

    @ViewChild('filterInput')
    filterInput: ElementRef;

    @ViewChild('scroller')
    scroller: any;

    @ViewChild('button')
    button: any;

    /*--------- Constructor --------*/
    constructor(
        private filterDropdownPipe: FilterDropdown,
        private _elementRef: ElementRef
    ) {
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onClear = new EventEmitter();
    }

    // @HostListener('keydown', ['$event'])
    // keyboardInput(event: KeyboardEvent) {
    //     switch (event.key) {
    //         case "ArrowDown":
    //             if (!this.result) {
    //                 this.result = this.value[0];
    //                 this.currentIndex = 0;
    //             } else {
    //                 if (this.currentIndex < this.valuesCopy.length - 1) {
    //                     this.currentIndex++;
    //                     this.result = this.value[this.currentIndex];
    //                     setTimeout(() => {
    //                         this.scroller.contentElement.scrollTop = this._elementRef.nativeElement.querySelector('.dropdown-item-active').offsetTop - this._elementRef.nativeElement.querySelector('.dropdown-item-active').clientHeight - 17;
    //                     })
    //                 }
    //             }
    //             break;
    //         case "ArrowUp":
    //             if (this.currentIndex > 0) {
    //                 this.currentIndex--;
    //                 this.result = this.value[this.currentIndex];
    //                 setTimeout(() => {
    //                     this.scroller.contentElement.scrollTop = this._elementRef.nativeElement.querySelector('.dropdown-item-active').offsetTop - this._elementRef.nativeElement.querySelector('.dropdown-item-active').clientHeight - 17;
    //                 })
    //             }
    //             break;
    //         case "Enter":
    //             if (this.result) {
    //                 AppService.renderer.invokeElementMethod(
    //                     this.button.nativeElement, 'click', []);
    //             };
    //             break;
    //         case "Escape":
    //             AppService.renderer.invokeElementMethod(
    //                 this.button.nativeElement, 'click', []);
    //             break;

    //     }

    // }

    toggle(input?: boolean) {
        this.toggleVar = false;
        setTimeout(() => {
            this.toggleVar = true;
            this.valuesCopy = this.filterDropdownPipe.transform(this.value, this.filter, this.display);
        })
        if (input) {
            this.result = null;
            this.currentIndex = 0;
            this.scroller.contentElement.scrollTop;
        }
    }

    @Timeout()
    dropdownToggle() {
        AppService.renderer.invokeElementMethod(
            this.filterInput.nativeElement, 'focus', []);
    }

    propagateChange = (_: any) => { };

    classStyles() {
        return (!this.inline) ? { 'width': '100%' } : {};
    }

    writeValue(value: any) {
        if (value !== undefined && value !== null && this.valuesCopy !== null && this.valuesCopy !== undefined) {
            for (let i = 0; i < this.valuesCopy.length; i++) {
                if (value[this.matchProperty ? this.matchProperty : 'id'] == this.valuesCopy[i][this.matchProperty ? this.matchProperty : 'id']) {
                    this.currentIndex = i;
                    break;
                }
            }
        }

        this.result = value;
        this.propagateChange(this.result);
        this.onChange.emit(this.result);
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    public clearInput() {
        this.result = null;
        this.propagateChange(this.result);
        this.onChange.emit(this.result);
        this.filter = "";
        this.toggle();

        this.onClear.emit();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        this.toggleVar = true;
        this.showSearch = true;
    }

    ngOnChanges(changes: SimpleChange) {
        if (Object.keys(changes)[0] == "value") {
            this.valuesCopy = this.value;
            this.toggle();
        }
    }
}