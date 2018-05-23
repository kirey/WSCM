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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var bytesConverter_pipe_1 = require('../pipes/bytesConverter.pipe');
var constants_1 = require('../../constants');
/**
 * Service - for component scope
 * @author Mario Petrovic
 */
var UtilityService = (function () {
    function UtilityService(_http) {
        this._http = _http;
        this.restMessageContent = {
            originCmp: '',
            originMethod: '',
            message: '',
            datasize: ''
        };
        this.bPrintMessage = true;
    }
    /**
     * Transform given array of objects to usable array of specific objects
     * @author Mario Petrovic
     */
    UtilityService.prototype.getObjectArray = function (data) {
        return Object.assign([], data);
    };
    /**
     * Returns copy of given object
     * @author Mario Petrovic
     */
    UtilityService.prototype.copy = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    /**
     * Checks if two objects are equal
     * @author Mario Petrovic
     */
    UtilityService.prototype.equal = function (object1, object2) {
        for (var obj1Prop in object1) {
            switch (typeof (object1[obj1Prop])) {
                case 'object':
                    if (!object1[obj1Prop].equals(object2[obj1Prop])) {
                        return false;
                    }
                    ;
                    break;
                case 'function':
                    if (typeof (object2[obj1Prop]) == 'undefined' || (obj1Prop != 'equals' && object1[obj1Prop].toString() != object2[obj1Prop].toString())) {
                        return false;
                    }
                    ;
                    break;
                default:
                    if (object1[obj1Prop] != object2[obj1Prop]) {
                        return false;
                    }
            }
        }
        for (var obj2Prop in object2) {
            if (typeof (object1[obj2Prop]) == 'undefined') {
                return false;
            }
        }
        return true;
    };
    /**
     * Generate RGBA css value with hex and opacity values
     * @author Mario Petrovic
     */
    UtilityService.prototype.hex2rgba_convert = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, hex.length / 3), 16);
        var g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
        var b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        return result;
    };
    /**
     * Converts milliseconds to minutes and reversed based on output parameter
     * @author Nikola Gavric
     */
    UtilityService.prototype.convertMillisecondsMinutes = function (value, toMinutes) {
        if (toMinutes) {
            return parseFloat((Math.floor(value / 60000)).toFixed(0));
        }
        else {
            return parseFloat((Math.floor(value * 60000)).toFixed(0));
        }
    };
    /**
     * Converts milliseconds to days and reversed based on output parameter
     * @author Mario Petrovic
     */
    UtilityService.prototype.convertMillisecondsDays = function (value, toDays) {
        if (toDays) {
            return parseFloat((Math.floor(value / 86400000)).toFixed(0));
        }
        else {
            return parseFloat((Math.floor(value * 86400000)).toFixed(0));
        }
    };
    /**
     * Set rest console message content
     * @author Mario Petrovic
     */
    UtilityService.prototype.setRestMessageContent = function (originCmp, originMethod, message) {
        this.restMessageContent = {
            originCmp: originCmp,
            originMethod: originMethod,
            message: message,
            time: new Date().getTime()
        };
    };
    /**
     * Convert map to array of objects
     * @author Ciprian Dorofte
     */
    UtilityService.prototype.transformMapToArray = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value).map(function (key) {
            var pair = {};
            var k = 'key';
            var v = 'value';
            pair[k] = key;
            pair[v] = value[key];
            return pair;
        });
    };
    /**
     * Rest GET call to retrieve captcha
     * @author Mario Petrovic
     */
    UtilityService.prototype.getCaptchaRest = function () {
        return this._http.get('rest/users/noAuth/captchacode')
            .map(function (res) { return res.json(); })
            .catch(UtilityService.handleError);
    };
    /**
     * Generate request parameters from object
     * @author Mario Petrovic
     */
    UtilityService.prototype.generateQueryParams = function (params) {
        var generatedParamsTemp = '?';
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var param = _a[_i];
            generatedParamsTemp += param + '=' + params[param] + '&';
        }
        return this.trimCharacter(generatedParamsTemp, '&', false, true);
    };
    /**
     * Generate request parameters from object
     * @author Mario Petrovic
     */
    UtilityService.prototype.generateUrlWithQueryParams = function (url, params) {
        return url + (params ? this.generateQueryParams(params) : '');
    };
    /**
     * Set token in cookies
     * @author Mario Petrovic
     */
    UtilityService.prototype.setToken = function (token) {
        localStorage.setItem(constants_1.Constants.TOKEN_STORED_NAME, token);
    };
    /**
     * Set token in cookies
     * @author Mario Petrovic
     */
    UtilityService.prototype.getToken = function () {
        return localStorage.getItem(constants_1.Constants.TOKEN_STORED_NAME);
    };
    /**
     * Set token in cookies
     * @author Mario Petrovic
     */
    UtilityService.prototype.removeToken = function () {
        localStorage.removeItem(constants_1.Constants.TOKEN_STORED_NAME);
    };
    /**
     * Trim given characters from start and/or end of string
     * @author Mario Petrovic
     */
    UtilityService.prototype.trimCharacter = function (data, char, start, end) {
        var startIndex = data[0] == char && start ? 1 : 0;
        var endIndex = data.slice(-1) == char && end ? data.length - 1 : data.length;
        data = data.slice(startIndex, endIndex);
        return data;
    };
    UtilityService.prototype.removeCharsFromString = function (data, char) {
        if (typeof char == 'object') {
            for (var _i = 0, char_1 = char; _i < char_1.length; _i++) {
                var i = char_1[_i];
                var regExp = new RegExp(i, 'g');
                data = data.replace(regExp, '');
            }
            return data;
        }
        else {
            var regExp = new RegExp(char, 'g');
            return data.replace(regExp, '');
        }
    };
    /**
     * Get value from css property
     * @author Mario Petrovic
     */
    UtilityService.prototype.convertToCssValue = function (cssRule) {
        cssRule = this.removeCharsFromString(cssRule, [';']);
        return cssRule.split(':')[1];
    };
    /**
     * Get property name from rule
     * @author Mario Petrovic
     */
    UtilityService.prototype.extractPropertyName = function (cssRule) {
        cssRule = this.removeCharsFromString(cssRule, ['{', '}']);
        return cssRule.split(':')[0];
    };
    /**
     * Replace char with encoded version in given data
     * @author Mario Petrovic
     */
    UtilityService.prototype.encodeURIChar = function (char, data) {
        var regExp = new RegExp(char, 'g');
        var encodedChar = '';
        switch (char) {
            case '#':
                encodedChar = '%23';
                break;
        }
        return data.replace(regExp, encodedChar);
    };
    /**
     * Trim path parameter from link if
     * @author Mario Petrovic
     */
    UtilityService.prototype.trimPathParameter = function (route) {
        var tempRouteSplit = route.split('/');
        var tempRouteSplitLength = tempRouteSplit.length;
        if (tempRouteSplitLength > 1) {
            if (tempRouteSplit[tempRouteSplitLength - 1].match(/^\d+$/)) {
                tempRouteSplit.splice(-1);
            }
        }
        return tempRouteSplit.join('/');
    };
    /* ------- Methods for REST calls -------- */
    /**
     * Handler for failed http call
     * @author Mario Petrovic
     */
    UtilityService.handleError = function (error) {
        return Promise.reject(error.json());
    };
    /**
     * Handler for successful http call
     * @author Mario Petrovic
     */
    UtilityService.handleSuccess = function (res) {
        return (res.json()) ? res.json() : res;
    };
    /**
     * Method for executing get request that accepts url
     * @author Mario Petrovic
     */
    UtilityService.prototype.getRequest = function (url, requestOptions) {
        return this._http.get(url, requestOptions)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    };
    /**
     * Method for executing post request that accepts url and data
     * @author Mario Petrovic
     */
    UtilityService.prototype.postRequest = function (url, data, requestOptions) {
        return this._http.post(url, data, requestOptions)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    };
    /**
     * Method for executing put request that accepts url and data
     * @author Mario Petrovic
     */
    UtilityService.prototype.putRequest = function (url, data, requestOptions) {
        return this._http.put(url, data, requestOptions)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    };
    /**
     * Method for executing delete request that accepts url
     * @author Mario Petrovic
     */
    UtilityService.prototype.deleteRequest = function (url, requestOptions) {
        return this._http.delete(url, requestOptions)
            .map(UtilityService.handleSuccess)
            .catch(UtilityService.handleError);
    };
    /* ----- Utility methods for alerting ----- */
    /**
     * Set or remove alert in header with message and type
     * @author Mario Petrovic
     */
    UtilityService.prototype.setAlert = function (alert, message, statusCode, errors, returnObject) {
        if (!message) {
            alert.show = false;
        }
        else {
            var tempMessage = '';
            if (returnObject) {
                tempMessage += '<b>' + message + '</b>';
                for (var field in returnObject) {
                    tempMessage += '<div class="error_line">&nbsp;&nbsp;- ' + field + ': ' + returnObject[field] + '</div>';
                }
            }
            else if (errors) {
                var mainComponentCounter = 0;
                tempMessage += '<b>' + message + '</b>';
                for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
                    var error = errors_1[_i];
                    if (error.fieldName == 'mainComponentAlert' || error.fieldName == null) {
                        mainComponentCounter++;
                        tempMessage += '<div class="error_line">&nbsp;&nbsp;- ' + error.errorCode + '</div>';
                    }
                }
                if (mainComponentCounter == 0) {
                    tempMessage = message;
                }
            }
            alert.message = tempMessage ? tempMessage : message;
            switch (statusCode) {
                case 200:
                    alert.type = 'success';
                    break;
                case 202:
                case 204:
                    alert.type = 'warning';
                    break;
                case 400:
                case 500:
                    alert.type = 'danger';
                    break;
                default:
                    alert.type = 'danger';
                    break;
            }
            alert.show = true;
        }
    };
    /**
     * Print success message in console
     * @author Mario Petrovic
     */
    UtilityService.prototype.restConsoleMessage = function (url, method, code, success, res) {
        if (this.bPrintMessage && this.restMessageContent.originCmp && this.restMessageContent.originMethod) {
            url = url.split('?')[0];
            var header = '(' + ((new Date().getTime() - this.restMessageContent.time) / 1000).toFixed(2) + 's)';
            var size = new bytesConverter_pipe_1.BytesConverterPipe().transform(JSON.stringify(res).length);
            var firstRow = '%c ' + method + ': ' + url + ' | (' + code + ')' + ' | ' + size;
            var secondRow = '%c Origin: ' + this.restMessageContent.originCmp + ' -> ' + this.restMessageContent.originMethod;
            var thirdRow = this.restMessageContent.message ? '%c Log message: ' + this.restMessageContent.message : '';
            // Print top border
            var topBorder = '%c ';
            var longerRow = firstRow.length > secondRow.length ? firstRow : secondRow;
            var difference = (longerRow.length - 3 - header.length) / 2;
            for (var i = 0; i < Math.floor(difference); i++) {
                topBorder += '_';
            }
            topBorder += header;
            for (var i = 0; i < Math.ceil(difference); i++) {
                topBorder += '_';
            }
            if (success) {
                console.info(topBorder, 'color: #5FBA7D;');
            }
            else {
                console.error(topBorder, 'color: #EF2B33;');
            }
            // Print connection details and call origin
            if (success) {
                console.info(firstRow, 'color: #5FBA7D;');
                console.info(secondRow, 'color: #5FBA7D;');
            }
            else {
                console.error(firstRow, 'color: #EF2B33;');
                console.error(secondRow, 'color: #EF2B33;');
            }
            // Print component message (optional)
            if (thirdRow) {
                if (success) {
                    console.info(thirdRow, 'color: #5FBA7D;');
                }
                else {
                    console.error(thirdRow, 'color: #EF2B33;');
                }
            }
        }
    };
    /**
     * file: Uint8Array
     * method returns file type
     * @author Stefan Svrkota
     */
    UtilityService.prototype.getFileType = function (file) {
        if (!(file && file.length > 1)) {
            return null;
        }
        if (file[0] === 0xFF && file[1] === 0xD8 && file[2] === 0xFF) {
            return {
                ext: 'jpg',
                mime: 'image/jpeg'
            };
        }
        if (file[0] === 0x89 && file[1] === 0x50 && file[2] === 0x4E && file[3] === 0x47) {
            return {
                ext: 'png',
                mime: 'image/png'
            };
        }
        if (file[0] === 0x47 && file[1] === 0x49 && file[2] === 0x46) {
            return {
                ext: 'gif',
                mime: 'image/gif'
            };
        }
        if (file[8] === 0x57 && file[9] === 0x45 && file[10] === 0x42 && file[11] === 0x50) {
            return {
                ext: 'webp',
                mime: 'image/webp'
            };
        }
        if (file[0] === 0x46 && file[1] === 0x4C && file[2] === 0x49 && file[3] === 0x46) {
            return {
                ext: 'flif',
                mime: 'image/flif'
            };
        }
        // needs to be before `tif` check
        if (((file[0] === 0x49 && file[1] === 0x49 && file[2] === 0x2A && file[3] === 0x0) || (file[0] === 0x4D && file[1] === 0x4D && file[2] === 0x0 && file[3] === 0x2A)) && file[8] === 0x43 && file[9] === 0x52) {
            return {
                ext: 'cr2',
                mime: 'image/x-canon-cr2'
            };
        }
        if ((file[0] === 0x49 && file[1] === 0x49 && file[2] === 0x2A && file[3] === 0x0) || (file[0] === 0x4D && file[1] === 0x4D && file[2] === 0x0 && file[3] === 0x2A)) {
            return {
                ext: 'tif',
                mime: 'image/tiff'
            };
        }
        if (file[0] === 0x42 && file[1] === 0x4D) {
            return {
                ext: 'bmp',
                mime: 'image/bmp'
            };
        }
        if (file[0] === 0x49 && file[1] === 0x49 && file[2] === 0xBC) {
            return {
                ext: 'jxr',
                mime: 'image/vnd.ms-photo'
            };
        }
        if (file[0] === 0x38 && file[1] === 0x42 && file[2] === 0x50 && file[3] === 0x53) {
            return {
                ext: 'psd',
                mime: 'image/vnd.adobe.photoshop'
            };
        }
        // needs to be before `zip` check
        if (file[0] === 0x50 && file[1] === 0x4B && file[2] === 0x3 && file[3] === 0x4 && file[30] === 0x6D && file[31] === 0x69 && file[32] === 0x6D && file[33] === 0x65 && file[34] === 0x74 && file[35] === 0x79 && file[36] === 0x70 && file[37] === 0x65 && file[38] === 0x61 && file[39] === 0x70 && file[40] === 0x70 && file[41] === 0x6C && file[42] === 0x69 && file[43] === 0x63 && file[44] === 0x61 && file[45] === 0x74 && file[46] === 0x69 && file[47] === 0x6F && file[48] === 0x6E && file[49] === 0x2F && file[50] === 0x65 && file[51] === 0x70 && file[52] === 0x75 && file[53] === 0x62 && file[54] === 0x2B && file[55] === 0x7A && file[56] === 0x69 && file[57] === 0x70) {
            return {
                ext: 'epub',
                mime: 'application/epub+zip'
            };
        }
        // needs to be before `zip` check
        // assumes signed .xpi from addons.mozilla.org
        if (file[0] === 0x50 && file[1] === 0x4B && file[2] === 0x3 && file[3] === 0x4 && file[30] === 0x4D && file[31] === 0x45 && file[32] === 0x54 && file[33] === 0x41 && file[34] === 0x2D && file[35] === 0x49 && file[36] === 0x4E && file[37] === 0x46 && file[38] === 0x2F && file[39] === 0x6D && file[40] === 0x6F && file[41] === 0x7A && file[42] === 0x69 && file[43] === 0x6C && file[44] === 0x6C && file[45] === 0x61 && file[46] === 0x2E && file[47] === 0x72 && file[48] === 0x73 && file[49] === 0x61) {
            return {
                ext: 'xpi',
                mime: 'application/x-xpinstall'
            };
        }
        if (file[0] === 0x50 && file[1] === 0x4B && (file[2] === 0x3 || file[2] === 0x5 || file[2] === 0x7) && (file[3] === 0x4 || file[3] === 0x6 || file[3] === 0x8)) {
            return {
                ext: 'zip',
                mime: 'application/zip'
            };
        }
        if (file[257] === 0x75 && file[258] === 0x73 && file[259] === 0x74 && file[260] === 0x61 && file[261] === 0x72) {
            return {
                ext: 'tar',
                mime: 'application/x-tar'
            };
        }
        if (file[0] === 0x52 && file[1] === 0x61 && file[2] === 0x72 && file[3] === 0x21 && file[4] === 0x1A && file[5] === 0x7 && (file[6] === 0x0 || file[6] === 0x1)) {
            return {
                ext: 'rar',
                mime: 'application/x-rar-compressed'
            };
        }
        if (file[0] === 0x1F && file[1] === 0x8B && file[2] === 0x8) {
            return {
                ext: 'gz',
                mime: 'application/gzip'
            };
        }
        if (file[0] === 0x42 && file[1] === 0x5A && file[2] === 0x68) {
            return {
                ext: 'bz2',
                mime: 'application/x-bzip2'
            };
        }
        if (file[0] === 0x37 && file[1] === 0x7A && file[2] === 0xBC && file[3] === 0xAF && file[4] === 0x27 && file[5] === 0x1C) {
            return {
                ext: '7z',
                mime: 'application/x-7z-compressed'
            };
        }
        if (file[0] === 0x78 && file[1] === 0x01) {
            return {
                ext: 'dmg',
                mime: 'application/x-apple-diskimage'
            };
        }
        if ((file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && (file[3] === 0x18 || file[3] === 0x20) && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70) ||
            (file[0] === 0x33 && file[1] === 0x67 && file[2] === 0x70 && file[3] === 0x35) ||
            (file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && file[3] === 0x1C && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70 && file[8] === 0x6D && file[9] === 0x70 && file[10] === 0x34 && file[11] === 0x32 && file[16] === 0x6D && file[17] === 0x70 && file[18] === 0x34 && file[19] === 0x31 && file[20] === 0x6D && file[21] === 0x70 && file[22] === 0x34 && file[23] === 0x32 && file[24] === 0x69 && file[25] === 0x73 && file[26] === 0x6F && file[27] === 0x6D) ||
            (file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && file[3] === 0x1C && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70 && file[8] === 0x69 && file[9] === 0x73 && file[10] === 0x6F && file[11] === 0x6D) ||
            (file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && file[3] === 0x1c && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70 && file[8] === 0x6D && file[9] === 0x70 && file[10] === 0x34 && file[11] === 0x32 && file[12] === 0x0 && file[13] === 0x0 && file[14] === 0x0 && file[15] === 0x0)) {
            return {
                ext: 'mp4',
                mime: 'video/mp4'
            };
        }
        if ((file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && file[3] === 0x1C && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70 && file[8] === 0x4D && file[9] === 0x34 && file[10] === 0x56)) {
            return {
                ext: 'm4v',
                mime: 'video/x-m4v'
            };
        }
        if (file[0] === 0x4D && file[1] === 0x54 && file[2] === 0x68 && file[3] === 0x64) {
            return {
                ext: 'mid',
                mime: 'audio/midi'
            };
        }
        if (file[0] === 0x1A && file[1] === 0x45 && file[2] === 0xDF && file[3] === 0xA3) {
            var sliced_1 = file.subarray(4, 4 + 4096);
            var idPos = sliced_1.findIndex(function (el, i, arr) { return arr[i] === 0x42 && arr[i + 1] === 0x82; });
            if (idPos >= 0) {
                var docTypePos_1 = idPos + 3;
                var findDocType = function (type) { return Array.from(type).every(function (c, i) { return sliced_1[docTypePos_1 + i] === c.charCodeAt(0); }); };
                if (findDocType('matroska')) {
                    return {
                        ext: 'mkv',
                        mime: 'video/x-matroska'
                    };
                }
                if (findDocType('webm')) {
                    return {
                        ext: 'webm',
                        mime: 'video/webm'
                    };
                }
            }
        }
        if (file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x0 && file[3] === 0x14 && file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70) {
            return {
                ext: 'mov',
                mime: 'video/quicktime'
            };
        }
        if (file[0] === 0x52 && file[1] === 0x49 && file[2] === 0x46 && file[3] === 0x46 && file[8] === 0x41 && file[9] === 0x56 && file[10] === 0x49) {
            return {
                ext: 'avi',
                mime: 'video/x-msvideo'
            };
        }
        if (file[0] === 0x30 && file[1] === 0x26 && file[2] === 0xB2 && file[3] === 0x75 && file[4] === 0x8E && file[5] === 0x66 && file[6] === 0xCF && file[7] === 0x11 && file[8] === 0xA6 && file[9] === 0xD9) {
            return {
                ext: 'wmv',
                mime: 'video/x-ms-wmv'
            };
        }
        if (file[0] === 0x0 && file[1] === 0x0 && file[2] === 0x1 && file[3].toString(16)[0] === 'b') {
            return {
                ext: 'mpg',
                mime: 'video/mpeg'
            };
        }
        if ((file[0] === 0x49 && file[1] === 0x44 && file[2] === 0x33) || (file[0] === 0xFF && file[1] === 0xfb)) {
            return {
                ext: 'mp3',
                mime: 'audio/mpeg'
            };
        }
        if ((file[4] === 0x66 && file[5] === 0x74 && file[6] === 0x79 && file[7] === 0x70 && file[8] === 0x4D && file[9] === 0x34 && file[10] === 0x41) || (file[0] === 0x4D && file[1] === 0x34 && file[2] === 0x41 && file[3] === 0x20)) {
            return {
                ext: 'm4a',
                mime: 'audio/m4a'
            };
        }
        // needs to be before `ogg` check
        if (file[28] === 0x4F && file[29] === 0x70 && file[30] === 0x75 && file[31] === 0x73 && file[32] === 0x48 && file[33] === 0x65 && file[34] === 0x61 && file[35] === 0x64) {
            return {
                ext: 'opus',
                mime: 'audio/opus'
            };
        }
        if (file[0] === 0x4F && file[1] === 0x67 && file[2] === 0x67 && file[3] === 0x53) {
            return {
                ext: 'ogg',
                mime: 'audio/ogg'
            };
        }
        if (file[0] === 0x66 && file[1] === 0x4C && file[2] === 0x61 && file[3] === 0x43) {
            return {
                ext: 'flac',
                mime: 'audio/x-flac'
            };
        }
        if (file[0] === 0x52 && file[1] === 0x49 && file[2] === 0x46 && file[3] === 0x46 && file[8] === 0x57 && file[9] === 0x41 && file[10] === 0x56 && file[11] === 0x45) {
            return {
                ext: 'wav',
                mime: 'audio/x-wav'
            };
        }
        if (file[0] === 0x23 && file[1] === 0x21 && file[2] === 0x41 && file[3] === 0x4D && file[4] === 0x52 && file[5] === 0x0A) {
            return {
                ext: 'amr',
                mime: 'audio/amr'
            };
        }
        if (file[0] === 0x25 && file[1] === 0x50 && file[2] === 0x44 && file[3] === 0x46) {
            return {
                ext: 'pdf',
                mime: 'application/pdf'
            };
        }
        if (file[0] === 0x4D && file[1] === 0x5A) {
            return {
                ext: 'exe',
                mime: 'application/x-msdownload'
            };
        }
        if ((file[0] === 0x43 || file[0] === 0x46) && file[1] === 0x57 && file[2] === 0x53) {
            return {
                ext: 'swf',
                mime: 'application/x-shockwave-flash'
            };
        }
        if (file[0] === 0x7B && file[1] === 0x5C && file[2] === 0x72 && file[3] === 0x74 && file[4] === 0x66) {
            return {
                ext: 'rtf',
                mime: 'application/rtf'
            };
        }
        if ((file[0] === 0x77 && file[1] === 0x4F && file[2] === 0x46 && file[3] === 0x46) &&
            ((file[4] === 0x00 && file[5] === 0x01 && file[6] === 0x00 && file[7] === 0x00) ||
                (file[4] === 0x4F && file[5] === 0x54 && file[6] === 0x54 && file[7] === 0x4F))) {
            return {
                ext: 'woff',
                mime: 'application/font-woff'
            };
        }
        if ((file[0] === 0x77 && file[1] === 0x4F && file[2] === 0x46 && file[3] === 0x32) &&
            ((file[4] === 0x00 && file[5] === 0x01 && file[6] === 0x00 && file[7] === 0x00) ||
                (file[4] === 0x4F && file[5] === 0x54 && file[6] === 0x54 && file[7] === 0x4F))) {
            return {
                ext: 'woff2',
                mime: 'application/font-woff'
            };
        }
        if ((file[34] === 0x4C && file[35] === 0x50) &&
            ((file[8] === 0x00 && file[9] === 0x00 && file[10] === 0x01) ||
                (file[8] === 0x01 && file[9] === 0x00 && file[10] === 0x02) ||
                (file[8] === 0x02 && file[9] === 0x00 && file[10] === 0x02))) {
            return {
                ext: 'eot',
                mime: 'application/octet-stream'
            };
        }
        if (file[0] === 0x00 && file[1] === 0x01 && file[2] === 0x00 && file[3] === 0x00 && file[4] === 0x00) {
            return {
                ext: 'ttf',
                mime: 'application/font-sfnt'
            };
        }
        if (file[0] === 0x4F && file[1] === 0x54 && file[2] === 0x54 && file[3] === 0x4F && file[4] === 0x00) {
            return {
                ext: 'otf',
                mime: 'application/font-sfnt'
            };
        }
        if (file[0] === 0x00 && file[1] === 0x00 && file[2] === 0x01 && file[3] === 0x00) {
            return {
                ext: 'ico',
                mime: 'image/x-icon'
            };
        }
        if (file[0] === 0x46 && file[1] === 0x4C && file[2] === 0x56 && file[3] === 0x01) {
            return {
                ext: 'flv',
                mime: 'video/x-flv'
            };
        }
        if (file[0] === 0x25 && file[1] === 0x21) {
            return {
                ext: 'ps',
                mime: 'application/postscript'
            };
        }
        if (file[0] === 0xFD && file[1] === 0x37 && file[2] === 0x7A && file[3] === 0x58 && file[4] === 0x5A && file[5] === 0x00) {
            return {
                ext: 'xz',
                mime: 'application/x-xz'
            };
        }
        if (file[0] === 0x53 && file[1] === 0x51 && file[2] === 0x4C && file[3] === 0x69) {
            return {
                ext: 'sqlite',
                mime: 'application/x-sqlite3'
            };
        }
        if (file[0] === 0x4E && file[1] === 0x45 && file[2] === 0x53 && file[3] === 0x1A) {
            return {
                ext: 'nes',
                mime: 'application/x-nintendo-nes-rom'
            };
        }
        if (file[0] === 0x43 && file[1] === 0x72 && file[2] === 0x32 && file[3] === 0x34) {
            return {
                ext: 'crx',
                mime: 'application/x-google-chrome-extension'
            };
        }
        if ((file[0] === 0x4D && file[1] === 0x53 && file[2] === 0x43 && file[3] === 0x46) ||
            (file[0] === 0x49 && file[1] === 0x53 && file[2] === 0x63 && file[3] === 0x28)) {
            return {
                ext: 'cab',
                mime: 'application/vnd.ms-cab-compressed'
            };
        }
        // needs to be before `ar` check
        if (file[0] === 0x21 && file[1] === 0x3C && file[2] === 0x61 && file[3] === 0x72 && file[4] === 0x63 && file[5] === 0x68 && file[6] === 0x3E && file[7] === 0x0A && file[8] === 0x64 && file[9] === 0x65 && file[10] === 0x62 && file[11] === 0x69 && file[12] === 0x61 && file[13] === 0x6E && file[14] === 0x2D && file[15] === 0x62 && file[16] === 0x69 && file[17] === 0x6E && file[18] === 0x61 && file[19] === 0x72 && file[20] === 0x79) {
            return {
                ext: 'deb',
                mime: 'application/x-deb'
            };
        }
        if (file[0] === 0x21 && file[1] === 0x3C && file[2] === 0x61 && file[3] === 0x72 && file[4] === 0x63 && file[5] === 0x68 && file[6] === 0x3E) {
            return {
                ext: 'ar',
                mime: 'application/x-unix-archive'
            };
        }
        if (file[0] === 0xED && file[1] === 0xAB && file[2] === 0xEE && file[3] === 0xDB) {
            return {
                ext: 'rpm',
                mime: 'application/x-rpm'
            };
        }
        if ((file[0] === 0x1F && file[1] === 0xA0) ||
            (file[0] === 0x1F && file[1] === 0x9D)) {
            return {
                ext: 'Z',
                mime: 'application/x-compress'
            };
        }
        if (file[0] === 0x4C && file[1] === 0x5A && file[2] === 0x49 && file[3] === 0x50) {
            return {
                ext: 'lz',
                mime: 'application/x-lzip'
            };
        }
        if (file[0] === 0xD0 && file[1] === 0xCF && file[2] === 0x11 && file[3] === 0xE0 && file[4] === 0xA1 && file[5] === 0xB1 && file[6] === 0x1A && file[7] === 0xE1) {
            return {
                ext: 'msi',
                mime: 'application/x-msi'
            };
        }
        if (file[0] === 0x06 && file[1] === 0x0E && file[2] === 0x2B && file[3] === 0x34 && file[4] === 0x02 && file[5] === 0x05 && file[6] === 0x01 && file[7] === 0x01 && file[8] === 0x0D && file[9] === 0x01 && file[10] === 0x02 && file[11] === 0x01 && file[12] === 0x01 && file[13] === 0x02) {
            return {
                ext: 'mxf',
                mime: 'application/mxf'
            };
        }
        return null;
    };
    UtilityService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.SkipSelf()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UtilityService);
    return UtilityService;
}());
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.service.js.map