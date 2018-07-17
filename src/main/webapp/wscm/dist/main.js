(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/modules/material.module */ "./src/app/shared/modules/material.module.ts");
/* harmony import */ var _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/guards/auth.guard */ "./src/app/shared/guards/auth.guard.ts");
/* harmony import */ var _panel_panel_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./panel/panel.service */ "./src/app/panel/panel.service.ts");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _login_login_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./login/login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _events_events_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./events/events.service */ "./src/app/events/events.service.ts");
/* harmony import */ var _client_client_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./client/client.service */ "./src/app/client/client.service.ts");
/* harmony import */ var _shared_services_socket_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/services/socket.service */ "./src/app/shared/services/socket.service.ts");
/* harmony import */ var _shared_dialogs_edit_event_dialog_edit_event_dialog_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/dialogs/edit-event-dialog/edit-event-dialog.service */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.service.ts");
/* harmony import */ var _shared_dialogs_add_event_dialog_add_event_dialog_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/dialogs/add-event-dialog/add-event-dialog.service */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.service.ts");
/* harmony import */ var _jobs_jobs_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./jobs/jobs.service */ "./src/app/jobs/jobs.service.ts");
/* harmony import */ var _shared_pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shared/pipes/filter.pipe */ "./src/app/shared/pipes/filter.pipe.ts");
/* harmony import */ var _panel_panel_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./panel/panel.component */ "./src/app/panel/panel.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./content/content.component */ "./src/app/content/content.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _languages_languages_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./languages/languages.component */ "./src/app/languages/languages.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./shared/dialogs/delete-dialog/delete-dialog.component */ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.ts");
/* harmony import */ var _client_client_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./client/client.component */ "./src/app/client/client.component.ts");
/* harmony import */ var _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./jobs/jobs.component */ "./src/app/jobs/jobs.component.ts");
/* harmony import */ var _shared_dialogs_edit_dialog_edit_dialog_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./shared/dialogs/edit-dialog/edit-dialog.component */ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.ts");
/* harmony import */ var _shared_dialogs_edit_event_dialog_edit_event_dialog_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./shared/dialogs/edit-event-dialog/edit-event-dialog.component */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.ts");
/* harmony import */ var _shared_dialogs_add_content_dialog_add_content_dialog_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./shared/dialogs/add-content-dialog/add-content-dialog.component */ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.ts");
/* harmony import */ var _shared_dialogs_edit_content_dialog_edit_content_dialog_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./shared/dialogs/edit-content-dialog/edit-content-dialog.component */ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.ts");
/* harmony import */ var _shared_dialogs_add_event_dialog_add_event_dialog_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./shared/dialogs/add-event-dialog/add-event-dialog.component */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.ts");
/* harmony import */ var _mail_redirect_mail_redirect_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./mail-redirect/mail-redirect.component */ "./src/app/mail-redirect/mail-redirect.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Modules

// Services










// Pipes

// Components
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_21__["AppComponent"],
                _panel_panel_component__WEBPACK_IMPORTED_MODULE_20__["PanelComponent"],
                _content_content_component__WEBPACK_IMPORTED_MODULE_22__["ContentComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_23__["HomeComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_24__["LoginComponent"],
                _languages_languages_component__WEBPACK_IMPORTED_MODULE_25__["LanguagesComponent"],
                _shared_pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_19__["FilterPipe"],
                _events_events_component__WEBPACK_IMPORTED_MODULE_26__["EventsComponent"],
                _shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_27__["DeleteDialog"],
                _client_client_component__WEBPACK_IMPORTED_MODULE_28__["ClientComponent"],
                _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_29__["JobsComponent"],
                _shared_dialogs_edit_dialog_edit_dialog_component__WEBPACK_IMPORTED_MODULE_30__["EditDialogComponent"],
                _shared_dialogs_edit_event_dialog_edit_event_dialog_component__WEBPACK_IMPORTED_MODULE_31__["EditEventDialogComponent"],
                _shared_dialogs_add_content_dialog_add_content_dialog_component__WEBPACK_IMPORTED_MODULE_32__["AddContentDialogComponent"],
                _shared_dialogs_edit_content_dialog_edit_content_dialog_component__WEBPACK_IMPORTED_MODULE_33__["EditContentDialogComponent"],
                _shared_dialogs_add_event_dialog_add_event_dialog_component__WEBPACK_IMPORTED_MODULE_34__["AddEventDialogComponent"],
                _mail_redirect_mail_redirect_component__WEBPACK_IMPORTED_MODULE_35__["MailRedirectComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routes__WEBPACK_IMPORTED_MODULE_6__["AppRoutes"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _shared_modules_material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"]
            ],
            providers: [
                _panel_panel_service__WEBPACK_IMPORTED_MODULE_10__["PanelService"],
                _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"],
                _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_11__["AuthService"],
                _login_login_service__WEBPACK_IMPORTED_MODULE_12__["LoginService"],
                _events_events_service__WEBPACK_IMPORTED_MODULE_13__["EventsService"],
                _client_client_service__WEBPACK_IMPORTED_MODULE_14__["ClientService"],
                _shared_services_socket_service__WEBPACK_IMPORTED_MODULE_15__["SocketService"],
                _shared_dialogs_edit_event_dialog_edit_event_dialog_service__WEBPACK_IMPORTED_MODULE_16__["EditEventService"],
                _shared_dialogs_add_event_dialog_add_event_dialog_service__WEBPACK_IMPORTED_MODULE_17__["AddEventService"],
                _jobs_jobs_service__WEBPACK_IMPORTED_MODULE_18__["JobsService"]
            ],
            entryComponents: [
                _shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_27__["DeleteDialog"],
                _shared_dialogs_edit_dialog_edit_dialog_component__WEBPACK_IMPORTED_MODULE_30__["EditDialogComponent"],
                _shared_dialogs_edit_event_dialog_edit_event_dialog_component__WEBPACK_IMPORTED_MODULE_31__["EditEventDialogComponent"],
                _shared_dialogs_add_content_dialog_add_content_dialog_component__WEBPACK_IMPORTED_MODULE_32__["AddContentDialogComponent"],
                _shared_dialogs_edit_content_dialog_edit_content_dialog_component__WEBPACK_IMPORTED_MODULE_33__["EditContentDialogComponent"],
                _shared_dialogs_add_event_dialog_add_event_dialog_component__WEBPACK_IMPORTED_MODULE_34__["AddEventDialogComponent"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_21__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: AppRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutes", function() { return AppRoutes; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/content.component */ "./src/app/content/content.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _languages_languages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/languages.component */ "./src/app/languages/languages.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _client_client_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client/client.component */ "./src/app/client/client.component.ts");
/* harmony import */ var _mail_redirect_mail_redirect_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mail-redirect/mail-redirect.component */ "./src/app/mail-redirect/mail-redirect.component.ts");
/* harmony import */ var _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./jobs/jobs.component */ "./src/app/jobs/jobs.component.ts");
/* harmony import */ var _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/guards/auth.guard */ "./src/app/shared/guards/auth.guard.ts");










var routes = [
    { path: '', redirectTo: '/login', canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]], pathMatch: 'full' },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'content', component: _content_content_component__WEBPACK_IMPORTED_MODULE_1__["ContentComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'scheduler', component: _events_events_component__WEBPACK_IMPORTED_MODULE_5__["EventsComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'jobs', component: _jobs_jobs_component__WEBPACK_IMPORTED_MODULE_8__["JobsComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'languages', component: _languages_languages_component__WEBPACK_IMPORTED_MODULE_3__["LanguagesComponent"] },
    { path: 'client', component: _client_client_component__WEBPACK_IMPORTED_MODULE_6__["ClientComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: 'client-mail', component: _mail_redirect_mail_redirect_component__WEBPACK_IMPORTED_MODULE_7__["MailRedirectComponent"], canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
    { path: '**', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] }
];
var AppRoutes = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, { useHash: true });


/***/ }),

/***/ "./src/app/client/client.component.html":
/*!**********************************************!*\
  !*** ./src/app/client/client.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar bg-dark\">\r\n    <a class=\"navbar-brand\" href=\"#\" style=\"color:white\">ICAP - Intelligent Content and Ad Provider</a>\r\n</nav>\r\n<nav class=\"navbar navbar-expand-lg navbar-light bg-light rounded\">\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExample10\" aria-controls=\"navbarsExample10\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n          <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n\r\n    <div class=\"collapse navbar-collapse justify-content-md-center\" id=\"navbarsExample10\">\r\n        <ul class=\"navbar-nav\">\r\n            <li class=\"nav-item active\">\r\n                <a class=\"nav-link\" href=\"#\">Home<span class=\"sr-only\">(current)</span></a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#\">Who we are</a>\r\n            </li>\r\n            <li class=\"nav-item dropdown\">\r\n                <a class=\"nav-link dropdown-toggle\" href=\"https://example.com\" id=\"dropdown10\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Service</a>\r\n                <div class=\"dropdown-menu\" aria-labelledby=\"dropdown10\">\r\n                    <a class=\"dropdown-item\" href=\"#\">Banking</a>\r\n                    <a class=\"dropdown-item\" href=\"#\">Insurance</a>\r\n                </div>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#\">Testimonials</a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#\">Projects</a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" href=\"#\">Contact Us</a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"/client-mail\" (click)=\"mail()\">See Our offer</a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                <a class=\"nav-link\" (click)=\"logout()\">\r\n                    <span class=\"material-icons\" id=\"forHover\">\r\n                        exit_to_app\r\n                    </span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>\r\n<div class=\"container-fluid\">\r\n    <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\r\n        <ol class=\"carousel-indicators\">\r\n            <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\r\n            <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\r\n            <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\r\n        </ol>\r\n        <div class=\"carousel-inner\">\r\n            <div class=\"carousel-item active\">\r\n                <img class=\"first-slide img-fluid\" src=\"wscm/src/assets/one.jpg\" alt=\"First slide\">\r\n                <div class=\"container\">\r\n                    <div class=\"carousel-caption text-left\">\r\n                        <h1>Experience.Expertise</h1>\r\n                        <p>Comperhensive financial advice and financial services that are tailored to meet your individual needs.</p>\r\n                        <p style=\"display:flex\">\r\n                            <a class=\"btn btn-lg btn-primary\" href=\"#\" role=\"button\">Our services</a>\r\n                            <a class=\"btn btn-lg btn-default\" id=\"whiteButton\" href=\"#\" role=\"button\">Contact Us</a>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"carousel-item\">\r\n                <img class=\"second-slide img-fluid\" src=\"wscm/src/assets/two.jpg\" alt=\"Second slide\">\r\n                <div class=\"container\">\r\n                    <div class=\"carousel-caption\">\r\n                        <h1>CONSULTING SERVICES</h1>\r\n                        <p>We help financial institutions,from banking and insurance to wealth management and securities distribution,manage risks and serve customers.</p>\r\n                        <p><a class=\"btn btn-lg btn-default\" id=\"whiteButton\" href=\"#\" role=\"button\">Contact Us</a></p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"carousel-item\">\r\n                <img class=\"third-slide img-fluid\" src=\"wscm/src/assets/three.jpg\" alt=\"Third slide\">\r\n                <div class=\"container\">\r\n                    <div class=\"carousel-caption text-left\">\r\n                        <h1>FINANCIAL STRATEGY</h1>\r\n                        <p>Comperhensive financial advice and financial services that are tailored to meet your individual needs.</p>\r\n                        <p style=\"display:flex\">\r\n                            <a class=\"btn btn-lg btn-primary\" href=\"#\" role=\"button\">Our services</a>\r\n                            <a class=\"btn btn-lg btn-default\" id=\"whiteButton\" href=\"#\" role=\"button\">Contact Us</a>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <a class=\"carousel-control-prev\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\r\n            <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"sr-only\">Previous</span>\r\n        </a>\r\n        <a class=\"carousel-control-next\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\r\n            <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"sr-only\">Next</span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3\">\r\n            <article>\r\n                <h5 style=\"text-align: center;\"><strong>Advanced Analytics</strong></h5>\r\n                <p style=\"text-align: center;\">\r\n                    Quisque pulvinar libero dolor, quis bibendum eros euismod sit amet. Proin dapibus id diam at\r\n                </p>\r\n            </article>\r\n        </div>\r\n        <div class=\"col-md-3\">\r\n            <article>\r\n                <h5 style=\"text-align: center;\"><strong>Thought Leadership</strong></h5>\r\n                <p style=\"text-align: center;\">\r\n                    Quisque pulvinar libero dolor, quis bibendum eros euismod sit amet. Proin dapibus id diam at\r\n                </p>\r\n            </article>\r\n        </div>\r\n        <div class=\"col-md-3\">\r\n            <article>\r\n                <h5 style=\"text-align: center;\"><strong>Growth Strategy</strong></h5>\r\n                <p style=\"text-align: center;\">\r\n                    Quisque pulvinar libero dolor, quis bibendum eros euismod sit amet. Proin dapibus id diam at\r\n                </p>\r\n            </article>\r\n        </div>\r\n        <div class=\"col-md-3\">\r\n            <article>\r\n                <h5 style=\"text-align: center;\"><strong>Savings Money</strong></h5>\r\n                <p style=\"text-align: center;\">\r\n                    Quisque pulvinar libero dolor, quis bibendum eros euismod sit amet. Proin dapibus id diam at\r\n                </p>\r\n            </article>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"container-fluid\">\r\n    <div id=\"position\" style=\"margin-top:2%;\">\r\n\r\n    </div>\r\n</div>\r\n<div id=\"toast\">\r\n</div>\r\n<footer class=\"footer-basic-centered\">\r\n\r\n    <p class=\"footer-company-motto\">L'unione di quattro eccellenze nell'IT in un unico gruppo ...</p>\r\n\r\n    <p class=\"footer-links\">\r\n\r\n        <a href=\"#\">Home</a> ·\r\n        <a href=\"#\">Pricing</a> ·\r\n        <a href=\"#\">About</a> ·\r\n        <a href=\"#\">Faq</a> ·\r\n        <a href=\"#\">Contact</a>\r\n    </p>\r\n\r\n    <a href=\"http://kireygroup.com/\" class=\"footer-company-name\">Kirey Group &copy; 2018</a>\r\n\r\n</footer>"

/***/ }),

