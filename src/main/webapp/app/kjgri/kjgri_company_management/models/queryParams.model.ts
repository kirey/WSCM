import { PaginationQueryParams } from "../../kjgri_shared/models";

export class QueryParams extends PaginationQueryParams {
    companyName?: string;
    companyType?: string;

    constructor(size: number, page: number) {
        super();
        this.size = size;
        this.page = page;
    }
}