"use strict";
function Timeout(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    return function (targetComponent, methodName, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            setTimeout(function () {
                originalMethod.apply(_this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
exports.Timeout = Timeout;
//# sourceMappingURL=setTimeout.js.map