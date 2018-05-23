"use strict";
var ActivateUser = (function () {
    function ActivateUser(password, mailHashSecret, code, hashCode) {
        this.password = password;
        this.mailHashSecret = mailHashSecret;
        this.code = code;
        this.hashCode = hashCode;
    }
    return ActivateUser;
}());
exports.ActivateUser = ActivateUser;
//# sourceMappingURL=activateUser.model.js.map