/***/ "./src/app/client/client.component.scss":
/*!**********************************************!*\
  !*** ./src/app/client/client.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-link {\n  color: #000000;\n  margin-left: 25px; }\n\n.carousel-item img {\n  min-width: 100%;\n  height: 500px;\n  max-height: 700px; }\n\n#whiteButton {\n  margin-left: 15px;\n  background-color: white; }\n\n.row {\n  margin-top: 2%; }\n\n.container {\n  width: 70%; }\n\n#forHover {\n  cursor: pointer; }\n\n.footer-basic-centered {\n  background-color: #292c2f;\n  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);\n  box-sizing: border-box;\n  width: 100%;\n  text-align: center;\n  font: normal 18px sans-serif;\n  padding: 45px;\n  margin-top: 80px; }\n\n.footer-basic-centered .footer-company-motto {\n  color: #8d9093;\n  font-size: 24px;\n  margin: 0; }\n\n.footer-basic-centered .footer-company-name {\n  color: #8f9296;\n  font-size: 14px;\n  margin: 0; }\n\n.footer-basic-centered .footer-links {\n  list-style: none;\n  font-weight: bold;\n  color: #ffffff;\n  padding: 35px 0 23px;\n  margin: 0; }\n\n.footer-basic-centered .footer-links a {\n  display: inline-block;\n  text-decoration: none;\n  color: inherit; }\n\n@media only screen and (max-width: 900px) {\n  .navbar-brand {\n    font-size: 18px; }\n  .carousel-caption h1 {\n    font-size: 18px; }\n  .carousel-caption p {\n    font-size: 12px; }\n  .carousel-caption a {\n    border: none;\n    padding: 4px 12px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    cursor: pointer; }\n  .carousel-item img {\n    opacity: 0.5; } }\n\n@-webkit-keyframes bounce {\n  0%,\n  20%,\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  40% {\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px); }\n  80% {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); } }\n\n@keyframes bounce {\n  0%,\n  20%,\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  40% {\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px); }\n  80% {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); } }\n\narticle:hover {\n  -webkit-animation: bounce 1s;\n          animation: bounce 1s; }\n"

/***/ }),

/***/ "./src/app/client/client.component.ts":
/*!********************************************!*\
  !*** ./src/app/client/client.component.ts ***!
  \********************************************/
/*! exports provided: ClientComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientComponent", function() { return ClientComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _client_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client.service */ "./src/app/client/client.service.ts");
/* harmony import */ var _shared_services_socket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/socket.service */ "./src/app/shared/services/socket.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ClientComponent = /** @class */ (function () {
    function ClientComponent(router, auth, clientService, wsService, _http) {
        this.router = router;
        this.auth = auth;
        this.clientService = clientService;
        this.wsService = wsService;
        this._http = _http;
        this.htmlString = "";
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketLogic();
        this.clientService.getPosition().subscribe(function (res) {
            _this.htmlString = res.text();
            document.getElementById("position").innerHTML = _this.htmlString;
        }, function (err) {
            console.log(err);
        }, function () {
            // //getting anchor tag id and putting to url and writting to database
            //getting anchor tag id and putting to url and writting to database
            // let element = document.getElementById("test");
            // element.addEventListener("click", function () {
            //   console.log("ID is:" + this.id);
            //   var xhr = new XMLHttpRequest();
            //   xhr.open("POST", 'rest/link', true);
            //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //   xhr.onreadystatechange = function () {//Call a function when the state changes.
            //     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //       console.log('Succesful');
            //     }
            //   }
            //   var url = 'client/' + this.id;
            //   xhr.send("url=" + url);
            // });
        });
    };
    ClientComponent.prototype.logout = function () {
        var _this = this;
        this.auth.logout()
            .subscribe(function (res) {
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            _this.router.navigate(['/login']);
        }, function (err) { return console.log(err); });
    };
    ClientComponent.prototype.ngOnDestroy = function () {
        this.messages.unsubscribe();
        this.wsService.disconnect();
    };
    ClientComponent.prototype.mail = function () {
        if (localStorage.getItem('username') == "insurance") {
            this.clientService.sendMail('insurance').subscribe(function (res) {
                console.log('insurance');
            });
        }
        else if (localStorage.getItem('username') == "bank") {
            this.clientService.sendMail('bank').subscribe(function (res) {
                console.log('bank');
            });
        }
    };
    ClientComponent.prototype.socketLogic = function () {
        var _this = this;
        this.messages = this.wsService
            .connect('ws://192.168.60.13:8097/wscm/socket')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) {
            console.log(response.data);
            //// work with response from socket
            var x = document.getElementById("toast");
            x.innerHTML = response.data;
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 10000);
            //// work with response from socket
            return response.data;
        }));
        this.messages.subscribe(function (res) { }, function (err) { }, function () { });
        setTimeout(function () {
            if (localStorage.getItem('username') == "insurance") {
                _this._http.get('rest/content/test?name=insurance').subscribe(function (res) {
                    console.log(res);
                });
            }
            else if (localStorage.getItem('username') == "bank") {
                _this._http.get('rest/content/test?name=bank').subscribe(function (res) {
                    console.log(res);
                });
            }
        }, 4000);
    };
    ClientComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-client',
            template: __webpack_require__(/*! ./client.component.html */ "./src/app/client/client.component.html"),
            styles: [__webpack_require__(/*! ./client.component.scss */ "./src/app/client/client.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _client_service__WEBPACK_IMPORTED_MODULE_3__["ClientService"], _shared_services_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"], _angular_http__WEBPACK_IMPORTED_MODULE_6__["Http"]])
    ], ClientComponent);
    return ClientComponent;
}());



/***/ }),

/***/ "./src/app/client/client.service.ts":
/*!******************************************!*\
  !*** ./src/app/client/client.service.ts ***!
  \******************************************/
/*! exports provided: ClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientService", function() { return ClientService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClientService = /** @class */ (function () {
    function ClientService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/content/';
    }
    ClientService.prototype.getPosition = function () {
        return this._http.get(this.baseUrl + 'home/P1/EN');
    };
    ClientService.prototype.sendMail = function (user) {
        return this._http.get(this.baseUrl + 'testEmail?type=' + user);
    };
    ClientService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], ClientService);
    return ClientService;
}());



/***/ }),

/***/ "./src/app/content/content.component.html":
/*!************************************************!*\
  !*** ./src/app/content/content.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"flex\">\r\n  <app-panel></app-panel>\r\n\r\n  <div id=\"content\" *ngIf=\"dataSource\">\r\n    <h1>Content</h1>\r\n\r\n    <div class=\"content-wrapper\">\r\n      <!-- Add Content Button -->\r\n      <button class=\"add-button\" color=\"warn\" matTooltip=\"Add Content\" matTooltipPosition=\"above\" (click)=\"addContentDialog()\"\r\n        mat-mini-fab>\r\n        <i class=\"material-icons\">add</i>\r\n      </button>\r\n\r\n      <div *ngIf=\"dataSource\">\r\n        <!-- MATERIAL TABLE -->\r\n        <table mat-table class=\"mat-elevation-z8\" [dataSource]=\"dataSource\">\r\n          <ng-container matColumnDef=\"pages\">\r\n            <th mat-header-cell *matHeaderCellDef> Page </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.page | uppercase}} </td>\r\n          </ng-container>\r\n\r\n          <!-- Name -->\r\n          <ng-container matColumnDef=\"name\">\r\n            <th mat-header-cell *matHeaderCellDef> Position </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\r\n          </ng-container>\r\n          <!-- Language -->\r\n          <ng-container matColumnDef=\"language\">\r\n            <th mat-header-cell *matHeaderCellDef> Language </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.language}} </td>\r\n          </ng-container>\r\n\r\n          <!-- Weight -->\r\n          <ng-container matColumnDef=\"categories\">\r\n            <th mat-header-cell *matHeaderCellDef> Categories </th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <span *ngFor=\"let cat of element.contentCategorieses; let i = index\">{{i+1}}. {{cat.categories.description}}\r\n                <br>\r\n              </span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"edit\">\r\n            <th mat-header-cell *matHeaderCellDef> Edit </th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i (click)=\"editContentDialog(element)\" class=\"material-icons table-icons\" matTooltip=\"Edit position\" matTooltipPosition=\"above\">\r\n                edit\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n          <!-- Symbol -->\r\n          <ng-container matColumnDef=\"delete\">\r\n            <th mat-header-cell *matHeaderCellDef> Delete </th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i class=\"material-icons table-icons\" (click)=\"deleteDialog(element.id, 'position', element.position)\" matTooltip=\"Delete position\"\r\n                matTooltipPosition=\"above\">\r\n                delete\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n    <mat-paginator #paginator [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\" [showFirstLastButtons]=\"true\">\r\n    </mat-paginator>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/content/content.component.scss":
/*!************************************************!*\
  !*** ./src/app/content/content.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#content {\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/content/content.component.ts":
/*!**********************************************!*\
  !*** ./src/app/content/content.component.ts ***!
  \**********************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content.service */ "./src/app/content/content.service.ts");
/* harmony import */ var _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/snackbar.service */ "./src/app/shared/services/snackbar.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/dialogs/delete-dialog/delete-dialog.component */ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.ts");
/* harmony import */ var _shared_dialogs_add_content_dialog_add_content_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/dialogs/add-content-dialog/add-content-dialog.component */ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_dialogs_edit_content_dialog_edit_content_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/dialogs/edit-content-dialog/edit-content-dialog.component */ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ContentComponent = /** @class */ (function () {
    function ContentComponent(contentService, snackbar, dialog, router) {
        this.contentService = contentService;
        this.snackbar = snackbar;
        this.dialog = dialog;
        this.router = router;
        this.step = 1;
        this.listCategoryWeight = [];
        this.displayedColumns = ['pages', 'name', 'language', 'categories', 'edit', 'delete'];
    }
    // Get Positions
    ContentComponent.prototype.getPositions = function () {
        var _this = this;
        this.contentService.getPositions('home').subscribe(function (res) {
            console.log(res);
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](res['data']);
            _this.dataSource.paginator = _this.paginator;
            // this.dataSource.sort = this.sort;
        }, function (err) { return console.log(err); });
    };
    // Add Content Dialog
    ContentComponent.prototype.addContentDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_dialogs_add_content_dialog_add_content_dialog_component__WEBPACK_IMPORTED_MODULE_5__["AddContentDialogComponent"], {
            width: '1000px'
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.getPositions();
            }
        });
    };
    // Edit Content Dialog
    ContentComponent.prototype.editContentDialog = function (position) {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_dialogs_edit_content_dialog_edit_content_dialog_component__WEBPACK_IMPORTED_MODULE_7__["EditContentDialogComponent"], {
            width: '1000px',
            data: position
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.getPositions();
            }
        });
    };
    // Reset Data
    ContentComponent.prototype.resetData = function () {
        this.step = 1;
        this.listCategoryWeight = [];
    };
    // NEXT button
    ContentComponent.prototype.next = function (obj, step) {
        console.log(obj, step);
        switch (step) {
            case 1:
                this.step = 2;
                this.selectedPosition = obj;
                for (var _i = 0, _a = this.selectedPosition.contentCategorieses; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.listCategoryWeight.push(item);
                }
                break;
            case 2:
                this.step = 3;
                break;
        }
        console.log(this.listCategoryWeight);
    };
    // BACK button
    ContentComponent.prototype.back = function (currentStep) {
        switch (currentStep) {
            case 2:
                this.step = 1;
                this.listCategoryWeight = [];
                break;
            case 3:
                this.step = 2;
                break;
        }
    };
    // Select category -checkbox
    ContentComponent.prototype.checked = function (ev, categories) {
        if (ev.checked) {
            if (this.listCategoryWeight.length == 0) {
                this.listCategoryWeight.push({ categories: categories, weight: 1 });
                this.selectedPosition.contentCategorieses.push({
                    categories: categories,
                    weight: 1
                });
            }
            else {
                var push = false;
                for (var i = 0; i < this.listCategoryWeight.length; i++) {
                    if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
                        push = true;
                    }
                }
                if (push) {
                    this.listCategoryWeight.push({ categories: categories, weight: 1 });
                    this.selectedPosition.contentCategorieses.push({
                        categories: categories,
                        weight: 1
                    });
                }
            }
        }
        else {
            var index = this.listCategoryWeight.findIndex(function (item) { return item['categories'] == categories; });
            this.listCategoryWeight.splice(index, 1);
            var index2 = this.selectedPosition['contentCategorieses'].findIndex(function (item) { return item['categories'] == categories; });
            this.selectedPosition['contentCategorieses'].splice(index2, 1);
        }
        console.log(this.listCategoryWeight);
    };
    // Remove from list 'Selected categories'
    // unchecked(position) {
    //   if (this.listCategoryWeight.length > 0) {
    //     let index = this.listCategoryWeight.findIndex(
    //       item => item['categories'] == position.categories
    //     );
    //     this.listCategoryWeight.splice(index, 1);
    //     let index2 = this.selectedPosition['contentCategorieses'].findIndex(
    //       item => item['categories'] == position.categories
    //     );
    //     this.selectedPosition['contentCategorieses'].splice(index2, 1);
    //   }
    //   console.log(this.listCategoryWeight);
    // }
    // Delete Dialog
    ContentComponent.prototype.deleteDialog = function (id, type, value) {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_4__["DeleteDialog"], {
            width: '500px',
            data: { type: type, value: value }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.contentService.deletePosition(id).subscribe(function (res) {
                    // console.log(res);
                    _this.getPositions();
                }, function (err) { return console.log(err); });
            }
        });
    };
    // Send Request
    ContentComponent.prototype.save = function () {
        var _this = this;
        this.selectedPosition['contentCategorieses'] = this.listCategoryWeight;
        console.log(this.selectedPosition['contentCategorieses']);
        this.contentService.updateContent(this.selectedPosition).subscribe(function (res) {
            console.log(res);
            _this.snackbar.openSnackBar('Success', res['data']);
            _this.getPositions();
            _this.resetData();
        }, function (err) { return console.log(err); });
    };
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPositions();
        if (localStorage.getItem('role') == 'ROLE_USER') {
            this.router.navigate(['/client']);
        }
        // Get Categories
        this.contentService.getCategories().subscribe(function (res) {
            console.log(res);
            _this.categories = res['data'];
            console.log(_this.categories);
        }, function (err) { return console.log(err); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], ContentComponent.prototype, "paginator", void 0);
    ContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-content',
            template: __webpack_require__(/*! ./content.component.html */ "./src/app/content/content.component.html"),
            styles: [__webpack_require__(/*! ./content.component.scss */ "./src/app/content/content.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_content_service__WEBPACK_IMPORTED_MODULE_1__["ContentService"],
            _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_2__["SnackBarService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "./src/app/content/content.service.ts":
/*!********************************************!*\
  !*** ./src/app/content/content.service.ts ***!
  \********************************************/
/*! exports provided: ContentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentService", function() { return ContentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentService = /** @class */ (function () {
    function ContentService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/admin/content';
        this.options = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'application/json' }) };
    }
    // Get array of positions
    ContentService.prototype.getPositions = function (page) {
        return this._http.get(this.baseUrl + '/' + page).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return res; }));
    };
    // Get content of position
    ContentService.prototype.getContent = function (page, position, lang) {
        return this._http.get(this.baseUrl + '/' + page + '/' + position + '/' + lang).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return res; }));
    };
    // Get Categories
    ContentService.prototype.getCategories = function () {
        return this._http.get(this.baseUrl + '/' + 'categories').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return res; }));
    };
    // Add position
    ContentService.prototype.addContent = function (obj) {
        return this._http.post(this.baseUrl, obj, this.options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return res; }));
    };
    // Update position
    ContentService.prototype.updateContent = function (obj) {
        return this._http.post(this.baseUrl + '/edit', obj, this.options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) { return res; }));
    };
    // Delete Position
    ContentService.prototype.deletePosition = function (id) {
        return this._http.delete(this.baseUrl + '/' + id, this.options);
    };
    ContentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ContentService);
    return ContentService;
}());



