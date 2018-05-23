"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var models_1 = require("../../kjgri_shared/models");
var QueryParams = (function (_super) {
    __extends(QueryParams, _super);
    function QueryParams(size, page) {
        _super.call(this);
        this.size = size;
        this.page = page;
    }
    return QueryParams;
}(models_1.PaginationQueryParams));
exports.QueryParams = QueryParams;
//# sourceMappingURL=queryParams.model.js.map