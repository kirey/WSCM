"use strict";
var PasswordChange = (function () {
    function PasswordChange(password, mailHashSecret, code, hashCode) {
        this.password = password;
        this.mailHashSecret = mailHashSecret;
        this.code = code;
        this.hashCode = hashCode;
    }
    return PasswordChange;
}());
exports.PasswordChange = PasswordChange;
//# sourceMappingURL=passwordChange.model.js.map