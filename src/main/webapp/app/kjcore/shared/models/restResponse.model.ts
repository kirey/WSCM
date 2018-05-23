import { ValidationError } from './validationError.model';

export class RestResponse<D> {
    message: string;
    statusCode: number;
    errorCode: string;
    validationObject: any;
    data?: D;

    errors: ValidationError[];

    constructor() {
        this.message = '';
        this.statusCode = null;
        this.errorCode = '';
        this.errors = [];
    }
} 