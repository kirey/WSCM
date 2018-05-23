// Based on: https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/
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
var PasswordStrength = (function () {
    function PasswordStrength() {
        this.onChange = new core_1.EventEmitter();
        this.colors = ['#F00', '#F90', '#ccff7f', '#9F0', '#0F0'];
    }
    PasswordStrength.measureStrength = function (p) {
        var _regex = /[$-/#?!@$%^&*-]/g;
        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);
        var choices_number = 0;
        choices_number = _lowerLetters ? choices_number + 26 : choices_number;
        choices_number = _upperLetters ? choices_number + 26 : choices_number;
        choices_number = _numbers ? choices_number + 10 : choices_number;
        choices_number = _symbols ? choices_number + 13 : choices_number;
        var strength = Math.log10(Math.pow(choices_number, p.length));
        var _complexity = strength / 5;
        //variety of characters penalty
        var variety_of_characters = 0;
        variety_of_characters = _lowerLetters ? variety_of_characters + 1 : variety_of_characters;
        variety_of_characters = _upperLetters ? variety_of_characters + 1 : variety_of_characters;
        variety_of_characters = _numbers ? variety_of_characters + 1 : variety_of_characters;
        variety_of_characters = _symbols ? variety_of_characters + 1 : variety_of_characters;
        _complexity = _complexity - (3 - variety_of_characters);
        return _complexity;
    };
    PasswordStrength.prototype.getColor = function (s) {
        var strength = 0;
        strength = Math.floor(((s > 4) ? 4 : s)) + 1;
        this.onChange.emit(strength);
        return {
            idx: strength,
            col: this.colors[strength - 1]
        };
    };
    PasswordStrength.prototype.ngOnChanges = function (changes) {
        var password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        if (password) {
            var c = this.getColor(PasswordStrength.measureStrength(password));
            this.setBarColors(c.idx, c.col);
        }
    };
    PasswordStrength.prototype.setBarColors = function (count, col) {
        for (var _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PasswordStrength.prototype, "passwordToCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PasswordStrength.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PasswordStrength.prototype, "onChange", void 0);
    PasswordStrength = __decorate([
        core_1.Component({
            selector: 'password-strength',
            styles: ["\n    ul#strengthBar {\n        display:inline;\n        list-style:none;\n        margin:0;\n        margin-left:15px;\n        padding:0;\n        vertical-align:2px;\n    }\n    .point:last {\n        margin:0 !important;\n    }\n    .point {\n        background:#DDD;\n        border-radius:2px;\n        display:inline-block;\n        height:5px;\n        margin-right:1px;\n        width:20px;\n    }"],
            template: "\n    <div id=\"strength\" #strength>\n        <small>{{label}}</small>\n        <ul id=\"strengthBar\">\n            <li class=\"point\" [style.background-color]=\"bar0\"></li><li class=\"point\" [style.background-color]=\"bar1\"></li><li class=\"point\" [style.background-color]=\"bar2\"></li><li class=\"point\" [style.background-color]=\"bar3\"></li><li class=\"point\" [style.background-color]=\"bar4\"></li>\n        </ul>\n    </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], PasswordStrength);
    return PasswordStrength;
}());
exports.PasswordStrength = PasswordStrength;
//# sourceMappingURL=passwordStrength.cmp.js.map