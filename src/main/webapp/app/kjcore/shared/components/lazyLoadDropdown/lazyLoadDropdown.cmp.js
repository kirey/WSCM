"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var app_service_1 = require('../../services/app.service');
var decorators_1 = require('../../decorators/decorators');
var filterDropdown_pipe_1 = require('./../../pipes/filterDropdown.pipe');
var LAZY_LOAD_DROPDOWN_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return LazyLoadDropdownCmp; }),
    multi: true
};
var LazyLoadDropdownCmp = (function () {
    /*--------- Constructor --------*/
    function LazyLoadDropdownCmp(filterDropdownPipe, _elementRef) {
        this.filterDropdownPipe = filterDropdownPipe;
        this._elementRef = _elementRef;
        this.filter = "";
        this.propagateChange = function (_) { };
        this.onChange = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onClear = new core_1.EventEmitter();
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
    LazyLoadDropdownCmp.prototype.toggle = function (input) {
        var _this = this;
        this.toggleVar = false;
        setTimeout(function () {
            _this.toggleVar = true;
            _this.valuesCopy = _this.filterDropdownPipe.transform(_this.value, _this.filter, _this.display);
        });
        if (input) {
            this.result = null;
            this.currentIndex = 0;
            this.scroller.contentElement.scrollTop;
        }
    };
    LazyLoadDropdownCmp.prototype.dropdownToggle = function () {
        app_service_1.AppService.renderer.invokeElementMethod(this.filterInput.nativeElement, 'focus', []);
    };
    LazyLoadDropdownCmp.prototype.classStyles = function () {
        return (!this.inline) ? { 'width': '100%' } : {};
    };
    LazyLoadDropdownCmp.prototype.writeValue = function (value) {
        if (value !== undefined && value !== null && this.valuesCopy !== null && this.valuesCopy !== undefined) {
            for (var i = 0; i < this.valuesCopy.length; i++) {
                if (value[this.matchProperty ? this.matchProperty : 'id'] == this.valuesCopy[i][this.matchProperty ? this.matchProperty : 'id']) {
                    this.currentIndex = i;
                    break;
                }
            }
        }
        this.result = value;
        this.propagateChange(this.result);
        this.onChange.emit(this.result);
    };
    LazyLoadDropdownCmp.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    LazyLoadDropdownCmp.prototype.registerOnTouched = function () { };
    LazyLoadDropdownCmp.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    LazyLoadDropdownCmp.prototype.clearInput = function () {
        this.result = null;
        this.propagateChange(this.result);
        this.onChange.emit(this.result);
        this.filter = "";
        this.toggle();
        this.onClear.emit();
    };
    /*--------- NG On Init ---------*/
    LazyLoadDropdownCmp.prototype.ngOnInit = function () {
        this.toggleVar = true;
        this.showSearch = true;
    };
    LazyLoadDropdownCmp.prototype.ngOnChanges = function (changes) {
        if (Object.keys(changes)[0] == "value") {
            this.valuesCopy = this.value;
            this.toggle();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LazyLoadDropdownCmp.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LazyLoadDropdownCmp.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LazyLoadDropdownCmp.prototype, "clear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LazyLoadDropdownCmp.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LazyLoadDropdownCmp.prototype, "display", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LazyLoadDropdownCmp.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LazyLoadDropdownCmp.prototype, "matchProperty", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LazyLoadDropdownCmp.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LazyLoadDropdownCmp.prototype, "filterPlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LazyLoadDropdownCmp.prototype, "showSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LazyLoadDropdownCmp.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LazyLoadDropdownCmp.prototype, "onClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LazyLoadDropdownCmp.prototype, "onClear", void 0);
    __decorate([
        core_1.ViewChild('filterInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], LazyLoadDropdownCmp.prototype, "filterInput", void 0);
    __decorate([
        core_1.ViewChild('scroller'), 
        __metadata('design:type', Object)
    ], LazyLoadDropdownCmp.prototype, "scroller", void 0);
    __decorate([
        core_1.ViewChild('button'), 
        __metadata('design:type', Object)
    ], LazyLoadDropdownCmp.prototype, "button", void 0);
    __decorate([
        decorators_1.Timeout(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LazyLoadDropdownCmp.prototype, "dropdownToggle", null);
    LazyLoadDropdownCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lazyload-dropdown',
            templateUrl: 'lazyLoadDropdown.cmp.html',
            providers: [LAZY_LOAD_DROPDOWN_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [filterDropdown_pipe_1.FilterDropdown, core_1.ElementRef])
    ], LazyLoadDropdownCmp);
    return LazyLoadDropdownCmp;
}());
exports.LazyLoadDropdownCmp = LazyLoadDropdownCmp;
//# sourceMappingURL=lazyLoadDropdown.cmp.js.map