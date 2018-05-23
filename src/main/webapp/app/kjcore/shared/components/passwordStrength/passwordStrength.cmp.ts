// Based on: https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/

import { Component, OnChanges, Input, SimpleChange, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'password-strength',
    styles: [`
    ul#strengthBar {
        display:inline;
        list-style:none;
        margin:0;
        margin-left:15px;
        padding:0;
        vertical-align:2px;
    }
    .point:last {
        margin:0 !important;
    }
    .point {
        background:#DDD;
        border-radius:2px;
        display:inline-block;
        height:5px;
        margin-right:1px;
        width:20px;
    }`],
    template: `
    <div id="strength" #strength>
        <small>{{label}}</small>
        <ul id="strengthBar">
            <li class="point" [style.background-color]="bar0"></li><li class="point" [style.background-color]="bar1"></li><li class="point" [style.background-color]="bar2"></li><li class="point" [style.background-color]="bar3"></li><li class="point" [style.background-color]="bar4"></li>
        </ul>
    </div>
`
})
export class PasswordStrength implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() label: string;
    @Output() onChange: EventEmitter<number> = new EventEmitter<number>();
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;

    private colors = ['#F00', '#F90', '#ccff7f', '#9F0', '#0F0'];

    private static measureStrength(p) {
        let _regex = /[$-/#?!@$%^&*-]/g;
        let _lowerLetters = /[a-z]+/.test(p);
        let _upperLetters = /[A-Z]+/.test(p);
        let _numbers = /[0-9]+/.test(p);
        let _symbols = _regex.test(p);

        let choices_number=0;
        choices_number = _lowerLetters ? choices_number+26 : choices_number;
        choices_number = _upperLetters ? choices_number+26 : choices_number;
        choices_number = _numbers ? choices_number+10 : choices_number;
        choices_number = _symbols ? choices_number+13 : choices_number;

        let strength = Math.log10(Math.pow(choices_number, p.length));
        let _complexity = strength/5;

        //variety of characters penalty
        let variety_of_characters=0;
        variety_of_characters = _lowerLetters ? variety_of_characters+1 : variety_of_characters;
        variety_of_characters = _upperLetters ? variety_of_characters+1 : variety_of_characters;
        variety_of_characters = _numbers ? variety_of_characters+1 : variety_of_characters;
        variety_of_characters = _symbols ? variety_of_characters+1 : variety_of_characters;

        _complexity=_complexity-(3-variety_of_characters);

        return _complexity;

    }

    private getColor(s) {
        let strength = 0;

        strength = Math.floor(((s>4)? 4 : s))+1;

        this.onChange.emit(strength);
        
        return {
            idx: strength,
            col: this.colors[strength-1]
        };
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        let password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        if (password) {
            let c = this.getColor(PasswordStrength.measureStrength(password));
            this.setBarColors(c.idx, c.col);
        }
    }

    private setBarColors(count, col) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    }
}