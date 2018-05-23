"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var models_1 = require("../../kjgri_shared/models");
var SearchQueryParams = (function (_super) {
    __extends(SearchQueryParams, _super);
    function SearchQueryParams(size, page) {
        _super.call(this);
        this.page = page;
        this.size = size;
    }
    return SearchQueryParams;
}(models_1.PaginationQueryParams));
exports.SearchQueryParams = SearchQueryParams;
//# sourceMappingURL=searchQueryParams.model.js.map