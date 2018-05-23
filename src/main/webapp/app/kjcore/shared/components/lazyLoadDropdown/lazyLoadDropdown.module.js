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
var common_1 = require('@angular/common');
var primeng_1 = require('primeng/primeng');
var pipes_module_1 = require('../.././modules/pipes.module');
var lazyLoadDropdown_cmp_1 = require("./lazyLoadDropdown.cmp");
var forms_1 = require("@angular/forms");
var LazyLoadDropdownModule = (function () {
    function LazyLoadDropdownModule() {
    }
    LazyLoadDropdownModule = __decorate([
        core_1.NgModule({
            imports: [
                primeng_1.DataScrollerModule,
                pipes_module_1.PipesModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                lazyLoadDropdown_cmp_1.LazyLoadDropdownCmp
            ],
            exports: [
                primeng_1.DataScrollerModule,
                pipes_module_1.PipesModule,
                lazyLoadDropdown_cmp_1.LazyLoadDropdownCmp
            ],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], LazyLoadDropdownModule);
    return LazyLoadDropdownModule;
}());
exports.LazyLoadDropdownModule = LazyLoadDropdownModule;
//# sourceMappingURL=lazyLoadDropdown.module.js.map