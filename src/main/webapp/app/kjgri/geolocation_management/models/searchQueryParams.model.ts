import { PaginationQueryParams } from "../../kjgri_shared/models";

export class SearchQueryParams extends PaginationQueryParams {
    istat: string;
    sub: string

    constructor(size: number, page: number) {
        super();

        this.page = page;
        this.size = size;
    }
}
