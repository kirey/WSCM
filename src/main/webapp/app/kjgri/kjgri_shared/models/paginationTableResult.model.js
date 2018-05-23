"use strict";
var PaginationTableResult = (function () {
    function PaginationTableResult(results, totalCount) {
        this.results = results ? results : [];
        this.totalCount = totalCount ? totalCount : 0;
    }
    return PaginationTableResult;
}());
exports.PaginationTableResult = PaginationTableResult;
//# sourceMappingURL=paginationTableResult.model.js.map