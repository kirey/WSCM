import { PaginationQueryParams } from "../../kjgri_shared/models";

export class CompanyQueryParams extends PaginationQueryParams {
    companyName: string;

    constructor(size: number, page: number) {
        super();

        this.size = size;
        this.page = page;
    }
}