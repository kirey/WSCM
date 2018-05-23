export class DataTableConfig {
    rows: number;
    paginator: boolean;
    pageLinks: number;
    rowsPerPageOptions: number[];
    reorderableColumns: boolean;

    constructor(
        rows?: number, 
        paginator?: boolean,
        pageLinks?: number,
        rowsPerPageOptions?: number[],
        reorderableColumns?: boolean
        ){
            this.rows = rows;
            this.paginator = paginator;
            this.pageLinks = pageLinks;
            this.rowsPerPageOptions = rowsPerPageOptions;
            this.reorderableColumns = reorderableColumns;
        }
}