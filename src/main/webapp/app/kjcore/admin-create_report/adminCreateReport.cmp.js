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
var router_1 = require('@angular/router');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var ng2_translate_1 = require('ng2-translate');
var adminCreateReport_service_1 = require('./adminCreateReport.service');
var app_service_1 = require('../shared/services/app.service');
var appData_service_1 = require('../shared/services/appData.service');
var utility_service_1 = require('../shared/services/utility.service');
var models_1 = require('../shared/models');
var models_2 = require('./models');
var fileExtensionTrimmer_pipe_1 = require('../shared/pipes/fileExtensionTrimmer.pipe');
var constants_1 = require('../constants');
/**
 * Component for Ceating reports page
 * @author Mario Petrovic
 */
var AdminCreateReportCmp = (function () {
    /*--------- Constructor --------*/
    function AdminCreateReportCmp(_utilityService, _dragulaService, _adminCreateReportService, _translateService, _appService, _activatedRoute, _router, _changeDetectionRef, _appDataService, _constants) {
        this._utilityService = _utilityService;
        this._dragulaService = _dragulaService;
        this._adminCreateReportService = _adminCreateReportService;
        this._translateService = _translateService;
        this._appService = _appService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._changeDetectionRef = _changeDetectionRef;
        this._appDataService = _appDataService;
        this._constants = _constants;
        this.tables = [];
        this.columns = [];
        this.classes = [];
        var vm = this;
        // Dragula config 
        this._dragulaService.setOptions('bag-main', {
            direction: 'horizontal',
            accepts: function (el, target, source, sibling) {
                var tempHasClass = $(el).hasClass('create_report-row-controls');
                var tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                if (tempHasClass || tempHasClassPlusBetween) {
                    return false;
                }
                else {
                    return true;
                }
            },
            moves: function (el, source, handle, sibling) {
                var tempHasClass = $(el).hasClass('create_report-row-controls');
                var tempHasClassPlusBetween = $(el).hasClass('create_report-between-add_row');
                var tempHasClassPlus = $(el).hasClass('create_report-add_icon-box');
                return !vm.currentChangingParameter.bEditMode && !tempHasClass && !tempHasClassPlusBetween && !tempHasClassPlus;
            }
        });
        this._dragulaService.drop.subscribe(function (value) {
            var tempHasBetweenPlus = $(value[3]).find('.create_report-between-add_row')[0];
            var tempChildCount = value[3].childElementCount;
            if (tempChildCount == 0) {
                var tempPrevContainerIndex = $(value[3]).index() - 1;
                vm.reportProfile.kjcReportParameterses.splice(tempPrevContainerIndex, 1);
            }
            vm.bMoveMode = false;
        });
        this._dragulaService.drag.subscribe(function (value) {
            vm.bMoveMode = true;
            var tempPosition = $(value[1]).attr('position').split('-');
        });
        this._dragulaService.over.subscribe(function (value) {
            vm.bMoveMode = true;
        });
        this._dragulaService.out.subscribe(function (value) {
            vm.bMoveMode = false;
        });
        this._dragulaService.dragend.subscribe(function (value) {
            vm.bMoveMode = false;
        });
    }
    /*--------- App logic --------*/
    /**
     * Submit method for creating report
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.createReportSubmit = function (reportProfileRef) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.createReportErrors = null;
        reportProfileRef.kjcApplicationRoleses = [];
        var hashMapObject;
        for (var i = 0; i < this.selectedRoles.length; i++) {
            for (var j = 0; j < this.roles.length; j++) {
                if (this.selectedRoles[i] == this.roles[j].name) {
                    reportProfileRef.kjcApplicationRoleses.push(this.roles[j]);
                    break;
                }
            }
        }
        reportProfileRef.kjcCompanieses = [];
        for (var i = 0; i < this.selectedCompanies.length; i++) {
            for (var j = 0; j < this.companies.length; j++) {
                if (this.selectedCompanies[i] == this.companies[j].id) {
                    reportProfileRef.kjcCompanieses.push(this.companies[j]);
                    break;
                }
            }
        }
        for (var i = 0; i < this.reportProfileCopy.kjcReportParameterses[0].length; i++) {
            if (this.reportProfileCopy.kjcReportParameterses[0][i].type == 'HashMap') {
                hashMapObject = this.reportProfileCopy.kjcReportParameterses[0][i];
            }
        }
        if (hashMapObject) {
            hashMapObject.name = hashMapObject.key;
        }
        var formData = new FormData();
        var tempReportProfile = this._utilityService.copy(reportProfileRef);
        tempReportProfile.kjcReportParameterses = this.parameterMatrixToArray(reportProfileRef.kjcReportParameterses);
        if (tempReportProfile.kjcClasses) {
            tempReportProfile.kjcClasses.description = tempReportProfile.kjcClassesDescription;
        }
        else {
            if (tempReportProfile.kjcClassesDescription) {
                tempReportProfile.kjcClasses = {
                    description: tempReportProfile.kjcClassesDescription
                };
            }
        }
        if (hashMapObject) {
            tempReportProfile.kjcReportParameterses.push(hashMapObject);
        }
        formData.append('masterFile', this.reportFiles.jasper.files[0]);
        if (this.reportFiles.java && this.reportFiles.class && this.reportFiles.java.files && this.reportFiles.class.files) {
            formData.append('javaFile', this.reportFiles.java.files[0]);
            formData.append('compiledJavaFile', this.reportFiles.class.files[0]);
        }
        formData.append('propertyFile', this.reportFiles.properties ? this.reportFiles.properties.files[0] : '');
        formData.append('report', new Blob([JSON.stringify(tempReportProfile)], {
            type: 'application/json'
        }));
        //Making params array variable
        var obj = {};
        for (var key in this.reportFiles.subreport) {
            obj[this.reportFiles.subreport[key].fileName] = this.reportFiles.subreport[key].name;
            formData.append('subreportFiles', this.reportFiles.subreport[key].file);
        }
        formData.append('subreportFilesParams', new Blob([JSON.stringify(obj)], {
            type: 'application/json'
        }));
        var override;
        if (this.override == true) {
            override = 1;
        }
        else {
            override = 0;
        }
        this.subscriptions['createReportSubmit'] = this._adminCreateReportService.createReport(formData, override).subscribe(function (res) {
            _this.getValidationClasses();
            _this.afterSubmitCleanup();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            // this.afterSubmitCleanup();
            _this.createReportErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Loads all tables
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.loadAllTables = function (field, activateEdit) {
        var _this = this;
        this.subscriptions['loadAllTables'] = this._adminCreateReportService.getAllTables().subscribe(function (res) {
            _this.tables = [];
            for (var key in res.data) {
                _this.tables.push({ label: res.data[key], value: res.data[key] });
            }
            if (!activateEdit) {
                field.dbTable = res.data[0];
            }
            _this.onTableChange(field, activateEdit);
        });
    };
    /**
     * Appends all companies and treats
     * them as selected.
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.selectAllCompanies = function () {
        var _this = this;
        this.editFix = false;
        for (var _i = 0, _a = this.companies; _i < _a.length; _i++) {
            var company = _a[_i];
            this.selectedCompanies.push(company.id);
        }
        setTimeout(function () {
            _this.editFix = true;
        });
    };
    /**
     * Clears all selected companies
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.clearAllCompanies = function () {
        this.selectedCompanies = [];
    };
    /**
     * Update selected report and navigate to Report Management page
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.updateReport = function (reportProfileRef) {
        var _this = this;
        this._utilityService.setAlert(this.componentAlert);
        this.createReportErrors = null;
        reportProfileRef.kjcApplicationRoleses = [];
        for (var i = 0; i < this.selectedRoles.length; i++) {
            for (var j = 0; j < this.roles.length; j++) {
                if (this.selectedRoles[i] == this.roles[j].name) {
                    reportProfileRef.kjcApplicationRoleses.push(this.roles[j]);
                    break;
                }
            }
        }
        reportProfileRef.kjcCompanieses = [];
        for (var i = 0; i < this.selectedCompanies.length; i++) {
            for (var j = 0; j < this.companies.length; j++) {
                if (this.selectedCompanies[i] == this.companies[j].id) {
                    reportProfileRef.kjcCompanieses.push(this.companies[j]);
                    break;
                }
            }
        }
        var formData = new FormData();
        var tempReportProfile = this._utilityService.copy(reportProfileRef);
        tempReportProfile.kjcReportParameterses = this.parameterMatrixToArray(reportProfileRef.kjcReportParameterses);
        if (tempReportProfile.kjcClasses) {
            tempReportProfile.kjcClasses.description = tempReportProfile.kjcClassesDescription;
        }
        else {
            if (tempReportProfile.kjcClassesDescription) {
                tempReportProfile.kjcClasses = {
                    description: tempReportProfile.kjcClassesDescription
                };
            }
        }
        if (this.reportFiles.java && this.reportFiles.class && this.reportFiles.java.files && this.reportFiles.class.files) {
            formData.append('javaFile', this.reportFiles.java.files[0]);
            formData.append('compiledJavaFile', this.reportFiles.class.files[0]);
        }
        formData.append('report', new Blob([JSON.stringify(tempReportProfile)], {
            type: 'application/json'
        }));
        this.subscriptions['updateReport'] = this._adminCreateReportService.updateReport(formData).subscribe(function (res) {
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
            var alert = new models_1.Alert(null, true);
            alert.message = res.message;
            _this._appDataService.setReportMessage(alert);
            _this._router.navigate(['admin/report_management']);
        }, function (err) {
            _this.createReportErrors = err;
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Load roles
     * @author Kirey
     */
    AdminCreateReportCmp.prototype.getRoles = function () {
        var _this = this;
        this.subscriptions['getRoles'] = this._adminCreateReportService.getRolesRest().subscribe(function (res) {
            _this.roles = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Deleting validation class for report
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.deleteValidationClass = function (reportProfile) {
        var _this = this;
        this.subscriptions['deleteValidationClass'] = this._adminCreateReportService.deleteValidationClassByReportId(reportProfile.id).finally(function () {
            _this.afterValidationDeleteCleanup();
        }).subscribe(function (res) {
            _this.getValidationClasses();
            _this._utilityService.setAlert(_this.componentAlert, res.message, res.statusCode);
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Fires after deleting of validation
     * class and it cleans up the data
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.afterValidationDeleteCleanup = function () {
        this.hasKjcClassesInitially = false;
        this.reportProfile.kjcClasses = null;
        $('#file-input-java').val("");
        $("#file-input-class").val("");
        this.reportFiles.java = null;
        this.reportFiles.class = null;
        this.reportProfile.kjcClassesDescription = null;
    };
    /**
     * Method that executes every time when file is changed
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.onChangeFile = function (event, fileType) {
        if (fileType == "java") {
            this.reportProfile.kjcClassesDescription = null;
            this.reportProfile.kjcClasses = null;
        }
        if (event.target.files[0]) {
            this.reportFiles[fileType] = event.target;
        }
        else {
            this.reportFiles[fileType] = '';
        }
    };
    /**
     * Update subreport files
     * @author DynTech
     */
    AdminCreateReportCmp.prototype.onSubFileChange = function (event, subreport) {
        LOOP: for (var key in this.reportFiles.subreport) {
            if (this.reportFiles.subreport[key].name == subreport.name) {
                this.reportFiles.subreport[key].file = event.target.files[0];
                this.reportFiles.subreport[key].fileName = this.reportFiles.subreport[key].file.name;
                break LOOP;
            }
        }
    };
    /**
     * Fires if a field is marked as sql
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.onSqlChange = function (field, type) {
        if (type == 'sql') {
            if (field.isDependent) {
                this.removeDependentParamFromList(field);
            }
            field.isDependent = false;
            if (field.isSql) {
                this.loadAllTables(field);
            }
            else {
                field.dbTable = null;
                field.dbColumn = null;
            }
        }
        else {
            field.isSql = false;
            if (field.isDependent) {
                if (this.dependencyParameters.length > 0) {
                    field.dependencyParamName = this.dependencyParameters[0].value;
                }
                // Add current dependent parameter to host parameter's list of depenent params
                MAINLOOP: for (var _i = 0, _a = this.reportProfile.kjcReportParameterses; _i < _a.length; _i++) {
                    var fieldRow = _a[_i];
                    for (var _b = 0, fieldRow_1 = fieldRow; _b < fieldRow_1.length; _b++) {
                        var fieldColumn = fieldRow_1[_b];
                        if (fieldColumn.key == field.dependencyParamName) {
                            fieldColumn.dependentParams.push(field.key);
                            break MAINLOOP;
                        }
                    }
                }
                this.loadAllTables(field);
            }
            else {
                this.removeDependentParamFromList(field);
                field.dbTable = null;
                field.dbColumn = null;
            }
        }
    };
    /**
     * Remove dependent parameter from list of dependency param's dependent param list
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.removeDependentParamFromList = function (field) {
        for (var _i = 0, _a = this.reportProfile.kjcReportParameterses; _i < _a.length; _i++) {
            var fieldRow = _a[_i];
            for (var _b = 0, fieldRow_2 = fieldRow; _b < fieldRow_2.length; _b++) {
                var fieldColumn = fieldRow_2[_b];
                if (fieldColumn.key == field.dependencyParamName) {
                    var indexTemp = fieldColumn.dependentParams.indexOf(field.key);
                    fieldColumn.dependentParams.splice(indexTemp, 1);
                }
            }
        }
    };
    /**
     * When depndency parameter changes for dependent parameter, update list of dependent parameters
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.onDependencyParamChange = function (field) {
        for (var _i = 0, _a = this.reportProfile.kjcReportParameterses; _i < _a.length; _i++) {
            var fieldRow = _a[_i];
            for (var _b = 0, fieldRow_3 = fieldRow; _b < fieldRow_3.length; _b++) {
                var fieldColumn = fieldRow_3[_b];
                var indexTemp = fieldColumn.dependentParams.indexOf(field.key);
                fieldColumn.dependentParams.splice(indexTemp, 1);
            }
        }
        MAINLOOP: for (var _c = 0, _d = this.reportProfile.kjcReportParameterses; _c < _d.length; _c++) {
            var fieldRow = _d[_c];
            for (var _e = 0, fieldRow_4 = fieldRow; _e < fieldRow_4.length; _e++) {
                var fieldColumn = fieldRow_4[_e];
                if (fieldColumn.key == field.dependencyParamName) {
                    fieldColumn.dependentParams.push(field.key);
                    break MAINLOOP;
                }
            }
        }
    };
    /**
     * Fires after every table changed
     * (if parameter is marked as sql)
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.onTableChange = function (field, activateEdit) {
        var _this = this;
        this.columns = [];
        this.subscriptions['getAllColumns'] = this._adminCreateReportService.getAllColumns(field.dbTable).subscribe(function (res) {
            var temp = [];
            for (var key in res.data) {
                temp.push({ label: res.data[key], value: res.data[key] });
            }
            _this.columns = temp;
            if (!activateEdit) {
                field.dbColumn = res.data[0];
            }
        });
    };
    /**
     * Method to be executed when Jrxml file is changed
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.onChangeJrxml = function (event) {
        var _this = this;
        if (event.target.files.length > 0) {
            var reader = new FileReader();
            reader.readAsText(event.target.files[0], 'UTF-8');
            reader.onload = function (evt) {
                var parser = new DOMParser().parseFromString(evt.target.result, 'application/xml');
                parser = parser.getElementsByTagName('jasperReport')[0].getElementsByTagName('parameter');
                _this.addJasperParams(_this.xmlToJasperParams(parser), _this.reportProfile);
                _this.reportFiles.jrxml = event.target;
            };
        }
        else {
            this.reportFiles.jrxml = '';
            this.reportProfile.kjcReportParameterses = [[]];
            this.isTranslated = false;
        }
    };
    /**
     * Loading all companies
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.loadCompanies = function () {
        var _this = this;
        this.subscriptions['loadCompanies'] = this._adminCreateReportService.getAvailableCompanies().subscribe(function (res) {
            _this.companies = res.data;
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /**
     * Parse jasper parameters from xml array to JSON
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.xmlToJasperParams = function (params) {
        var paramsTemp = [];
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            paramsTemp.push(new models_2.JasperParameter(param.attributes.name.value, param.attributes.class.value));
        }
        return paramsTemp;
    };
    /**
     * Fill report params with jasper params
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.addJasperParams = function (params, reportProfile) {
        this.reportProfileCopy = this._utilityService.copy(reportProfile);
        this.reportProfileCopy.kjcReportParameterses = [[]];
        this.reportFiles.subreport = [];
        reportProfile.kjcReportParameterses = [[]];
        this.isTranslated = false;
        var iterator = 0;
        for (var _i = 0, params_2 = params; _i < params_2.length; _i++) {
            var param = params_2[_i];
            var parsedJasperDataType = this.parseJasperDataType(param.type);
            if (parsedJasperDataType != 'HashMap' && parsedJasperDataType != 'JasperReport') {
                reportProfile.kjcReportParameterses[0].push({
                    paramId: iterator,
                    name: param.name,
                    key: param.name,
                    type: parsedJasperDataType,
                    description: '',
                    minValue: null,
                    maxValue: null,
                    isMandatory: false,
                    isSql: false,
                    isDependent: false,
                    dependentParams: []
                });
            }
            else if (parsedJasperDataType == 'JasperReport') {
                if (param.name == 'translationMap') {
                    this.isTranslated = true;
                }
                else {
                    this.reportFiles.subreport.push({ name: param.name, file: null, fileName: null });
                }
            }
            else {
                if (param.name == 'translationMap') {
                    this.isTranslated = true;
                }
            }
            this.reportProfileCopy.kjcReportParameterses[0].push({
                name: param.name,
                key: param.name,
                type: parsedJasperDataType,
                description: '',
                minValue: null,
                maxValue: null,
                isMandatory: false
            });
            iterator++;
        }
    };
    /**
     * Parse Jasper data type to report data type
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.parseJasperDataType = function (type) {
        var split = type.split('.');
        return constants_1.Constants.JASPER_DATA_TYPES_PAIRS[split[split.length - 1]];
    };
    /*--------- Rows --------*/
    /**
     * Add row at the beggining of the canvas
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.addRowBegining = function (fieldsMatrixRef) {
        fieldsMatrixRef.unshift([]);
    };
    /**
     * Add row into form
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.addRow = function (fieldsMatrixRef) {
        fieldsMatrixRef.push([]);
    };
    /**
     * Add row in between rows
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.addRowBetween = function (fieldsMatrixRef, row) {
        fieldsMatrixRef.splice(row + 1, 0, []);
    };
    /**
     * Remove row from form
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.removeRow = function (fieldsMatrixRef, rowIndex) {
        fieldsMatrixRef.splice(rowIndex, 1);
    };
    /*--------- Field --------*/
    /**
     * Activate edit mode on parameter
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.activateEditMode = function (row, column, field) {
        this.currentChangingParameter.y = row;
        this.currentChangingParameter.x = column;
        this.currentChangingParameter.bEditMode = true;
        if (field.dbTable) {
            this.dependencyParameters = this.removeDependencyParam(this.dependencyParameters, field.key);
            this.loadAllTables(field, true);
        }
    };
    /**
     * Deactivate edit mode on Done button
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.deactivateEditMode = function (field) {
        if (field.dbTable) {
            this.dependencyParameters.push({ label: field.name, value: field.key });
        }
        else {
            this.dependencyParameters = this.removeDependencyParam(this.dependencyParameters, field.key);
        }
        this.currentChangingParameter.bEditMode = false;
    };
    /*--------- State check methods --------*/
    /**
     * Check if the last row is populated
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.isBeforeRowPopulated = function (fieldsMatrixRef) {
        if (fieldsMatrixRef) {
            var tempLength = fieldsMatrixRef.length;
            return fieldsMatrixRef[tempLength - 1].length > 0;
        }
        else {
            return false;
        }
    };
    /**
     * Check if given field is in edit mode
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.isFieldInEditMode = function (currentChangingParameterRef, row, column) {
        return currentChangingParameterRef.y == row && currentChangingParameterRef.x == column && currentChangingParameterRef.bEditMode;
    };
    /**
     * Condition for showing add row between rows icon
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.showAddRowBetween = function (fieldsMatrixRef, row) {
        var bTempNext = true;
        var bTempPrev = true;
        var bIsRowEmpty = fieldsMatrixRef[row].length > 0;
        var bTempIsNotLast = fieldsMatrixRef.length > row + 1;
        if (bTempIsNotLast) {
            switch (row) {
                case 0:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    break;
                case fieldsMatrixRef.length - 1:
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;
                default:
                    bTempNext = fieldsMatrixRef[row + 1].length > 0;
                    bTempPrev = fieldsMatrixRef[row - 1].length > 0;
                    break;
            }
        }
        return bTempNext && bTempNext && bTempIsNotLast && bIsRowEmpty;
    };
    /**
     * Check what type of filed is selected to display text for max and min properties
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.minMaxValueTypeCheck = function (type) {
        if (type == 'String') {
            return 'Length';
        }
        else {
            return 'Value';
        }
    };
    /**
     * Check if report profile is valid for submit button
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.isReportProfileValid = function (reportProfileRef, reportFiles) {
        if (this.bMoveMode || this.currentChangingParameter.bEditMode) {
            return false;
        }
        for (var _i = 0, _a = reportProfileRef.kjcReportParameterses; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var column = row_1[_b];
                if (column.name == '') {
                    return false;
                }
            }
        }
        if (reportProfileRef.name == '') {
            return false;
        }
        if (this.reportFiles.java && !this.reportFiles.class) {
            return false;
        }
        if (this.reportFiles.java && this.reportFiles.class) {
            if (!this.javaClassMatching(reportFiles.class, reportFiles.java)) {
                return false;
            }
        }
        return reportFiles;
    };
    /**
     * Check if java cass and class file match by name
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.javaClassMatching = function (classFile, javaFile) {
        return new fileExtensionTrimmer_pipe_1.FileExtensionTrimmer().transform(classFile.files[0].name) == new fileExtensionTrimmer_pipe_1.FileExtensionTrimmer().transform(javaFile.files[0].name);
    };
    //Needs review
    AdminCreateReportCmp.prototype.javaJasperMatching = function (subreport) {
        for (var key in this.reportFiles.subreport) {
            if (this.reportFiles.subreport.file != undefined)
                if (new fileExtensionTrimmer_pipe_1.FileExtensionTrimmer().transform(this.reportFiles.subreport[key].file.name) == new fileExtensionTrimmer_pipe_1.FileExtensionTrimmer().transform(subreport.file.name))
                    return true;
        }
        return false;
    };
    /**
     * Checks if max and min values go in range with eachother
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.validateMinMax = function (parameter) {
        if (parameter.minValue - parameter.maxValue > 0) {
            parameter.minValue = parameter.maxValue ? parameter.maxValue - 1 : null;
        }
    };
    /*--------- Utility --------*/
    /**
     * Fires after report is submitted.
     * This should clean after form.
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.afterSubmitCleanup = function () {
        //Hax for clearing inputs with type file
        $('input[type=file]').each(function (i, el) {
            var elem = $(el);
            elem.val("");
        });
        this.reportFiles = new models_2.ReportFiles();
        this.reportProfile = {
            name: '',
            type: 'sync',
            kjcClasses: null,
            flEnabled: true,
            description: '',
            kjcApplicationRoleses: [],
            kjcReportBlobses: [],
            kjcReportParameterses: [[]],
            kjcClassesDescription: null
        };
        this.reportProfileCopy = this.reportProfile;
        this.selectedRoles = [constants_1.Constants.ROLES.SUPER_ADMIN];
        this.tables = [];
        this.columns = [];
    };
    /**
     * Setting kjcClasses description
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.onClassesChange = function (event, editJavaFile, editClassFile) {
        if (editJavaFile) {
            this.reportFiles.java = null;
            this.reportFiles.class = null;
            editJavaFile.value = "";
        }
        if (event.value)
            this.reportProfile.kjcClassesDescription = this.reportProfile.kjcClasses.description;
        else
            this.reportProfile.kjcClassesDescription = null;
    };
    /**
     * On Edit of a report
     * sql is being built up for certain field
     * @author Nikola Gavric
     */
    AdminCreateReportCmp.prototype.populateEditReport = function (report) {
        for (var key in report.kjcReportParameterses) {
            for (var _i = 0, _a = report.kjcReportParameterses[key]; _i < _a.length; _i++) {
                var param = _a[_i];
                if (param.dbTable != null && param.dbColumn != "" && (param.type == "String" || param.type == "Integer")) {
                    if (param.dependencyParameter) {
                        param.isDependent = true;
                        param.dependencyParamName = param.dependencyParameter.key;
                    }
                    else {
                        param.isSql = true;
                    }
                    this.dependencyParameters.push({ label: param.name, value: param.key });
                    param.dependentParams = [];
                    //  Update list of dependent params in dependency param
                    for (var keySub in report.kjcReportParameterses) {
                        for (var _b = 0, _c = report.kjcReportParameterses[key]; _b < _c.length; _b++) {
                            var paramSub = _c[_b];
                            if (paramSub.dependencyParameter && param.key == paramSub.dependencyParameter.key) {
                                param.dependentParams.push(paramSub.dependencyParameter.key);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Matrix for parameters converted into one array for Rest call
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.parameterMatrixToArray = function (matrix) {
        var tempResult = [];
        var tempMatrix = this._utilityService.copy(matrix);
        var tempCoordinates = [0, 0];
        for (var _i = 0, tempMatrix_1 = tempMatrix; _i < tempMatrix_1.length; _i++) {
            var row = tempMatrix_1[_i];
            for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {
                var column = row_2[_a];
                column.position = tempCoordinates[0] + ',' + tempCoordinates[1];
                tempResult.push(column);
                tempCoordinates[1]++;
            }
            tempCoordinates[0]++;
            tempCoordinates[1] = 0;
        }
        tempMatrix = tempResult;
        return tempMatrix;
    };
    /**
     * Transform parameters array into matrix
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.parametersArrayToMatrix = function (parametersArrayRef) {
        var tempParameters = this._utilityService.copy(parametersArrayRef);
        var tempMatrix = [[]];
        var tempRow = 0;
        for (var _i = 0, tempParameters_1 = tempParameters; _i < tempParameters_1.length; _i++) {
            var parameter = tempParameters_1[_i];
            if (parameter.key != "translationMap") {
                var tempPosition = parameter.position.split(',');
                if (tempRow != tempPosition[0]) {
                    tempMatrix.push([]);
                }
                tempMatrix[parseInt(tempPosition[0])].push(parameter);
                tempRow = tempPosition[0];
            }
        }
        return tempMatrix;
    };
    /**
     * Sort incoming parameters from report by position
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.sortReportParameters = function (reportsRef) {
        reportsRef.kjcReportParameterses = reportsRef.kjcReportParameterses.sort(function (a, b) {
            return a.position > b.position;
        });
    };
    /**
     * Remove dependency param when param stops being dependent
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.removeDependencyParam = function (dependencyParameters, paramKey) {
        return dependencyParameters.filter(function (param) {
            return param.value != paramKey;
        });
    };
    /**
     * Update dependency param list from the report
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.updateDependencyParamList = function (field) {
        for (var _i = 0, _a = this.dependencyParameters; _i < _a.length; _i++) {
            var param = _a[_i];
            if (param.value == field.key) {
                param.label = field.name;
                return;
            }
        }
    };
    /**
     *Check if all of report's subreports exist
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.checkIfSubreportsExist = function () {
        var result = false;
        if (this.reportFiles.subreport) {
            for (var i = 0; i < this.reportFiles.subreport.length; i++) {
                if (!this.reportFiles.subreport[i].file) {
                    result = true;
                    break;
                }
            }
            return result;
        }
    };
    /**
     * Check if submit button is disabled
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.disableSubmitButton = function () {
        return !this.isReportProfileValid(this.reportProfile, this.reportFiles) || this.checkIfSubreportsExist() || !this.reportFiles.jrxml || !this.reportFiles.jasper || (!this.reportProfile.kjcCompanieses && this.reportProfile.kjcCompanieses.length == 0);
    };
    /**
     * Check if submit button is disabled
     * @author Mario Petrovic
     */
    AdminCreateReportCmp.prototype.disableSubmitButtonEdit = function () {
        return !this.isReportProfileValid(this.reportProfile, this.reportFiles);
    };
    /**
     * Remove file from file input
     * @author Stefan Svrkota
     */
    AdminCreateReportCmp.prototype.clearFileInput = function (fileInput, fileInput1) {
        fileInput.value = "";
        if (fileInput1) {
            fileInput1.value = "";
        }
        if (fileInput.id == "file-input-java") {
            this.reportFiles.java = null;
            this.reportFiles.class = null;
        }
        else if (fileInput.id == "file-input-class") {
            this.reportFiles.class = null;
        }
        else if (fileInput.id == "file-input-properties") {
            this.reportFiles.properties = null;
        }
    };
    /**
     * Get all validation classes
     * @author Stefan Svrkota
     */
    AdminCreateReportCmp.prototype.getValidationClasses = function () {
        var _this = this;
        this.subscriptions['classes'] = this._adminCreateReportService.getValidationClasses().subscribe(function (res) {
            _this.classes = [];
            _this.classes.push({ label: "Select", value: null });
            for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                var classes = _a[_i];
                _this.classes.push({ label: classes.kjcPackages.name + '.' + classes.name, value: classes });
            }
        }, function (err) {
            _this._utilityService.setAlert(_this.componentAlert, err.message, err.statusCode, err.errors);
        });
    };
    /*--------- NG On Init ---------*/
    AdminCreateReportCmp.prototype.ngOnInit = function () {
        var _this = this;
        // Initital method to be executed when page loads
        var paramsTemp = this._activatedRoute;
        var title = Object.keys(paramsTemp.params.value).length ? 'mainHeaderEdit' : '';
        this._appService.pageLoaded(title, this);
        // Variables initialization
        this.roles = [];
        this.bMoveMode = false;
        this.componentAlert = new models_1.Alert(null, true);
        this.editPage = false;
        this.currentChangingParameter = new models_2.ChangingParameter();
        this.selectedRoles = [constants_1.Constants.ROLES.SUPER_ADMIN];
        this.selectedCompanies = [];
        this.status = false;
        this.editFix = true;
        this.hasKjcClassesInitially = false;
        this.subscriptions = {};
        this.getRoles();
        this.loadCompanies();
        this.emptyField = {
            name: '',
            key: 'jr.',
            type: 'String',
            description: '',
            minValue: null,
            maxValue: null,
        };
        this.reportProfile = {
            name: '',
            type: 'sync',
            kjcClasses: null,
            flEnabled: true,
            description: '',
            kjcApplicationRoleses: [],
            kjcReportBlobses: [],
            kjcCompanieses: [],
            kjcReportParameterses: [[]],
            kjcClassesDescription: null
        };
        this.dependencyParameters = [];
        this.reportFiles = new models_2.ReportFiles();
        this.isTranslated = false;
        // Initial methods
        this.getValidationClasses();
        this._appService.languageChangeForComponent(this);
        this.subscriptions['params'] = this._activatedRoute.params.subscribe(function (params) {
            if (params['id']) {
                _this.editFix = false;
                _this.editPage = true;
                _this.subscriptions['getReportById'] = _this._adminCreateReportService.getReportById(params['id']).subscribe(function (res) {
                    if (res.data) {
                        _this.selectedRoles = [];
                        _this.sortReportParameters(res.data);
                        _this.reportProfile = res.data;
                        for (var i = 0; i < _this.reportProfile.kjcApplicationRoleses.length; i++) {
                            _this.selectedRoles.push(_this.reportProfile.kjcApplicationRoleses[i].name);
                        }
                        for (var i = 0; i < _this.reportProfile.kjcCompanieses.length; i++) {
                            _this.selectedCompanies.push(_this.reportProfile.kjcCompanieses[i].id);
                        }
                        if (res.data.kjcClasses) {
                            _this.hasKjcClassesInitially = true;
                            res.data.kjcClassesDescription = res.data.kjcClasses.description;
                        }
                        _this.editFix = true;
                        _this.reportProfile.kjcReportParameterses = _this.parametersArrayToMatrix(_this.reportProfile.kjcReportParameterses);
                        _this.populateEditReport(_this.reportProfile);
                    }
                    else {
                        _this._router.navigate(['admin/report_management']);
                    }
                }, function (err) {
                    _this._router.navigate(['admin/report_management']);
                }),
                    function (err) {
                        _this._router.navigate(['admin/report_management']);
                    };
            }
        });
    };
    /*--------- NG On Destroy ---------*/
    AdminCreateReportCmp.prototype.ngOnDestroy = function () {
        this._dragulaService.destroy('bag-main');
        this._appService.refreshEmitters(this.subscriptions);
    };
    AdminCreateReportCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'adminCreateReport.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [utility_service_1.UtilityService, ng2_dragula_1.DragulaService, adminCreateReport_service_1.AdminCreateReportService, ng2_translate_1.TranslateService, app_service_1.AppService, router_1.ActivatedRoute, router_1.Router, core_1.ChangeDetectorRef, appData_service_1.AppDataService, constants_1.Constants])
    ], AdminCreateReportCmp);
    return AdminCreateReportCmp;
}());
exports.AdminCreateReportCmp = AdminCreateReportCmp;
//# sourceMappingURL=adminCreateReport.cmp.js.map