/***/ }),

/***/ "./src/app/events/events.component.html":
/*!**********************************************!*\
  !*** ./src/app/events/events.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"display:flex\">\r\n  <app-panel></app-panel>\r\n  <div id=\"events\">\r\n    <h1>Events</h1>\r\n    <div class=\"content-wrapper\">\r\n      <!-- Add Job Button -->\r\n      <button class=\"add-button\" color=\"warn\" matTooltip=\"Add Event\" matTooltipPosition=\"above\" (click)=\"openAddDialog()\" mat-mini-fab>\r\n        <i class=\"material-icons\">add</i>\r\n      </button>\r\n      <!-- Table template -->\r\n      <div *ngIf=\"events\">\r\n        <!-- Table -->\r\n        <table mat-table [dataSource]=\"events\" class=\"mat-elevation-z8\">\r\n          <!-- ID -->\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef> Id </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.id}} </td>\r\n          </ng-container>\r\n          <!-- Event Name -->\r\n          <ng-container matColumnDef=\"eventName\">\r\n            <th mat-header-cell *matHeaderCellDef> Event Name </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.eventName}} </td>\r\n          </ng-container>\r\n          <!-- Job Name -->\r\n          <ng-container matColumnDef=\"jobName\">\r\n            <th mat-header-cell *matHeaderCellDef> Job Name </th>\r\n            <td mat-cell *matCellDef=\"let element\">{{element.jobs.jobName}}</td>\r\n          </ng-container>\r\n          <!-- Event Type -->\r\n          <ng-container matColumnDef=\"eventType\">\r\n            <th mat-header-cell *matHeaderCellDef> Event Type </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.eventType}} </td>\r\n          </ng-container>\r\n          <!-- Cron Ex -->\r\n          <ng-container matColumnDef=\"definition\">\r\n            <th mat-header-cell *matHeaderCellDef> Definition</th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.jobs.cronExpression}} </td>\r\n          </ng-container>\r\n          <!-- Description -->\r\n          <ng-container matColumnDef=\"description\">\r\n            <th mat-header-cell *matHeaderCellDef> Description</th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.description}} </td>\r\n          </ng-container>\r\n          <!-- Status -->\r\n          <ng-container matColumnDef=\"status\">\r\n            <th mat-header-cell *matHeaderCellDef> Status</th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.status}} </td>\r\n          </ng-container>\r\n          <!-- Change Status -->\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef> Actions</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i matTooltip=\"Start Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"start(element)\">\r\n                play_arrow\r\n              </i>\r\n              <i matTooltip=\"Stop Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"stop(element)\">\r\n                stop\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n          <!-- History -->\r\n          <ng-container matColumnDef=\"history\">\r\n            <th mat-header-cell *matHeaderCellDef> History</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i matTooltip=\"History\" matTooltipPosition=\"above\" class=\"material-icons table-icons\">\r\n                history\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n          <!-- Actions -->\r\n          <ng-container matColumnDef=\"editing\">\r\n            <th mat-header-cell *matHeaderCellDef> Editing</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i matTooltip=\"Edit Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"editDialog(element)\">\r\n                edit\r\n              </i>\r\n              <i matTooltip=\"Delete Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"deleteJob(element.id)\">\r\n                delete\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n      </div>\r\n    </div>\r\n    <!-- Add Job -->\r\n    <!-- <app-add-job *ngIf=\"addJobShow\"></app-add-job> -->\r\n\r\n    <!-- Edit Job Template -->\r\n    <!-- <app-edit-job *ngIf=\"editJobShow\" [currentJob]=\"currentJob\"></app-edit-job> -->\r\n\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/events/events.component.scss":
/*!**********************************************!*\
  !*** ./src/app/events/events.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#events {\n  width: 100%; }\n\n#events .mat-input-element::-moz-selection {\n    background: #009688; }\n\n#events .mat-input-element::selection {\n    background: #009688; }\n"

/***/ }),

/***/ "./src/app/events/events.component.ts":
/*!********************************************!*\
  !*** ./src/app/events/events.component.ts ***!
  \********************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _events_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events.service */ "./src/app/events/events.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/snackbar.service */ "./src/app/shared/services/snackbar.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_dialogs_edit_event_dialog_edit_event_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/dialogs/edit-event-dialog/edit-event-dialog.component */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.ts");
/* harmony import */ var _shared_dialogs_add_event_dialog_add_event_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/dialogs/add-event-dialog/add-event-dialog.component */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.ts");
/* harmony import */ var _shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/dialogs/delete-dialog/delete-dialog.component */ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EventsComponent = /** @class */ (function () {
    function EventsComponent(eventsService, router, snackbar, dialog) {
        this.eventsService = eventsService;
        this.router = router;
        this.snackbar = snackbar;
        this.dialog = dialog;
        this.displayedColumns = [
            'id',
            'eventName',
            'jobName',
            'eventType',
            'definition',
            'description',
            'status',
            'actions',
            'history',
            'editing'
        ];
    }
    // Get List
    EventsComponent.prototype.getList = function () {
        var _this = this;
        this.eventsService.getJobs().subscribe(function (res) {
            _this.events = res.data;
            console.log(_this.events);
        }, function (err) { return console.log(err); });
    };
    // open add dialog
    EventsComponent.prototype.openAddDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_dialogs_add_event_dialog_add_event_dialog_component__WEBPACK_IMPORTED_MODULE_6__["AddEventDialogComponent"], {
            width: '800px',
        });
        // console.log(obj);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.getList();
            console.log(res);
            console.log('uspesno');
        });
    };
    // open edit dialog
    EventsComponent.prototype.editDialog = function (obj) {
        var _this = this;
        // this.currentJob = job;
        var dialogRef = this.dialog.open(_shared_dialogs_edit_event_dialog_edit_event_dialog_component__WEBPACK_IMPORTED_MODULE_5__["EditEventDialogComponent"], {
            width: '800px',
            data: obj
        });
        console.log(obj);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.getList();
            console.log(res);
            console.log('uspesno');
        });
        // dialogRef.afterClosed().subscribe(res => {
        //   if (res) {
        //     this.contentService.updateContent(id).subscribe(
        //       res => {
        //         console.log(res);
        //       },
        //       err => console.log(err)
        //     );
        //   }
        // });
    };
    // Delete Job
    EventsComponent.prototype.deleteJob = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_dialogs_delete_dialog_delete_dialog_component__WEBPACK_IMPORTED_MODULE_7__["DeleteDialog"], {
            width: '500px',
            data: { id: id }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.eventsService.deleteJob(id).subscribe(function (res) {
                    console.log(res);
                    _this.getList();
                }, function (err) { return console.log(err); });
            }
        });
    };
    // Start Job
    EventsComponent.prototype.start = function (job) {
        var _this = this;
        this.eventsService.startJob(job.id).subscribe(function (res) {
            console.log(res);
            _this.snackbar.openSnackBar('Success', res.message);
            // this.successMessage(res.message);
            return (job.status = 'ACTIVE');
        }, function (err) {
            console.log(err);
            // this.errorMessage(err);
        });
    };
    // Stop Job
    EventsComponent.prototype.stop = function (job) {
        this.eventsService.stopJob(job.id).subscribe(function (res) {
            console.log(res);
            // this.successMessage(res.message);
            return (job.status = 'INACTIVE');
        }, function (err) {
            console.log(err);
            // this.errorMessage(err);
        });
    };
    EventsComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('role') == 'ROLE_USER') {
            this.router.navigate(['/client']);
        }
        this.getList();
    };
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-events',
            template: __webpack_require__(/*! ./events.component.html */ "./src/app/events/events.component.html"),
            styles: [__webpack_require__(/*! ./events.component.scss */ "./src/app/events/events.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_events_service__WEBPACK_IMPORTED_MODULE_1__["EventsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_3__["SnackBarService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/events/events.service.ts":
/*!******************************************!*\
  !*** ./src/app/events/events.service.ts ***!
  \******************************************/
/*! exports provided: EventsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsService", function() { return EventsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventsService = /** @class */ (function () {
    function EventsService(_http) {
        this._http = _http;
        this.baseUrl = '/wscm/rest/scheduler/';
    }
    EventsService.prototype.getJobs = function () {
        return this._http.get(this.baseUrl + 'events');
    };
    EventsService.prototype.startJob = function (id) {
        return this._http.post(this.baseUrl + 'startJob/' + id, null);
    };
    EventsService.prototype.stopJob = function (id) {
        return this._http.post(this.baseUrl + 'stopJob/' + id, null);
    };
    EventsService.prototype.deleteJob = function (id) {
        return this._http.delete(this.baseUrl + 'events/' + id);
    };
    EventsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EventsService);
    return EventsService;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"display:flex\">\r\n    <app-panel></app-panel>\r\n    <div id=\"home\">\r\n        <h1>Dashboard</h1>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#home {\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(router) {
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('role') == 'ROLE_USER') {
            this.router.navigate(['/client']);
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/jobs/jobs.component.html":
/*!******************************************!*\
  !*** ./src/app/jobs/jobs.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"display:flex\">\r\n  <app-panel></app-panel>\r\n  <div id=\"jobs\">\r\n    <h1>Jobs</h1>\r\n    <div class=\"content-wrapper\">\r\n      <!-- Add Job Button -->\r\n      <button class=\"add-button\" color=\"warn\" matTooltip=\"Add Job\" matTooltipPosition=\"above\" (click)=\"openAddDialog()\" mat-mini-fab>\r\n        <i class=\"material-icons\">add</i>\r\n      </button>\r\n      <!-- Table template -->\r\n      <div *ngIf=\"jobs\">\r\n        <!-- Table -->\r\n        <table mat-table [dataSource]=\"jobs\" class=\"mat-elevation-z8\">\r\n          <!-- Job Name -->\r\n          <ng-container matColumnDef=\"jobName\">\r\n            <th mat-header-cell *matHeaderCellDef> Job Name </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.jobName}} </td>\r\n          </ng-container>\r\n          <!-- Job Type -->\r\n          <ng-container matColumnDef=\"jobType\">\r\n            <th mat-header-cell *matHeaderCellDef> Job Type </th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <span *ngIf=\"element.jobType\">{{element.jobType.typeName}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <!-- Job Status -->\r\n          <ng-container matColumnDef=\"status\">\r\n            <th mat-header-cell *matHeaderCellDef> Status </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.status}} </td>\r\n          </ng-container>\r\n          <!-- Class Loading -->\r\n          <ng-container matColumnDef=\"classLoading\">\r\n            <th mat-header-cell *matHeaderCellDef> Class Loading </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element.classLoading}} </td>\r\n          </ng-container>\r\n          <!-- CronExpression -->\r\n          <ng-container matColumnDef=\"cronExpression\">\r\n            <th mat-header-cell *matHeaderCellDef> Definition </th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <span *ngIf=\"element.cronExpression\">{{element.cronExpression}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <!-- Actions -->\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef> Actions</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i matTooltip=\"Start Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"start(element)\">\r\n                play_arrow\r\n              </i>\r\n              <i matTooltip=\"Stop Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\" (click)=\"stop(element)\">\r\n                stop\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n          <!-- Editing -->\r\n          <ng-container matColumnDef=\"editing\">\r\n            <th mat-header-cell *matHeaderCellDef> Editing</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <i matTooltip=\"Edit Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\">\r\n                edit\r\n              </i>\r\n              <i matTooltip=\"Delete Job\" matTooltipPosition=\"above\" class=\"material-icons table-icons\">\r\n                delete\r\n              </i>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n        <!-- PAGINATOR -->\r\n        <mat-paginator *ngIf=\"jobs\" #paginator [length]=\"jobs.length\" [pageIndex]=\"0\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n          [showFirstLastButtons]=\"true\">\r\n        </mat-paginator>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/jobs/jobs.component.scss":
/*!******************************************!*\
  !*** ./src/app/jobs/jobs.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#jobs {\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/jobs/jobs.component.ts":
/*!****************************************!*\
  !*** ./src/app/jobs/jobs.component.ts ***!
  \****************************************/
/*! exports provided: JobsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobsComponent", function() { return JobsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _jobs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jobs.service */ "./src/app/jobs/jobs.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobsComponent = /** @class */ (function () {
    // dataSource = new MatTableDataSource<Element>(this.jobs);
    function JobsComponent(jobService) {
        this.jobService = jobService;
        this.displayedColumns = [
            'jobName',
            'jobType',
            'status',
            'classLoading',
            'cronExpression',
            'actions',
            'editing'
        ];
    }
    JobsComponent.prototype.getList = function () {
        var _this = this;
        this.jobService.getJobs().subscribe(function (res) {
            _this.jobs = res.data;
            console.log(_this.jobs);
        }, function (err) { return console.log(err); });
    };
    // Start Job
    JobsComponent.prototype.start = function (job) {
        this.jobService.startJob(job.id).subscribe(function (res) {
            console.log(res);
            // this.snackbar.openSnackBar('Success', res.message);
            // this.successMessage(res.message);
            return (job.status = 'ACTIVE');
        }, function (err) {
            console.log(err);
            // this.errorMessage(err);
        });
    };
    // Stop Job
    JobsComponent.prototype.stop = function (job) {
        this.jobService.stopJob(job.id).subscribe(function (res) {
            console.log(res);
            // this.successMessage(res.message);
            return (job.status = 'INACTIVE');
        }, function (err) {
            console.log(err);
            // this.errorMessage(err);
        });
    };
    JobsComponent.prototype.ngOnInit = function () {
        this.getList();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](this.jobs);
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], JobsComponent.prototype, "paginator", void 0);
    JobsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jobs',
            template: __webpack_require__(/*! ./jobs.component.html */ "./src/app/jobs/jobs.component.html"),
            styles: [__webpack_require__(/*! ./jobs.component.scss */ "./src/app/jobs/jobs.component.scss")]
        }),
        __metadata("design:paramtypes", [_jobs_service__WEBPACK_IMPORTED_MODULE_2__["JobsService"]])
    ], JobsComponent);
    return JobsComponent;
}());



