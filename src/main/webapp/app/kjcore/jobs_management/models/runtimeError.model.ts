export class RuntimeErrorModel{
    id: number;
    kjcUserAccount: string;
    taskId: string;
    batchJobInstanceId: number;
    thrownDate: Date;
    message: string;
    errorName: string;
    processType: string;
    processCategory: string;
}