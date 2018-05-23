"use strict";
var Alert = (function () {
    function Alert(timeout, dismissible) {
        this.timeout = timeout;
        this.dismissible = dismissible;
        this.message = '';
        this.type = null;
        this.show = false;
    }
    return Alert;
}());
exports.Alert = Alert;
//# sourceMappingURL=alert.model.js.map