/***/ }),

/***/ "./src/app/jobs/jobs.service.ts":
/*!**************************************!*\
  !*** ./src/app/jobs/jobs.service.ts ***!
  \**************************************/
/*! exports provided: JobsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobsService", function() { return JobsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JobsService = /** @class */ (function () {
    function JobsService(_http) {
        this._http = _http;
        this.baseUrl = '/wscm/rest/scheduler/';
    }
    JobsService.prototype.getJobs = function () {
        return this._http.get(this.baseUrl + 'jobs');
    };
    JobsService.prototype.startJob = function (id) {
        return this._http.post(this.baseUrl + 'startJob/' + id, null);
    };
    JobsService.prototype.stopJob = function (id) {
        return this._http.post(this.baseUrl + 'stopJob/' + id, null);
    };
    JobsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], JobsService);
    return JobsService;
}());



/***/ }),

/***/ "./src/app/languages/languages.component.html":
/*!****************************************************!*\
  !*** ./src/app/languages/languages.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"display:flex\">\r\n    <app-panel></app-panel>\r\n    <div id=\"languages\">\r\n        <h1>Languages</h1>\r\n        <p>\r\n            languages works!\r\n        </p>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/languages/languages.component.scss":
/*!****************************************************!*\
  !*** ./src/app/languages/languages.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#languages {\n  width: 80%; }\n\n#languages p {\n    color: black; }\n\n#languages p::-moz-selection {\n    background-color: #009688; }\n\n#languages p::selection {\n    background-color: #009688; }\n"

/***/ }),

/***/ "./src/app/languages/languages.component.ts":
/*!**************************************************!*\
  !*** ./src/app/languages/languages.component.ts ***!
  \**************************************************/
/*! exports provided: LanguagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagesComponent", function() { return LanguagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LanguagesComponent = /** @class */ (function () {
    function LanguagesComponent(router) {
        this.router = router;
    }
    LanguagesComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('role') == 'ROLE_USER') {
            this.router.navigate(['/client']);
        }
    };
    LanguagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-languages',
            template: __webpack_require__(/*! ./languages.component.html */ "./src/app/languages/languages.component.html"),
            styles: [__webpack_require__(/*! ./languages.component.scss */ "./src/app/languages/languages.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LanguagesComponent);
    return LanguagesComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"login\">\r\n  <!-- Left Side -->\r\n  <div id=\"leftSide\"><h1>Content Management</h1><h4>\"Neque porro quisquam est qui dolorem...\"</h4></div>\r\n\r\n  <!-- Right Side -->\r\n  <div id=\"rightSide\">\r\n    <!-- Login Card -->\r\n    <mat-card class=\"card-login\">\r\n      <!-- Card Header -->\r\n      <mat-card-header>\r\n        <mat-card-title>Login</mat-card-title>\r\n        <mat-card-subtitle>Enter your username and password to login.</mat-card-subtitle>\r\n      </mat-card-header>\r\n\r\n      <!-- Login Form  -->\r\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"loginUser()\">\r\n        <mat-card-content>\r\n          <div class=\"form-container\">\r\n            <!-- Username -->\r\n            <p>\r\n              <mat-form-field>\r\n                <input formControlName=\"username\" name=\"username\" id=\"username\" type=\"text\" matInput placeholder=\"Username\">\r\n              </mat-form-field>\r\n            </p>\r\n            <!-- Password -->\r\n            <p>\r\n              <mat-form-field>\r\n                <input formControlName=\"password\" name=\"password\" id=\"password\" type=\"password\" matInput placeholder=\"Password\">\r\n              </mat-form-field>\r\n            </p>\r\n          </div>\r\n        </mat-card-content>\r\n        <!-- Card Actions -->\r\n        <mat-card-actions>\r\n          <button type=\"submit\"  [disabled]=\"username.errors ||  password.errors\" align=\"end\" mat-raised-button color=\"primary\">Login</button>\r\n        </mat-card-actions>\r\n      </form>\r\n    </mat-card>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n */\n\n/* Theme for the ripple elements.*/\n\n/* stylelint-disable material/no-prefixes */\n\n/* stylelint-enable */\n\n#login {\n  height: 100vh;\n  display: flex;\n  align-items: left;\n  justify-content: left;\n  overflow: hidden;\n  z-index: 10;\n  width: 100%; }\n\n#login #leftSide {\n    background-image: linear-gradient(rgba(0, 150, 136, 0.9), rgba(0, 150, 136, 0.1)), url('/wscm/wscm/dist/login4.jpg');\n    background-repeat: no-repeat;\n    display: flex;\n    flex-direction: column;\n    background-size: cover;\n    width: 70%;\n    height: 100%;\n    top: 0;\n    margin-left: -84px;\n    -webkit-transform-origin: bottom right;\n            transform-origin: bottom right;\n    -webkit-transform: skewX(-5deg);\n            transform: skewX(-5deg);\n    color: white;\n    align-items: center;\n    justify-content: center; }\n\n#login h1::-moz-selection {\n    background: #009688;\n    color: white; }\n\n#login h1::selection {\n    background: #009688;\n    color: white; }\n\n#login h4::-moz-selection {\n    background: #009688;\n    color: white; }\n\n#login h4::selection {\n    background: #009688;\n    color: white; }\n\n#login .card-login {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 370px;\n    height: 50%;\n    box-shadow: 0px 3px 1px -2px rgba(119, 119, 119, 0.18), 0px 2px 2px 0px rgba(119, 119, 119, 0.126), 0px 1px 5px 0px rgba(119, 119, 119, 0.108); }\n\n#login .mat-card-header-text {\n    text-align: center; }\n\n#login .mat-form-field-infix {\n    width: 220px; }\n\n#login .card-login:hover {\n    box-shadow: 0 10px 6px -6px #777; }\n\n#login .mat-card-title {\n    font-size: 25px;\n    text-align: left;\n    color: #bdbdbd; }\n\n#login .mat-card-title::-moz-selection {\n    background: #009688;\n    color: white; }\n\n#login .mat-card-title::selection {\n    background: #009688;\n    color: white; }\n\n#login .mat-card-subtitle::-moz-selection {\n    background: #009688;\n    color: white; }\n\n#login .mat-card-subtitle::selection {\n    background: #009688;\n    color: white; }\n\n#login #rightSide {\n    padding: 0 1%;\n    background-color: #FFEE58;\n    display: flex;\n    width: 70%;\n    align-items: center;\n    justify-content: center; }\n\n#login .mat-card-actions {\n    margin-left: 0; }\n\n#login .mat-card-header-text {\n    margin: 0; }\n\n#login .mat-form-field.mat-form-field-invalid .mat-form-field-label {\n    color: #009688; }\n\n#login .mat-form-field.mat-form-field-invalid .mat-form-field-ripple {\n    background-color: #64FFDA; }\n\n#login button {\n    float: right;\n    outline: none; }\n\n#login .mat-input-element {\n    color: black; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.service */ "./src/app/login/login.service.ts");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/snackbar.service */ "./src/app/shared/services/snackbar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, loginService, router, auth, snackBarService) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.router = router;
        this.auth = auth;
        this.snackBarService = snackBarService;
    }
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        if (!this.username.value) {
            this.snackBarService.openSnackBar('Please enter your username.', 'Missing username.');
        }
        else if (!this.password.value) {
            this.snackBarService.openSnackBar('Please enter your password.', 'Missing password.');
        }
        else {
            var obj_1 = {
                username: this.username.value,
                password: this.password.value
            };
            this.auth.login(obj_1).subscribe(function (res) {
                console.log(res);
                var body = JSON.parse(res.text());
                localStorage.setItem('role', body.role);
                localStorage.setItem('username', obj_1.username);
                _this.router.navigate(['/home']);
            }, function (err) {
                _this.snackBarService.openSnackBar(err.statusText, 'Error');
                console.log(err);
            });
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('username') != null && localStorage.getItem('role') != null) {
            if (localStorage.getItem('role') == 'ROLE_USER') {
                this.router.navigate(['/client']);
            }
            else {
                this.router.navigate(['/home']);
            }
        }
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "username", {
        get: function () {
            return this.loginForm.get('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _shared_services_snackbar_service__WEBPACK_IMPORTED_MODULE_5__["SnackBarService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.service.ts":
/*!****************************************!*\
  !*** ./src/app/login/login.service.ts ***!
  \****************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { map } from 'rxjs/operators';
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
        this.url = 'authentication';
    }
    LoginService.prototype.login = function (data) {
        return this.http.post(this.url, data);
    };
    LoginService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "./src/app/mail-redirect/mail-redirect.component.html":
/*!************************************************************!*\
  !*** ./src/app/mail-redirect/mail-redirect.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar\" style=\"background-color:rgb(52, 82, 255);\">\r\n    <a class=\"navbar-brand\" href=\"#\" style=\"color:white\">ICAP - Intelligent Content and Ad Provider</a>\r\n</nav>\r\n<nav class=\"navbar navbar-expand-lg navbar-light bg-light rounded\">\r\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExample10\" aria-controls=\"navbarsExample10\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n          <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n\r\n    <div class=\"collapse navbar-collapse justify-content-md-center\" id=\"navbarsExample10\">\r\n        <ul class=\"navbar-nav\">\r\n            <li class=\"nav-item active\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link\" href=\"#\">HOME<span class=\"sr-only\">(current)</span></a>\r\n            </li>\r\n            <li class=\"nav-item\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link\" href=\"#\">ABOUT US</a>\r\n            </li>\r\n            <li class=\"nav-item dropdown\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link dropdown-toggle\" href=\"https://example.com\" id=\"dropdown10\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Services</a>\r\n                <div class=\"dropdown-menu\" aria-labelledby=\"dropdown10\">\r\n                    <a class=\"dropdown-item\" href=\"#\">Banking</a>\r\n                    <a class=\"dropdown-item\" href=\"#\">Insurance</a>\r\n                </div>\r\n            </li>\r\n            <li class=\"nav-item\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link\" href=\"#\">WORKS</a>\r\n            </li>\r\n            <li class=\"nav-item\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link\" href=\"#\">CONTACT</a>\r\n            </li>\r\n            <li class=\"nav-item\" style=\"margin-left:20px;\">\r\n                <a class=\"nav-link\" (click)=\"logout()\">\r\n                    <span class=\"material-icons\" id=\"forHover\">\r\n                        exit_to_app\r\n                    </span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>\r\n<div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\r\n    <ol class=\"carousel-indicators\">\r\n        <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\r\n        <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\r\n    </ol>\r\n    <div class=\"carousel-inner\">\r\n        <div class=\"carousel-item active\">\r\n            <img class=\"first-slide img-fluid\" src=\"wscm/src/assets/mail2.jpg\" alt=\"First slide\">\r\n            <div class=\"container\">\r\n                <div class=\"carousel-caption text-left\">\r\n                    <h1>Prepare for the future with our advisors</h1>\r\n                    <p>Interactively simplify 24/7 markets through 24/7 best practices. Authoritatively foster cutting-edge manufactured products and distinctive.</p>\r\n                    <a class=\"btn btn-lg\" href=\"#\" role=\"button\" style=\"background-color:rgb(52, 82, 255);color:white;\">Meet Experts</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"carousel-item\">\r\n            <img class=\"second-slide img-fluid\" src=\"wscm/src/assets/mail3.jpg\" alt=\"Second slide\">\r\n            <div class=\"container\">\r\n                <div class=\"carousel-caption\">\r\n                    <h1>Prepare for the future with our advisors</h1>\r\n                    <p>Interactively simplify 24/7 markets through 24/7 best practices. Authoritatively foster cutting-edge manufactured products and distinctive.</p>\r\n                    <a class=\"btn btn-lg\" href=\"#\" role=\"button\" style=\"background-color:rgb(52, 82, 255);color:white;\">Meet Experts</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <a class=\"carousel-control-prev\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\r\n        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\" style=\"background-color:rgb(52, 82, 255);\"></span>\r\n        <span class=\"sr-only\">Previous</span>\r\n    </a>\r\n    <a class=\"carousel-control-next\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\r\n        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\" style=\"background-color:rgb(52, 82, 255);\"></span>\r\n        <span class=\"sr-only\">Next</span>\r\n    </a>\r\n</div>\r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div id=\"welcome\" class=\"col-sm-12\">\r\n            <h2>Welcom to ICAP</h2>\r\n            <br>\r\n            <p>Interactively simplify 24/7 markets through 24/7 best practices. Authoritatively</p>\r\n            <p style=\"margin-top:10px;\">foster cutting-edge manufactured products and distinctive.</p>\r\n        </div>\r\n    </div>\r\n    <div class=\"row cards\">\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"card \">\r\n                <img class=\"card-img-top\" src=\"wscm/src/assets/card.jpg\">\r\n                <div class=\"card-body\">\r\n                    <h5 class=\"card-title\">About Business</h5>\r\n                    <p class=\"card-text\">Seamlessly envisioneer extensive interfaces and back wardcompatible applications. Proactively promote timely best.</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"card \">\r\n                <img class=\"card-img-top\" src=\"wscm/src/assets/growth.jpg\">\r\n                <div class=\"card-body\">\r\n                    <h5 class=\"card-title\">Business Growth</h5>\r\n                    <p class=\"card-text\">Seamlessly envisioneer extensive interfaces and back wardcompatible applications. Proactively promote timely best.</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"card\" >\r\n                <img class=\"card-img-top\" src=\"wscm/src/assets/strategy.jpg\">\r\n                <div class=\"card-body\">\r\n                    <h5 class=\"card-title\">Sustainability</h5>\r\n                    <p class=\"card-text\">Seamlessly envisioneer extensive interfaces and back wardcompatible applications. Proactively promote timely best.</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" id=\"like\" style=\"margin-top:6%;margin-bottom:5%;\">\r\n        <div class=\"col-md-6\">\r\n            <h2>A Finance Agency Crafting Beautiful & Engaging Online Experiences</h2>\r\n            <br>\r\n            <p>Seamlessly communicate distinctive alignments and business models. Efficiently whiteboard robust meta-services whereas stand-alone synergy. Enthusiastically engage premier supply chains after intuitive testing procedures. Conveniently parallel\r\n                task robust imperatives through corporate customer service.\r\n            </p>\r\n            <br>\r\n            <p>\r\n                Dynamically productivate tactical mindshare via business collaboration and idea-sharing. Credibly conceptualize extensive schemas for functionalized metrics.\r\n            </p>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n            <img class=\"img-fluid\" src=\"wscm/src/assets/like.jpg\" alt=\"\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<footer class=\"page-footer font-small blue pt-4\" style=\"background-color:rgb(52, 82, 255);\">\r\n    <div class=\"container-fluid text-center text-md-left\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-9 mt-md-0 mt-3\">\r\n                <h5 class=\"text-uppercase\">ICAP</h5>\r\n                <p>Intelligent Content and Ad Provider</p>\r\n            </div>\r\n            <hr class=\"clearfix w-100 d-md-none pb-3\">\r\n            <div class=\"col-md-3 mb-md-0 mb-3\">\r\n                <h5 class=\"text-uppercase\">Useful Links</h5>\r\n                <ul class=\"list-unstyled\">\r\n                    <li>\r\n                        <a href=\"#!\">HOME</a>\r\n                    </li>\r\n                    <li>\r\n                        <a href=\"#!\">ABOUT US</a>\r\n                    </li>\r\n                    <li>\r\n                        <a href=\"#!\">SERVICES</a>\r\n                    </li>\r\n                    <li>\r\n                        <a href=\"#!\">CONTACT</a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer-copyright text-center py-3\">\r\n        <a href=\"http://kireygroup.com/\" style=\"\">© 2018 Copyright:Kirey Group</a>\r\n    </div>\r\n</footer>"

/***/ }),

/***/ "./src/app/mail-redirect/mail-redirect.component.scss":
/*!************************************************************!*\
  !*** ./src/app/mail-redirect/mail-redirect.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#welcome {\n  text-align: center;\n  margin-top: 6%; }\n\n.myCard {\n  text-align: center; }\n\nfooter a {\n  color: white; }\n\nfooter h5 {\n  color: white; }\n\nfooter p {\n  color: white; }\n\n@-webkit-keyframes bounce {\n  0%,\n  20%,\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  40% {\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px); }\n  80% {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); } }\n\n@keyframes bounce {\n  0%,\n  20%,\n  60%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  40% {\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px); }\n  80% {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); } }\n\n.card .card-body:hover {\n  background-color: #3452ff;\n  color: white;\n  -webkit-animation: bounce 1s;\n          animation: bounce 1s; }\n\n#welcome {\n  -webkit-animation-duration: 3s;\n          animation-duration: 3s;\n  -webkit-animation-name: slidein;\n          animation-name: slidein; }\n\n@-webkit-keyframes slidein {\n  from {\n    margin-left: 100%;\n    width: 300%; }\n  to {\n    margin-left: 0%;\n    width: 100%; } }\n\n@keyframes slidein {\n  from {\n    margin-left: 100%;\n    width: 300%; }\n  to {\n    margin-left: 0%;\n    width: 100%; } }\n\n@media only screen and (max-width: 900px) {\n  .navbar-brand {\n    font-size: 18px; }\n  .carousel {\n    height: 250px; }\n  .carousel-inner img {\n    height: 250px; }\n  .carousel-caption h1 {\n    color: #3452ff;\n    font-size: 18px; }\n  .carousel-caption p {\n    color: #3452ff;\n    font-size: 12px; }\n  .carousel-caption a {\n    border: none;\n    color: white;\n    padding: 4px 12px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin: 4px 2px;\n    cursor: pointer; }\n  .carousel-item img {\n    opacity: 0.5; } }\n"

/***/ }),

