export class JobModel{
	schedulerName: string;
	jobName: string;
	jobDescription: string;
	jobExecutionId: number;
	jobInstanceId: number;
	startTime: any;
	endTime: any;
	status: string;
	lastExecutionStatus: string;
	createTime: Date;
	stepName: string;
	exitCode: string;
	lastExecutionTime: Date;
	nextExecutionTime: Date;
    duration: string;
	errorDetails: any;
}