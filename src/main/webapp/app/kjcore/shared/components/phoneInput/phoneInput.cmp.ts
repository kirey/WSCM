import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, forwardRef } from '@angular/core';
import { Http } from '@angular/http';
import { AbstractControl, ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs/Subscription';
import { Phone } from './model/phone.model';
import { RestResponse } from '../../models';
import { Country } from './model/country.model';
import { PhoneInputService } from './services/phoneInput.service';

const PHONE_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneInputCmp),
    multi: true
};

const PHONE_INPUT_VALIDATOR_ACCESSOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PhoneInputCmp),
    multi: true
};

const DEFAULT_REGEX: RegExp = /^[0-9]{6,10}$/;

/**
 * Custom input for phone numbers.
 * 
 * @author Nikola Gavric
 */
@Component({
    moduleId: module.id,
    selector: 'phone-input',
    templateUrl: 'phoneInput.cmp.html',
    styleUrls: ['phoneInput.css'],
    providers: [PHONE_INPUT_VALUE_ACCESSOR, PHONE_INPUT_VALIDATOR_ACCESSOR]
})
export class PhoneInputCmp implements OnInit, ControlValueAccessor, Validator, OnDestroy {
    /**
     * @inheritdoc
     */
    private onTouchedCallback: () => void = () => { };
    /**
     * @inheritdoc
     */
    private onChangeCallback: (_: any) => void = () => { };
    /**
     * @inheritdoc
     */
    private onValidatorCallback: (_: any) => void = () => { };
    /**
     * Default mask
     */
    private defaultMask: any[] = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    /**
     * OnChange event emitter.
     * 
     * @author Nikola Gavric
     */
    @Output('onChange') onChangeEvent: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Value representation for use in
     * this component only.
     * 
     * @author Nikola Gavric
     */
    private innerVal: string = null;
    /**
     * Supported phone formats.
     * 
     * @author Nikola Gavric
     */
    private supportedCountries: Country[] = [];
    /**
     * Currently selected phone format
     * default is USA.
     * 
     * @author Nikola Gavric
     */
    private innerSelectedCountry: Country = null;
    /**
     * Subscriber for countries.
     * 
     * @author Nikola Gavric
     */
    private countriesSubscriber: Subscription;

    /*--------- Constructor --------*/
    constructor(private _appService: AppService,
                private _phoneService: PhoneInputService) { }

    /**
     * Getter for value.
     * 
     * @author Nikola Gavric
     */
    get value(): any {
        return this.innerVal;
    };

    /**
     * Setter for value - also triggering events.
     * 
     * @param currValue any - Current value
     * @author Nikola Gavric
     */
    set value(currValue: any) {
        if (currValue !== this.innerVal) {
            this.innerVal = currValue;
            let toEmit = this.innerSelectedCountry.phonePrefix + currValue;
            this.onChangeCallback(toEmit);
            this.onChangeEvent.emit(toEmit);
        }
    };

    /**
     * Getter for selected phone format.
     * 
     * @author Nikola Gavric
     */
    get selectedCountry(): Country {
        return this.innerSelectedCountry;
    };

    /**
     * Currently selected phone format
     * default is USA.
     * 
     * @author Nikola Gavric
     */
    set selectedCountry(currValue: Country) {
        if (currValue !== this.selectedCountry) {
            this.innerSelectedCountry = currValue;
            this.value = null;
            let toEmit = currValue.phonePrefix + this.value;
            this.onChangeCallback(toEmit);
            this.onChangeEvent.emit(toEmit);
        }
    };
    /**
     * Format +(xxx)[0-9]{n} to [0-9]{n}
     * 
     * @param val string
     */
    private formatReceivedValue(val: string): string {
        let tempVal = val;
        this.supportedCountries.some((country: Country) => {
            let index = val.indexOf(country.phonePrefix);
            if (index >= 0) {
                val = val.substr(country.phonePrefix.length);
                this.selectedCountry = country;
                return true;
            }
        });
        if (val == tempVal) console.warn('No supported phone format found for: ', tempVal);
        return val == tempVal ? null : val;
    }

    /**
     * @inheritdoc
     */
    writeValue(value: any) {
        if (value !== this.value) {
            //if it's editing a number, format it
            if (value) {
                value = this.formatReceivedValue(value);
            }
            //set its value
            this.value = value;
        }
    }

    /**
     * @inheritdoc
     */
    propagateChange = (_: any) => { };

    /**
     * @inheritdoc
     */
    registerOnChange(fn: (value: any) => void) {
        this.onChangeCallback = fn;
    }

    /**
     * @inheritdoc
     */
    registerOnTouched(fn: () => void) {
        this.onTouchedCallback = fn;
    }

    // returns null when valid else the validation object
    validate(c: AbstractControl) {
        return DEFAULT_REGEX && !DEFAULT_REGEX.test(this.value) ? { 'validPhoneNumber': true } : null;
    }

    /**
     * @inheritdoc
     */
    registerOnValidatorChange?(fn: () => void) {
        this.onValidatorCallback = fn;
    }

    /**
     * On blur, resets the state
     * of the input to pristine.
     * 
     * @author Nikola Gavric
     */
    onBlur() {
        this.onTouchedCallback();
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        this.countriesSubscriber = this._phoneService.getAvailableCountries().subscribe(
            (res: RestResponse<any>) => {
                let countries = res.data;
                countries.forEach((country: Country) => {
                    if (country && country.phonePrefix) {
                        this.supportedCountries.push(country);
                    }
                });

                if(!this.value) {
                    this.selectedCountry = this.supportedCountries[0];
                }
            },
            (err: RestResponse<any>) => {
                console.error(err);
            }
        );
    }

    /**
     * Destroy all data.
     */
    public ngOnDestroy() {
        this.countriesSubscriber.unsubscribe();
    }
}