/***/ "./src/app/mail-redirect/mail-redirect.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/mail-redirect/mail-redirect.component.ts ***!
  \**********************************************************/
/*! exports provided: MailRedirectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailRedirectComponent", function() { return MailRedirectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MailRedirectComponent = /** @class */ (function () {
    function MailRedirectComponent() {
    }
    MailRedirectComponent.prototype.ngOnInit = function () {
    };
    MailRedirectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mail-redirect',
            template: __webpack_require__(/*! ./mail-redirect.component.html */ "./src/app/mail-redirect/mail-redirect.component.html"),
            styles: [__webpack_require__(/*! ./mail-redirect.component.scss */ "./src/app/mail-redirect/mail-redirect.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MailRedirectComponent);
    return MailRedirectComponent;
}());



/***/ }),

/***/ "./src/app/panel/panel.component.html":
/*!********************************************!*\
  !*** ./src/app/panel/panel.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"panel\">\r\n  <!-- Sidenav content -->\r\n\r\n  <div *ngIf=\"auth.isLoggedIn()\" id=\"sidebar-content\">\r\n    <mat-sidenav-container>\r\n      <!-- User image - info -->\r\n      <div id=\"userInfo\">\r\n        <div id=\"placeholderUser\">\r\n        </div>\r\n        <p>\r\n          <em>Welcome,</em>\r\n          <br>\r\n          <strong> User Name</strong>\r\n        </p>\r\n        <hr>\r\n      </div>\r\n      <!-- Sidenav links -->\r\n      <mat-nav-list>\r\n        <a mat-list-item routerLink=\"/home\" routerLinkActive=\"active\">\r\n          <mat-icon>home</mat-icon>Home</a>\r\n      </mat-nav-list>\r\n      <mat-nav-list>\r\n        <a mat-list-item routerLink=\"/content\" routerLinkActive=\"active\">\r\n          <i class=\"material-icons\">\r\n            vertical_split\r\n          </i> Content</a>\r\n      </mat-nav-list>\r\n      <mat-nav-list>\r\n        <a mat-list-item routerLink=\"/scheduler\" routerLinkActive=\"active\">\r\n          <i class=\"material-icons\">\r\n            access_time\r\n          </i>events</a>\r\n      </mat-nav-list>\r\n      <mat-nav-list>\r\n        <a mat-list-item routerLink=\"/jobs\" routerLinkActive=\"active\">\r\n          <i class=\"material-icons\">\r\n            list\r\n          </i>Jobs</a>\r\n      </mat-nav-list>\r\n      <!-- <mat-nav-list>\r\n        <a mat-list-item routerLink=\"/languages\" routerLinkActive=\"active\">\r\n          <i class=\"material-icons\">\r\n            language\r\n          </i>Languages</a>\r\n      </mat-nav-list> -->\r\n    </mat-sidenav-container>\r\n    <mat-sidenav-container class=\"secondSide\">\r\n      <mat-nav-list class=\"logoutBut\">\r\n        <a mat-list-item (click)=\"logout()\">\r\n          <i class=\"material-icons\">\r\n            exit_to_app\r\n          </i>logout</a>\r\n      </mat-nav-list>\r\n    </mat-sidenav-container>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/panel/panel.component.scss":
/*!********************************************!*\
  !*** ./src/app/panel/panel.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#panel {\n  min-width: 100%;\n  min-height: 100%; }\n\n#panel .router-outlet {\n    width: 100%; }\n\n#panel #sidebar-content {\n    background: linear-gradient(to bottom, #009688, #64FFDA);\n    margin-left: 0;\n    text-align: left;\n    background-color: #009688;\n    min-height: 100vh;\n    width: 320px;\n    padding-right: 15px;\n    box-shadow: 0 5px 2px -1px rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 5px 10px 3px rgba(0, 0, 0, 0.12);\n    z-index: 1; }\n\n#panel mat-sidenav-container {\n    background: transparent;\n    min-height: auto;\n    width: 280px;\n    margin: 0 20px;\n    text-align: left; }\n\n#panel #placeholderUser {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC9klEQVRoQ+1YC0tqQRAeU1PsrVGWoihoSQ8x//9f8EkpJkoqGpaakCnm4/ItGN3uzbuzrYfong8Ois2cmW+/nZ1pLfP5fE4/ABaTyDdT0VTkmwlCpiKmIitagZVvrdlsRhaLRTyrxEqIPD8/U71ep+FwSIt+u7a2RpubmxQMBml9fV07J61EkHSpVCIQWYbDw0Py+/1ayWglks/naTweSyW4t7dH4XBYylbGSBuRSqVCvV5PJuabTSgUIrfbzfL5zFgLkdfXV8rlcuyEUDeJRILt9zcHLUSazSa1Wi2lhGKxGLlcLiXf905aiBQKBXp5eVFK5vj4mI6OjpR8tRPhFPnHjFEjqJWvQosiNzc3omeowOv1ks/nU3H9zUcLkbu7O3p8fFRKJhqN0tbWlpKv9q01Go3o+vqanQzGFpxaOsYXLYqAgUrBo8hR7DqgjQiGw2w2S/iUgdPppLOzMxlTKRttRBBtMpmILYbPZdjY2KCTkxMtW2oRR5nIdDoVE+7T0xPhu8fjEZMtcH9/L56P6tjtdgoEArS7uyt8bm9vaTAYEH4/ODggDJOq9aJEBM2vWCy+jeiLVbFaraIn7OzsiJ+gzIIM/oYHE3K73aZGo/GHaDabjc7Pz4UdF2wiWEnUwrJ7PcxQaHRQyeFwCFuQ73Q61O/3l/pCncvLSy4P/uVDuVwWyawS2KL7+/usECxFoEYmk2EFUDHGFovH4yxXFpGHhweq1WqsAKrGqBVsS1mwiKDAccoYAcxfmMNkwSKSSqWWFqpsUBk79JrT01MZU2EjTQQnD4gYBe7pJU3EqEJ/v1DJZFJ63aSJoLmhfxiJq6sr6U7//xExemth5oIispBWBC9Mp9PSY7psAp/Z4XoVE7IsWES63S5Vq1XZd3/J7uLignVHzCKCzHB/hXusVSISidD29jYrBJsI3o4TDOMKuvy//omSzQZ9A8ljYsb0zIUSEW4QI+xNIkasMieGqQhntYywNRUxYpU5MUxFOKtlhO2PUeQXm4vVetzzfTwAAAAASUVORK5CYII=\");\n    height: 50px;\n    width: 50px;\n    border-radius: 50%;\n    margin: 20px 0;\n    background-repeat: no-repeat; }\n\n#panel div#placeholderUser:hover {\n    opacity: 0.8;\n    transition: 1s; }\n\n#panel #userInfo {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%; }\n\n#panel p {\n    color: white; }\n\n#panel em::-moz-selection {\n    background: #009688; }\n\n#panel em::selection {\n    background: #009688; }\n\n#panel strong::-moz-selection {\n    background: #009688; }\n\n#panel strong::selection {\n    background: #009688; }\n\n#panel hr {\n    background-color: white;\n    width: 100%;\n    opacity: 0.6; }\n\n#panel mat-nav-list {\n    padding-bottom: 5px;\n    overflow: hidden; }\n\n#panel mat-nav-list:hover {\n    box-shadow: inset 0px 11px 8px -10px #fff, inset 0px -11px 8px -10px #fff;\n    transition: 1s; }\n\n#panel a {\n    text-decoration: none;\n    color: white;\n    text-transform: uppercase; }\n\n#panel .material-icons {\n    color: white;\n    margin-right: 10px; }\n\n#panel .secondSide {\n    margin-top: 140%; }\n\n#panel .logoutBut a {\n    color: #009688; }\n\n#panel .logoutBut i {\n    color: #009688; }\n\n#panel .logoutBut:hover {\n    box-shadow: none;\n    transition: 1s;\n    border: none; }\n\n#panel .mat-nav-list a.active {\n    background: #00998a; }\n"

/***/ }),

