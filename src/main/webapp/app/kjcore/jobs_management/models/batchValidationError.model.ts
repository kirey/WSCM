export class BatchValidationErrorModel{
    batchJobId: number;
    errorCode: string;
    errorMessage: string;
    taskId: string;
    tsInsert: Date;
    kjcBatchJobErrorParamses: any;
}