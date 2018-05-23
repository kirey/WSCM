export class SchedulerModel {
    name: string;
    jobName: string;
    numberOfParameters: number;
    triggerName: string;
    kjcTaskParameterses: any[];
    lastExecutionTime: Date;
    nextExecutionTime: Date;
    jobDescription: String;
    lastExecutionStatus: String;
    cronExpression: String;
    cronModified: boolean = false;
    id: number;
}