/***/ "./src/app/panel/panel.component.ts":
/*!******************************************!*\
  !*** ./src/app/panel/panel.component.ts ***!
  \******************************************/
/*! exports provided: PanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelComponent", function() { return PanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _panel_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel.service */ "./src/app/panel/panel.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PanelComponent = /** @class */ (function () {
    function PanelComponent(panelService, sanitizer, auth, router) {
        this.panelService = panelService;
        this.sanitizer = sanitizer;
        this.auth = auth;
        this.router = router;
        this.login = true;
    }
    PanelComponent.prototype.logout = function () {
        var _this = this;
        this.auth.logout()
            .subscribe(function (res) {
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            _this.router.navigate(['/login']);
        }, function (err) { return console.log(err); });
    };
    PanelComponent.prototype.ngOnInit = function () {
        this.role = localStorage.getItem('role');
        console.log("PANEL ROLE:  " + this.role);
        // Get TEMPLATE
        // this.panelService.getContent('home', 'P2', 'EN')
        //   .subscribe(
        //     res => {
        //       console.log(res);
        //       let t = res['_body'];
        //       this.template = this.sanitizer.bypassSecurityTrustHtml(t);
        //     },
        //     err => console.log(err)
        //   );
    };
    PanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-panel',
            template: __webpack_require__(/*! ./panel.component.html */ "./src/app/panel/panel.component.html"),
            styles: [__webpack_require__(/*! ./panel.component.scss */ "./src/app/panel/panel.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_panel_service__WEBPACK_IMPORTED_MODULE_1__["PanelService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], PanelComponent);
    return PanelComponent;
}());



/***/ }),

/***/ "./src/app/panel/panel.service.ts":
/*!****************************************!*\
  !*** ./src/app/panel/panel.service.ts ***!
  \****************************************/
/*! exports provided: PanelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelService", function() { return PanelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PanelService = /** @class */ (function () {
    function PanelService(_http) {
        this._http = _http;
        this.baseUrl = 'rest/content/';
    }
    PanelService.prototype.getContent = function (page, position, lang) {
        return this._http.get(this.baseUrl + 'test/' + page + '/' + position + '/' + lang).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res; }));
    };
    PanelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], PanelService);
    return PanelService;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"addContent\">\r\n  <h2 class=\"dialog-title\">Add Content\r\n    <!-- <h5>{{data.eventName}}</h5> -->\r\n  </h2>\r\n  <form [formGroup]=\"addContentForm\" (ngSubmit)=\"addContent()\">\r\n    <mat-dialog-content>\r\n      <!-- BASIC INPUT FIELDS -->\r\n      <!-- Page -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        info\r\n      </i> -->\r\n        Basic information</h3>\r\n      <div class=\"basic-inputs\">\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input formControlName=\"page\" matInput placeholder=\"Page Name\">\r\n        </mat-form-field>\r\n        <!-- Position -->\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input formControlName=\"position\" matInput placeholder=\"Position\">\r\n        </mat-form-field>\r\n        <!-- Language -->\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input formControlName=\"language\" matInput placeholder=\"Language\">\r\n        </mat-form-field>\r\n      </div>\r\n      <hr>\r\n\r\n      <!-- TABS - HTML, CSS, JS -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        code\r\n      </i> -->\r\n        Add code</h3>\r\n      <div class=\"tabs\">\r\n        <mat-tab-group color=\"warn\">\r\n          <!-- HTML -->\r\n          <mat-tab label=\"HTML\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>HTML</mat-label>\r\n                <textarea formControlName=\"html\" rows=\"10\" matInput></textarea>\r\n                <mat-hint>Enter your HTML code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n          <!-- CSS -->\r\n          <mat-tab label=\"CSS\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>CSS</mat-label>\r\n                <textarea formControlName=\"css\" rows=\"10\" matInput></textarea>\r\n                <mat-hint>Enter your CSS code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n          <!-- JAVASCRIPT -->\r\n          <mat-tab label=\"JavaScript\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>JavaScript</mat-label>\r\n                <textarea formControlName=\"script\" rows=\"10\" matInput></textarea>\r\n                <mat-hint>Enter your JavaScript code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n        </mat-tab-group>\r\n      </div>\r\n      <hr>\r\n\r\n      <!-- CATEGORIES AND WEIGHT -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        format_list_bulleted\r\n      </i> -->\r\n        Select categories & weight for each category</h3>\r\n      <div class=\"categories\">\r\n        <div class=\"categories-box\">\r\n          <div *ngFor=\"let category of categories; let i = index\">\r\n            <mat-checkbox color=\"warn\" (change)=\"checked($event, category)\" labelPosition=\"after\">\r\n              {{category.description}}\r\n            </mat-checkbox>\r\n            <mat-slider color=\"warn\" max=\"5\" min=\"1\" step=\"1\" thumbLabel=\"true\" tickInterval=\"5\" (change)=\"sliderChange($event, category.id, i)\">\r\n            </mat-slider>\r\n          </div>\r\n        </div>\r\n        <!-- Selected Categories -->\r\n        <div class=\"selected-categories\">\r\n          <h5 class=\"label\">Selected categories</h5>\r\n          <div>\r\n            <div *ngFor=\"let selected of listCategoryWeight\" class=\"selected-categories-box\">\r\n              <span>{{selected.categories.description}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions class=\"buttons\">\r\n      <button mat-button mat-dialog-close class=\"cancelButton\">Cancel</button>\r\n      <button type=\"submit\" mat-raised-button color=\"warn\" [disabled]=\"html.errors || page.errors || position.errors || language.errors\">Save</button>\r\n    </mat-dialog-actions>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#addContent .basic-fileds {\n  width: 50% !important; }\n\n#addContent .textarea-fields {\n  width: 100% !important; }\n\n#addContent .mat-tab-group {\n  width: 100%;\n  padding: 0 20px; }\n\n#addContent .mat-tab-labels {\n  justify-content: center;\n  align-items: center; }\n\n#addContent .tabs-body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 50px; }\n\n#addContent .basic-inputs {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n#addContent .code-body {\n  width: 100px;\n  height: 100px; }\n\n#addContent .tabs {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n#addContent .categories {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start; }\n\n#addContent .categories-box {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-top: 20px;\n  margin-left: 20px; }\n\n#addContent .selected-categories {\n  margin-left: 85px; }\n\n#addContent .selected-categories-box {\n  display: flex;\n  align-items: center; }\n\n#addContent .selected-categories-box > span {\n  font-size: 15px; }\n\n#addContent .mat-checkbox-layout .mat-checkbox-label {\n  font-size: 15px; }\n\n#addContent .label {\n  margin-top: 20px;\n  text-align: left;\n  color: #bdbdbd; }\n\n#addContent mat-slider {\n  width: 150px;\n  margin-bottom: 5px;\n  margin-left: 50px; }\n\n#addContent .buttons {\n  float: right; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.ts ***!
  \***********************************************************************************/
