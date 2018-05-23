"use strict";
var DataTableConfig = (function () {
    function DataTableConfig(rows, paginator, pageLinks, rowsPerPageOptions, reorderableColumns) {
        this.rows = rows;
        this.paginator = paginator;
        this.pageLinks = pageLinks;
        this.rowsPerPageOptions = rowsPerPageOptions;
        this.reorderableColumns = reorderableColumns;
    }
    return DataTableConfig;
}());
exports.DataTableConfig = DataTableConfig;
//# sourceMappingURL=dataTableConfig.model.js.map