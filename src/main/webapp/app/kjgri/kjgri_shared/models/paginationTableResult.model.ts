export class PaginationTableResult<R> {
    results: R[];
    totalCount: number;

    constructor(results?: R | any, totalCount?: number) {
        this.results = results ? results : [];
        this.totalCount = totalCount ? totalCount : 0;
    }
}