/*! exports provided: AddContentDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContentDialogComponent", function() { return AddContentDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _content_content_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../content/content.service */ "./src/app/content/content.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_snackbar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/snackbar.service */ "./src/app/shared/services/snackbar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddContentDialogComponent = /** @class */ (function () {
    function AddContentDialogComponent(dialogRef, contentService, formBuilder, snackBarService) {
        this.dialogRef = dialogRef;
        this.contentService = contentService;
        this.formBuilder = formBuilder;
        this.snackBarService = snackBarService;
        this.listCategoryWeight = [];
        this.contentCategorieses = [];
    }
    // Select category - checkbox
    AddContentDialogComponent.prototype.checked = function (ev, categories) {
        if (ev.checked) {
            if (this.listCategoryWeight.length == 0) {
                this.listCategoryWeight.push({ categories: categories, weight: 1 });
                this.contentCategorieses.push({
                    categories: categories,
                    weight: 1
                });
            }
            else {
                var push = false;
                for (var i = 0; i < this.listCategoryWeight.length; i++) {
                    if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
                        push = true;
                    }
                }
                if (push) {
                    this.listCategoryWeight.push({ categories: categories, weight: 1 });
                    this.contentCategorieses.push({
                        categories: categories,
                        weight: 1
                    });
                }
            }
        }
        else {
            var index = this.listCategoryWeight.findIndex(function (item) { return item['categories'] == categories; });
            this.listCategoryWeight.splice(index, 1);
            var index2 = this.contentCategorieses.findIndex(function (item) { return item['categories'] == categories; });
            this.contentCategorieses.splice(index2, 1);
        }
        console.log(this.listCategoryWeight);
    };
    // Slider change fo each category
    AddContentDialogComponent.prototype.sliderChange = function (ev, id, index) {
        if (this.listCategoryWeight.length !== 0) {
            for (var i = 0; i < this.listCategoryWeight.length; i++) {
                if (this.listCategoryWeight[i]['categories']['id'] === id) {
                    this.listCategoryWeight[i]['weight'] = ev.value;
                }
            }
        }
        console.log(this.listCategoryWeight);
    };
    AddContentDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    // Get Categories
    AddContentDialogComponent.prototype.getCategories = function () {
        var _this = this;
        this.contentService.getCategories().subscribe(function (res) {
            console.log(res);
            _this.categories = res['data'];
            console.log(_this.categories);
        }, function (err) { return console.log(err); });
    };
    // Send request
    AddContentDialogComponent.prototype.addContent = function () {
        var _this = this;
        var obj = this.addContentForm.value;
        obj['contentCategorieses'] = this.listCategoryWeight;
        this.contentService.addContent(obj)
            .subscribe(function (res) {
            // console.log(res)
            _this.snackBarService.openSnackBar(res['data'], 'Success');
            _this.dialogRef.close();
        }, function (err) { return _this.snackBarService.openSnackBar('Something went wrong.', 'Error'); });
    };
    AddContentDialogComponent.prototype.ngOnInit = function () {
        this.getCategories();
        // Build Form
        this.addContentForm = this.formBuilder.group({
            html: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            css: [''],
            script: [''],
            page: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            position: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            language: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    Object.defineProperty(AddContentDialogComponent.prototype, "html", {
        // Form Getters
        get: function () {
            return this.addContentForm.get('html');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddContentDialogComponent.prototype, "page", {
        get: function () {
            return this.addContentForm.get('page');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddContentDialogComponent.prototype, "position", {
        get: function () {
            return this.addContentForm.get('position');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddContentDialogComponent.prototype, "language", {
        get: function () {
            return this.addContentForm.get('language');
        },
        enumerable: true,
        configurable: true
    });
    AddContentDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-content-dialog',
            template: __webpack_require__(/*! ./add-content-dialog.component.html */ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.html"),
            styles: [__webpack_require__(/*! ./add-content-dialog.component.scss */ "./src/app/shared/dialogs/add-content-dialog/add-content-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _content_content_service__WEBPACK_IMPORTED_MODULE_2__["ContentService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _services_snackbar_service__WEBPACK_IMPORTED_MODULE_4__["SnackBarService"]])
    ], AddContentDialogComponent);
    return AddContentDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"addJob\">\r\n  <h1>Add Event </h1>\r\n  <!-- <div *ngIf=\"data\"> -->\r\n  <mat-dialog-content>\r\n    <form [formGroup]=\"addEventForm\" (ngSubmit)=\"addEvent()\" class=\"addJob-container\" autocomplete=\"off\">\r\n      <mat-form-field>\r\n        <input matInput name=\"eventName\" formControlName=\"eventName\" type=\"text\" placeholder=\"Event Name\">\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input matInput name=\"eventType\" formControlName=\"eventType\" placeholder=\"Event Type\">\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <mat-select id=\"jobSelected\" placeholder=\"Job Name\" required formControlName=\"jobSelected\" name=\"jobSelected\">\r\n          <mat-option *ngFor=\"let job of events; let i = index\" [value]=\"job.jobs\">{{job.jobs.jobName}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <textarea matInput name=\"description\" formControlName=\"description\" placeholder=\"Description\"></textarea>\r\n      </mat-form-field>\r\n\r\n    </form>\r\n  </mat-dialog-content>\r\n  <mat-dialog-actions>\r\n    <button type=\"submit\" mat-raised-button class=\"formButton\">Submit</button>\r\n    <button mat-button mat-dialog-close class=\"cancelButton\">Cancel</button>\r\n  </mat-dialog-actions>\r\n  <!-- </div> -->\r\n</div>"

/***/ }),

/***/ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#addJob {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  justify-content: space-between; }\n\n#addJob .mat-form-field {\n    width: 50%;\n    padding: 20px 20px; }\n\n#addJob .buttons {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    justify-content: flex-end;\n    margin-top: 50px;\n    outline: none; }\n\n#addJob .formButton {\n    margin-left: 72%; }\n\n#addJob .cancelButton {\n    background-color: #FFEE58; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AddEventDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEventDialogComponent", function() { return AddEventDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _add_event_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-event-dialog.service */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.service.ts");
/* harmony import */ var _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AddEventDialogComponent = /** @class */ (function () {
    function AddEventDialogComponent(dialogRef, data, addEventService, formBuilder) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.addEventService = addEventService;
        this.formBuilder = formBuilder;
    }
    AddEventDialogComponent.prototype.getList = function () {
        var _this = this;
        this.addEventService.getEvents().subscribe(function (res) {
            _this.events = res.data;
            console.log(_this.events);
        }, function (err) { return console.log(err); });
    };
    // Add Event 
    AddEventDialogComponent.prototype.addEvent = function () {
        // console.log('Job selected:');
        // console.log(this.jobSelected);
        console.log(this.addEventForm.value);
        // const jobs = {
        //   id: jobId,
        //   eventName: this.eventName,
        //   eventType: this.eventType,
        //   jobs: this.jobSelected,
        //   definition: 'test',
        //   description: this.description,
        //   status: 'test'
        // };
        // this.addEventService.addEvents(jobs).subscribe(
        //   res => {
        //     console.log(res);
        //     // this.jobs = res.data;
        //     // this.successMessage(res.message);
        //     this.dialogRef.close();
        //   },
        //   err => {
        //     console.log(err);
        //     // this.errorMessage(err);
        //   }
        // );
    };
    AddEventDialogComponent.prototype.ngOnInit = function () {
        this.getList();
        // Build Form
        this.addEventForm = this.formBuilder.group({
            eventName: ['', _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            eventType: ['', _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            jobSelected: ['', _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            description: ['', _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    Object.defineProperty(AddEventDialogComponent.prototype, "eventName", {
        // Form Getters
        get: function () {
            return this.addEventForm.get('eventName');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEventDialogComponent.prototype, "eventType", {
        get: function () {
            return this.addEventForm.get('eventType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEventDialogComponent.prototype, "jobSelected", {
        get: function () {
            return this.addEventForm.get('jobSelected');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEventDialogComponent.prototype, "description", {
        get: function () {
            return this.addEventForm.get('description');
        },
        enumerable: true,
        configurable: true
    });
    AddEventDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-event-dialog',
            template: __webpack_require__(/*! ./add-event-dialog.component.html */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.html"),
            styles: [__webpack_require__(/*! ./add-event-dialog.component.scss */ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _add_event_dialog_service__WEBPACK_IMPORTED_MODULE_2__["AddEventService"],
            _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], AddEventDialogComponent);
    return AddEventDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/add-event-dialog/add-event-dialog.service.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/shared/dialogs/add-event-dialog/add-event-dialog.service.ts ***!
  \*****************************************************************************/
/*! exports provided: AddEventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEventService", function() { return AddEventService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddEventService = /** @class */ (function () {
    function AddEventService(_http) {
        this._http = _http;
        this.baseUrl = '/wscm/rest/scheduler/';
    }
    AddEventService.prototype.addEvents = function (jobs) {
        return this._http.post(this.baseUrl + 'events', jobs);
    };
    AddEventService.prototype.getEvents = function () {
        return this._http.get(this.baseUrl + 'events');
    };
    AddEventService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AddEventService);
    return AddEventService;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/shared/dialogs/delete-dialog/delete-dialog.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"deleteDialog\">\r\n  <h2 mat-dialog-title>Delete {{data.type}}</h2>\r\n  <mat-dialog-content>Are you sure you want to delete {{data.value}}?</mat-dialog-content>\r\n  <mat-dialog-actions>\r\n    <button mat-button mat-dialog-close (click)=\"cancel()\">Cancel</button>\r\n    <button mat-raised-button color=\"warn\" [mat-dialog-close]=\"true\">Yes</button>\r\n  </mat-dialog-actions>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/shared/dialogs/delete-dialog/delete-dialog.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#deleteDialog mat-dialog-actions {\n  float: right; }\n\n#deleteDialog mat-dialog-content {\n  padding: 20px 0;\n  text-align: center; }\n\n#deleteDialog .mat-dialog-title {\n  margin: 0; }\n\n#deleteDialog button:focus {\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/shared/dialogs/delete-dialog/delete-dialog.component.ts ***!
  \*************************************************************************/
/*! exports provided: DeleteDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteDialog", function() { return DeleteDialog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DeleteDialog = /** @class */ (function () {
    function DeleteDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DeleteDialog.prototype.cancel = function () {
        this.dialogRef.close();
    };
    DeleteDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'delete-dialog',
            template: __webpack_require__(/*! ./delete-dialog.component.html */ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.html"),
            styles: [__webpack_require__(/*! ./delete-dialog.component.scss */ "./src/app/shared/dialogs/delete-dialog/delete-dialog.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DeleteDialog);
    return DeleteDialog;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"editContent\">\r\n  <h2 class=\"dialog-title\">Edit Content\r\n    <!-- <h5>{{data.eventName}}</h5> -->\r\n  </h2>\r\n  <form #editContentForm=\"ngForm\" (ngSubmit)=\"editContent(editContentForm.value)\">\r\n    <mat-dialog-content>\r\n      <!-- BASIC INPUT FIELDS -->\r\n      <!-- Page -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        info\r\n      </i> -->\r\n        Basic information</h3>\r\n      <div class=\"basic-inputs\">\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input matInput placeholder=\"Page Name\" name=\"page\" [(ngModel)]=\"positionData.page\">\r\n        </mat-form-field>\r\n        <!-- Position -->\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input matInput placeholder=\"Position\" name=\"position\" [(ngModel)]=\"positionData.position\">\r\n        </mat-form-field>\r\n        <!-- Language -->\r\n        <mat-form-field class=\"basic-fileds\">\r\n          <input matInput placeholder=\"Language\" name=\"language\" [(ngModel)]=\"positionData.language\">\r\n        </mat-form-field>\r\n      </div>\r\n      <hr>\r\n\r\n      <!-- TABS - HTML, CSS, JS -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        code\r\n      </i> -->\r\n        Add code</h3>\r\n      <div class=\"tabs\">\r\n        <mat-tab-group color=\"warn\">\r\n          <!-- HTML -->\r\n          <mat-tab label=\"HTML\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>HTML</mat-label>\r\n                <textarea rows=\"10\" matInput name=\"html\" [(ngModel)]=\"positionData.html\"></textarea>\r\n                <mat-hint>Enter your HTML code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n          <!-- CSS -->\r\n          <mat-tab label=\"CSS\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>CSS</mat-label>\r\n                <textarea rows=\"10\" matInput name=\"css\" [(ngModel)]=\"positionData.css\"></textarea>\r\n                <mat-hint>Enter your CSS code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n          <!-- JAVASCRIPT -->\r\n          <mat-tab label=\"JavaScript\">\r\n            <div class=\"tabs-body\">\r\n              <mat-form-field class=\"textarea-fields\" appearance=\"outline\">\r\n                <mat-label>JavaScript</mat-label>\r\n                <textarea rows=\"10\" matInput name=\"script\" [(ngModel)]=\"positionData.script\"></textarea>\r\n                <mat-hint>Enter your JavaScript code</mat-hint>\r\n              </mat-form-field>\r\n            </div>\r\n          </mat-tab>\r\n        </mat-tab-group>\r\n      </div>\r\n      <hr>\r\n\r\n      <!-- CATEGORIES AND WEIGHT -->\r\n      <h3 class=\"dialog-subtitle\">\r\n        <!-- <i class=\"material-icons\">\r\n        format_list_bulleted\r\n      </i> -->\r\n        Select categories & weight for each category</h3>\r\n      <div class=\"categories\">\r\n        <div class=\"categories-box\">\r\n          <div *ngIf=\"categories\">\r\n            <h5 class=\"label\">Choose categories</h5>\r\n            <div *ngFor=\"let category of categories | filter: positionData.contentCategorieses : 'categories'\">\r\n              <mat-checkbox color=\"warn\" (change)=\"checked($event, category)\" labelPosition=\"after\">\r\n                {{category.description}}\r\n              </mat-checkbox>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!-- Selected Categories -->\r\n        <div class=\"selected-categories\">\r\n          <h5 class=\"label\">Choose weight for selected categories</h5>\r\n          <div>\r\n            <div *ngFor=\"let selected of positionData.contentCategorieses\" class=\"selected-categories-box\">\r\n              <mat-icon class=\"unselect-icon\" (click)=\"unchecked(selected)\">close</mat-icon>\r\n              <span>{{selected.categories.description}}</span>\r\n              <mat-slider color=\"warn\" max=\"5\" min=\"1\" step=\"1\" thumbLabel=\"true\" tickInterval=\"5\" [value]=\"selected.weight\" (change)=\"sliderChange($event, selected)\">\r\n              </mat-slider>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions class=\"buttons\">\r\n      <button mat-button mat-dialog-close class=\"cancelButton\">Cancel</button>\r\n      <button type=\"submit\" mat-raised-button color=\"warn\">Save</button>\r\n    </mat-dialog-actions>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#editContent .basic-fileds {\n  width: 50% !important; }\n\n#editContent .textarea-fields {\n  width: 100% !important; }\n\n#editContent .mat-tab-group {\n  width: 100%;\n  padding: 0 20px; }\n\n#editContent .mat-tab-labels {\n  justify-content: center;\n  align-items: center; }\n\n#editContent .tabs-body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 50px; }\n\n#editContent .basic-inputs {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center; }\n\n#editContent .code-body {\n  width: 100px;\n  height: 100px; }\n\n#editContent .tabs {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n#editContent .categories {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start; }\n\n#editContent .categories-box {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-left: 20px; }\n\n#editContent .selected-categories {\n  margin-left: 140px; }\n\n#editContent .selected-categories-box {\n  display: flex;\n  align-items: center; }\n\n#editContent .selected-categories-box > span {\n  font-size: 15px; }\n\n#editContent .mat-checkbox-layout .mat-checkbox-label {\n  font-size: 15px; }\n\n#editContent .label {\n  margin-top: 20px;\n  text-align: left;\n  color: #bdbdbd; }\n\n#editContent .label:first-child {\n  margin-bottom: 20px; }\n\n#editContent .unselect-icon {\n  color: #009688;\n  height: 18px;\n  font-size: 20px;\n  margin-right: 3px;\n  font-weight: 600; }\n\n#editContent .unselect-icon:hover {\n  cursor: pointer;\n  color: #424242; }\n\n#editContent mat-slider {\n  width: 150px;\n  margin-bottom: 0px;\n  margin-left: 20px; }\n\n#editContent .buttons {\n  float: right; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.ts ***!
  \*************************************************************************************/
/*! exports provided: EditContentDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditContentDialogComponent", function() { return EditContentDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _content_content_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../content/content.service */ "./src/app/content/content.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_snackbar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/snackbar.service */ "./src/app/shared/services/snackbar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var EditContentDialogComponent = /** @class */ (function () {
    function EditContentDialogComponent(dialogRef, positionData, contentService, formBuilder, snackBarService) {
        this.dialogRef = dialogRef;
        this.positionData = positionData;
        this.contentService = contentService;
        this.formBuilder = formBuilder;
        this.snackBarService = snackBarService;
        this.listCategoryWeight = this.positionData.contentCategorieses;
        this.contentCategorieses = [];
    }
    // Select category - checkbox
    EditContentDialogComponent.prototype.checked = function (ev, categories) {
        if (ev.checked) {
            if (this.listCategoryWeight.length == 0) {
                this.positionData.contentCategorieses.push({
                    categories: categories,
                    weight: 1
                });
            }
            else {
                var push = false;
                for (var i = 0; i < this.listCategoryWeight.length; i++) {
                    if (this.listCategoryWeight[i]['categoryId'] != categories.id) {
                        push = true;
                    }
                }
                if (push) {
                    this.positionData.contentCategorieses.push({
                        categories: categories,
                        weight: 1
                    });
                }
            }
        }
        else {
            // let index = this.positionData.contentCategorieses.findIndex(
            //   item => item['categories'] == categories
            // );
            // this.positionData.contentCategorieses.splice(index3, 1);
        }
        console.log(this.listCategoryWeight);
    };
    EditContentDialogComponent.prototype.unchecked = function (position) {
        var index = this.positionData.contentCategorieses.findIndex(function (item) { return item['categories'] == position.categories; });
        this.positionData.contentCategorieses.splice(index, 1);
        console.log(this.listCategoryWeight);
    };
    // Slider change fo each category
    EditContentDialogComponent.prototype.sliderChange = function (ev, selected) {
        console.log(selected);
        if (this.listCategoryWeight.length !== 0) {
            for (var i = 0; i < this.listCategoryWeight.length; i++) {
                if (this.listCategoryWeight[i]['categories']['id'] === selected.categories.id) {
                    this.listCategoryWeight[i]['weight'] = ev.value;
                }
            }
        }
        console.log(this.listCategoryWeight);
    };
    EditContentDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    // Get Categories
    EditContentDialogComponent.prototype.getCategories = function () {
        var _this = this;
        this.contentService.getCategories().subscribe(function (res) {
            console.log(res);
            _this.categories = res['data'];
            console.log(_this.categories);
        }, function (err) { return console.log(err); });
    };
    // Send request
    EditContentDialogComponent.prototype.editContent = function (value) {
        var _this = this;
        value['contentCategorieses'] = this.positionData.contentCategorieses;
        console.log(value);
        // Validation for required fields
        if (!value.page)
            this.snackBarService.openSnackBar('Please, enter page name.', '');
        else if (!value.position)
            this.snackBarService.openSnackBar('Please, enter position name.', '');
        else if (!value.language)
            this.snackBarService.openSnackBar('Please, enter language.', '');
        else if (!value.html)
            this.snackBarService.openSnackBar('Please, enter HTML code.', '');
        else {
            this.contentService.updateContent(value)
                .subscribe(function (res) {
                console.log(res);
                _this.snackBarService.openSnackBar(res['data'], 'Success');
                _this.dialogRef.close();
            }, function (err) { return _this.snackBarService.openSnackBar('Something went wrong.', 'Error'); });
        }
    };
    EditContentDialogComponent.prototype.ngOnInit = function () {
        console.log(this.positionData);
        this.getCategories();
        // Build Form
        //   this.editContentForm = this.formBuilder.group({
        //     html: ['', Validators.required],
        //     css: [''],
        //     script: [''],
        //     page: ['', Validators.required],
        //     position: ['', Validators.required],
        //     language: ['', Validators.required]
        //   });
        // }
        // Form Getters
        // get html() {
        //   return this.editContentForm.get('html');
        // }
        // get page() {
        //   return this.editContentForm.get('page');
        // }
        // get position() {
        //   return this.editContentForm.get('position');
        // }
        // get language() {
        //   return this.editContentForm.get('language');
        // }
    };
    EditContentDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-content-dialog',
            template: __webpack_require__(/*! ./edit-content-dialog.component.html */ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.html"),
            styles: [__webpack_require__(/*! ./edit-content-dialog.component.scss */ "./src/app/shared/dialogs/edit-content-dialog/edit-content-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _content_content_service__WEBPACK_IMPORTED_MODULE_2__["ContentService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _services_snackbar_service__WEBPACK_IMPORTED_MODULE_4__["SnackBarService"]])
    ], EditContentDialogComponent);
    return EditContentDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-dialog/edit-dialog.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"editDialog\">\r\n  <!-- <h2 mat-dialog-title>Edit {{data.type}}</h2> -->\r\n  <!-- <mat-dialog-content>Are you sure you want to delete {{data.value}}?</mat-dialog-content> -->\r\n  <h2 mat-dialog-title>Edit</h2>\r\n  <mat-dialog-content>\r\n    <mat-form-field>\r\n      <input matInput placeholder=\"Page\" name=\"page\" id=\"page\" required minlength=\"2\">\r\n    </mat-form-field>\r\n    <!-- Position -->\r\n    <mat-form-field>\r\n      <input matInput type=\"text\" name=\"position\"/>\r\n    </mat-form-field>\r\n    <!-- language -->\r\n    <mat-form-field>\r\n      <input matInput placeholder=\"Language\" name=\"language\" id=\"language\"  required minlength=\"2\" maxlength=\"2\">\r\n    </mat-form-field>\r\n  </mat-dialog-content>\r\n  <mat-dialog-actions>\r\n    <button (click)=\"funkc()\">klik</button>\r\n    <button mat-button mat-dialog-close (click)=\"cancel()\">Cancel</button>\r\n    <button mat-raised-button color=\"warn\" [mat-dialog-close]=\"true\">Yes</button>\r\n  </mat-dialog-actions>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-dialog/edit-dialog.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#editDialog mat-dialog-actions {\n  float: right; }\n\n#editDialog mat-dialog-content {\n  padding: 20px 0;\n  text-align: center; }\n\n#editDialog .mat-dialog-title {\n  margin: 0; }\n\n#editDialog button:focus {\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-dialog/edit-dialog.component.ts ***!
  \*********************************************************************/
/*! exports provided: EditDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditDialogComponent", function() { return EditDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    EditDialogComponent.prototype.cancel = function () {
        this.dialogRef.close();
    };
    EditDialogComponent.prototype.funkc = function () {
        console.log(this.data);
    };
    EditDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-dialog',
            template: __webpack_require__(/*! ./edit-dialog.component.html */ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.html"),
            styles: [__webpack_require__(/*! ./edit-dialog.component.scss */ "./src/app/shared/dialogs/edit-dialog/edit-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], EditDialogComponent);
    return EditDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"editJob\">\r\n  <h1>Edit\r\n    <h5>{{data.eventName}}</h5>\r\n  </h1>\r\n  <div *ngIf=\"data\">\r\n    <form #editEventForm=\"ngForm\" class=\"editJob-container\">\r\n      <mat-dialog-content>\r\n        <mat-form-field id=\"idField\">\r\n          <input matInput name=\"id\" [(ngModel)]=\"data.id\" autocomplete=\"off\">\r\n        </mat-form-field>\r\n        <br>\r\n        <mat-form-field>\r\n          <input matInput name=\"eventName\" type=\"text\" [(ngModel)]=\"data.eventName\" placeholder=\"Event Name\" autocomplete=\"off\" required>\r\n        </mat-form-field>\r\n\r\n        <mat-form-field>\r\n          <input matInput name=\"eventType\" type=\"text\" [(ngModel)]=\"data.eventType\" placeholder=\"Event Type\" autocomplete=\"off\" required>\r\n        </mat-form-field>\r\n        <br>\r\n        <mat-form-field>\r\n          <mat-select name=\"jobs\" [(ngModel)]=\"data.jobs\" placeholder=\"Job Name\" required>\r\n            <mat-option *ngFor=\"let job of events; let i = index\" [value]=\"job.jobs\">{{job.jobs.jobName}}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n        <!-- <mat-form-field>\r\n            <input matInput name=\"cronExpression\" id=\"cronExpression\" formControlName=\"cronExpression\" [value]=\"data.jobs.cronExpression\" placeholder=\"Definition\" autocomplete=\"off\">\r\n          </mat-form-field><br> -->\r\n\r\n        <mat-form-field>\r\n          <input matInput name=\"definition\" [(ngModel)]=\"data.definition\" placeholder=\"Definition\" autocomplete=\"off\">\r\n        </mat-form-field>\r\n        <br>\r\n\r\n        <mat-form-field>\r\n          <textarea matInput name=\"description\" [(ngModel)]=\"data.description\" placeholder=\"Description\"></textarea>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <input matInput name=\"status\" [(ngModel)]=\"data.status\" placeholder=\"Status\">\r\n        </mat-form-field>\r\n\r\n      </mat-dialog-content>\r\n\r\n      <mat-dialog-actions class=\"buttons\">\r\n        <button mat-raised-button class=\"editButton\" [disabled]=\"editEventForm.invalid\" (click)=\"editJob(editEventForm.value)\">Save</button>\r\n        <button mat-button mat-dialog-close class=\"cancelButton\">Cancel</button>\r\n      </mat-dialog-actions>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".flex {\n  display: flex; }\n\n.column {\n  flex-direction: column; }\n\n.wrap {\n  flex-wrap: wrap; }\n\n.center {\n  align-items: center;\n  justify-content: center; }\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.add-button {\n  align-self: flex-end;\n  margin-right: 50px !important;\n  margin-bottom: 50px !important;\n  margin-top: 10px !important; }\n\n.add-button:active {\n  outline: none; }\n\n.add-button:focus {\n  outline: none; }\n\nh1 {\n  color: #fff;\n  padding: 10px 3%;\n  font-size: 35px;\n  background: linear-gradient(to right, #009688, #64FFDA); }\n\ntable {\n  text-align: center;\n  margin-left: 3%;\n  margin-right: 3%; }\n\ntr.mat-header-row {\n  background: #009688 !important; }\n\nth.mat-header-cell {\n  color: white;\n  font-size: 1em;\n  text-align: center; }\n\ntd::-moz-selection {\n  background: #009688;\n  color: white; }\n\ntd::selection {\n  background: #009688;\n  color: white; }\n\nth::-moz-selection {\n  background: #009688; }\n\nth::selection {\n  background: #009688; }\n\nth.mat-header-cell {\n  text-align: left !important;\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px; }\n\ntd.mat-cell, td.mat-footer-cell, th.mat-header-cell {\n  padding-right: 24px !important;\n  padding-top: 10px !important;\n  padding-bottom: 10px;\n  text-align: left !important; }\n\n.table-icons {\n  color: #009688;\n  font-size: 25px;\n  padding-right: 5px;\n  text-align: center; }\n\n.table-icons:hover {\n  cursor: pointer; }\n\n.table-icons::-moz-selection {\n  background: #009688;\n  color: white; }\n\n.table-icons::selection {\n  background: #009688;\n  color: white; }\n\n.dialog-title {\n  color: #424242;\n  padding: 20px; }\n\n.dialog-subtitle {\n  display: flex;\n  align-items: center;\n  color: #009688;\n  padding-left: 20px; }\n\n.dialog-subtitle > i {\n  margin-right: 5px; }\n\n#editJob {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  justify-content: space-between; }\n\n#editJob p {\n    color: #009688; }\n\n#editJob .addJob-container {\n    width: 50%; }\n\n#editJob .mat-form-field {\n    width: 50%;\n    padding: 20px 20px; }\n\n#editJob h5 {\n    color: #bdbdbd; }\n\n#editJob .buttons {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    justify-content: flex-end;\n    margin-top: 50px; }\n\n#editJob .editButton {\n    margin-left: 60%; }\n\n#editJob .cancelButton {\n    background-color: #FFEE58; }\n\n#editJob #idField {\n    display: none; }\n"

/***/ }),

/***/ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.ts ***!
  \*********************************************************************************/
/*! exports provided: EditEventDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditEventDialogComponent", function() { return EditEventDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _edit_event_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit-event-dialog.service */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var EditEventDialogComponent = /** @class */ (function () {
    function EditEventDialogComponent(dialogRef, data, editEventService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.editEventService = editEventService;
    }
    EditEventDialogComponent.prototype.getList = function () {
        var _this = this;
        this.editEventService.getJobs().subscribe(function (res) {
            _this.events = res.data;
            console.log(_this.events);
        }, function (err) { return console.log(err); });
    };
    // Edit job form
    EditEventDialogComponent.prototype.editJob = function (obj) {
        var _this = this;
        console.log(obj);
        this.editEventService.editJobs(obj).subscribe(function (res) {
            console.log(res);
            // this.successMessage(res.message);
            _this.dialogRef.close();
            _this.getList();
        }, function (err) {
            console.log(err);
            // this.errorMessage(err);
            // this.editJobModal.hide();
        });
    };
    EditEventDialogComponent.prototype.cancel = function () {
        this.dialogRef.close();
    };
    EditEventDialogComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.getList();
    };
    EditEventDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-event-dialog',
            template: __webpack_require__(/*! ./edit-event-dialog.component.html */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.html"),
            styles: [__webpack_require__(/*! ./edit-event-dialog.component.scss */ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _edit_event_dialog_service__WEBPACK_IMPORTED_MODULE_2__["EditEventService"]])
    ], EditEventDialogComponent);
    return EditEventDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/shared/dialogs/edit-event-dialog/edit-event-dialog.service.ts ***!
  \*******************************************************************************/
/*! exports provided: EditEventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditEventService", function() { return EditEventService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditEventService = /** @class */ (function () {
    function EditEventService(_http) {
        this._http = _http;
        this.baseUrl = '/wscm/rest/scheduler/';
    }
    EditEventService.prototype.editJobs = function (obj) {
        return this._http.put(this.baseUrl + 'events', obj);
    };
    EditEventService.prototype.getJobs = function () {
        return this._http.get(this.baseUrl + 'events');
    };
    EditEventService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EditEventService);
    return EditEventService;
}());



/***/ }),

/***/ "./src/app/shared/guards/auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/guards/auth.guard.ts ***!
  \*********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/auth.service */ "./src/app/shared/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/shared/modules/material.module.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/modules/material.module.ts ***!
  \***************************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTabsModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__["MatSlideToggleModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_15__["MatSliderModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__["MatSnackBarModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__["MatCheckboxModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_18__["MatCardModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_20__["MatTableModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__["MatPaginatorModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MatMenuModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTabsModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__["MatSlideToggleModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_15__["MatSliderModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__["MatSnackBarModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__["MatCheckboxModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_18__["MatCardModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_20__["MatTableModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_21__["MatPaginatorModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MatMenuModule"]
            ],
            declarations: []
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/filter.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/pipes/filter.pipe.ts ***!
  \*********************************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (value, filterData, type) {
        if (value.length == 0) {
            return value;
        }
        else {
            switch (type) {
                case 'categories':
                    var newFilter_1 = [];
                    for (var _i = 0, filterData_1 = filterData; _i < filterData_1.length; _i++) {
                        var item = filterData_1[_i];
                        newFilter_1.push(item['categories']);
                    }
                    var res = value.filter(function (obj) {
                        return !newFilter_1.some(function (obj2) {
                            return obj.id == obj2.id;
                        });
                    });
                    return res;
            }
        }
    };
    FilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'filter', pure: false })
    ], FilterPipe);
    return FilterPipe;
}());



/***/ }),

/***/ "./src/app/shared/services/auth.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/services/auth.service.ts ***!
  \*************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthService.prototype.login = function (data) {
        return this.http.post('authentication', data);
    };
    AuthService.prototype.logout = function () {
        return this.http.post('logout', {});
    };
    AuthService.prototype.isLoggedIn = function () {
        if (localStorage.getItem('username') && localStorage.getItem('username').length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/shared/services/snackbar.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/services/snackbar.service.ts ***!
  \*****************************************************/
/*! exports provided: SnackBarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackBarService", function() { return SnackBarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnackBarService = /** @class */ (function () {
    function SnackBarService(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarService.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    };
    SnackBarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], SnackBarService);
    return SnackBarService;
}());



/***/ }),

/***/ "./src/app/shared/services/socket.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/services/socket.service.ts ***!
  \***************************************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SocketService = /** @class */ (function () {
    function SocketService() {
    }
    SocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log('Successfully connected: ' + url);
            console.log(this.ws);
        }
        return this.subject;
    };
    SocketService.prototype.create = function (url) {
        var _this = this;
        this.ws = new WebSocket(url);
        var observable = rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(function (obs) {
            _this.ws.onmessage = obs.next.bind(obs);
            _this.ws.onerror = obs.error.bind(obs);
            _this.ws.onclose = obs.complete.bind(obs);
            return _this.ws.close.bind(_this.ws);
        });
        var observer = {
            next: function (data) {
                if (_this.ws.readyState === WebSocket.OPEN) {
                    _this.ws.send(JSON.stringify(data));
                }
            }
        };
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"].create(observer, observable);
    };
    SocketService.prototype.disconnect = function () {
        this.subject = null;
        console.log(this.ws);
        this.ws.send('CLOSE');
        this.ws.close();
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Projects\WSCM\src\main\webapp\wscm\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map