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
var FilterDropdown = (function () {
    function FilterDropdown() {
    }
    FilterDropdown.prototype.transform = function (items, filter, field) {
        if (filter == "" || !items) {
            return items;
        }
        else {
            return items.filter(function (item) {
                if (field) {
                    return item[field].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
                }
                else {
                    return item.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
                }
            });
        }
    };
    FilterDropdown = __decorate([
        core_1.Pipe({
            name: 'filterDropdown'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterDropdown);
    return FilterDropdown;
}());
exports.FilterDropdown = FilterDropdown;
//# sourceMappingURL=filterDropdown.pipe.js.map