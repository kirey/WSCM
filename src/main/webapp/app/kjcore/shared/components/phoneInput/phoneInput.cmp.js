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
var phoneInput_service_1 = require('./services/phoneInput.service');
var PHONE_INPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return PhoneInputCmp; }),
    multi: true
};
var PHONE_INPUT_VALIDATOR_ACCESSOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return PhoneInputCmp; }),
    multi: true
};
var DEFAULT_REGEX = /^[0-9]{6,10}$/;
/**
 * Custom input for phone numbers.
 *
 * @author Nikola Gavric
 */
var PhoneInputCmp = (function () {
    /*--------- Constructor --------*/
    function PhoneInputCmp(_appService, _phoneService) {
        this._appService = _appService;
        this._phoneService = _phoneService;
        /**
         * @inheritdoc
         */
        this.onTouchedCallback = function () { };
        /**
         * @inheritdoc
         */
        this.onChangeCallback = function () { };
        /**
         * @inheritdoc
         */
        this.onValidatorCallback = function () { };
        /**
         * Default mask
         */
        this.defaultMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        /**
         * OnChange event emitter.
         *
         * @author Nikola Gavric
         */
        this.onChangeEvent = new core_1.EventEmitter();
        /**
         * Value representation for use in
         * this component only.
         *
         * @author Nikola Gavric
         */
        this.innerVal = null;
        /**
         * Supported phone formats.
         *
         * @author Nikola Gavric
         */
        this.supportedCountries = [];
        /**
         * Currently selected phone format
         * default is USA.
         *
         * @author Nikola Gavric
         */
        this.innerSelectedCountry = null;
        /**
         * @inheritdoc
         */
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(PhoneInputCmp.prototype, "value", {
        /**
         * Getter for value.
         *
         * @author Nikola Gavric
         */
        get: function () {
            return this.innerVal;
        },
        /**
         * Setter for value - also triggering events.
         *
         * @param currValue any - Current value
         * @author Nikola Gavric
         */
        set: function (currValue) {
            if (currValue !== this.innerVal) {
                this.innerVal = currValue;
                var toEmit = this.innerSelectedCountry.phonePrefix + currValue;
                this.onChangeCallback(toEmit);
                this.onChangeEvent.emit(toEmit);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PhoneInputCmp.prototype, "selectedCountry", {
        /**
         * Getter for selected phone format.
         *
         * @author Nikola Gavric
         */
        get: function () {
            return this.innerSelectedCountry;
        },
        /**
         * Currently selected phone format
         * default is USA.
         *
         * @author Nikola Gavric
         */
        set: function (currValue) {
            if (currValue !== this.selectedCountry) {
                this.innerSelectedCountry = currValue;
                this.value = null;
                var toEmit = currValue.phonePrefix + this.value;
                this.onChangeCallback(toEmit);
                this.onChangeEvent.emit(toEmit);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Format +(xxx)[0-9]{n} to [0-9]{n}
     *
     * @param val string
     */
    PhoneInputCmp.prototype.formatReceivedValue = function (val) {
        var _this = this;
        var tempVal = val;
        this.supportedCountries.some(function (country) {
            var index = val.indexOf(country.phonePrefix);
            if (index >= 0) {
                val = val.substr(country.phonePrefix.length);
                _this.selectedCountry = country;
                return true;
            }
        });
        if (val == tempVal)
            console.warn('No supported phone format found for: ', tempVal);
        return val == tempVal ? null : val;
    };
    /**
     * @inheritdoc
     */
    PhoneInputCmp.prototype.writeValue = function (value) {
        if (value !== this.value) {
            //if it's editing a number, format it
            if (value) {
                value = this.formatReceivedValue(value);
            }
            //set its value
            this.value = value;
        }
    };
    /**
     * @inheritdoc
     */
    PhoneInputCmp.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @inheritdoc
     */
    PhoneInputCmp.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    // returns null when valid else the validation object
    PhoneInputCmp.prototype.validate = function (c) {
        return DEFAULT_REGEX && !DEFAULT_REGEX.test(this.value) ? { 'validPhoneNumber': true } : null;
    };
    /**
     * @inheritdoc
     */
    PhoneInputCmp.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorCallback = fn;
    };
    /**
     * On blur, resets the state
     * of the input to pristine.
     *
     * @author Nikola Gavric
     */
    PhoneInputCmp.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    /*--------- NG On Init ---------*/
    PhoneInputCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.countriesSubscriber = this._phoneService.getAvailableCountries().subscribe(function (res) {
            var countries = res.data;
            countries.forEach(function (country) {
                if (country && country.phonePrefix) {
                    _this.supportedCountries.push(country);
                }
            });
            if (!_this.value) {
                _this.selectedCountry = _this.supportedCountries[0];
            }
        }, function (err) {
            console.error(err);
        });
    };
    /**
     * Destroy all data.
     */
    PhoneInputCmp.prototype.ngOnDestroy = function () {
        this.countriesSubscriber.unsubscribe();
    };
    __decorate([
        core_1.Output('onChange'), 
        __metadata('design:type', core_1.EventEmitter)
    ], PhoneInputCmp.prototype, "onChangeEvent", void 0);
    PhoneInputCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'phone-input',
            templateUrl: 'phoneInput.cmp.html',
            styleUrls: ['phoneInput.css'],
            providers: [PHONE_INPUT_VALUE_ACCESSOR, PHONE_INPUT_VALIDATOR_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, phoneInput_service_1.PhoneInputService])
    ], PhoneInputCmp);
    return PhoneInputCmp;
}());
exports.PhoneInputCmp = PhoneInputCmp;
//# sourceMappingURL=phoneInput.cmp.js.map