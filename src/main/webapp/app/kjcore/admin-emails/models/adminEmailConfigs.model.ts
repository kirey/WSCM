export class AdminEmailConfigs {
	public id: number;
	public name: string;
	public username: string;
	public password: string;
	public host: string;
	public port: number;
	public emailAddress: string;
	public messageFrom: string;
	public description: string;

	constructor() {
		this.name = '';
		this.username = '';
		this.password = '';
		this.host = '';
		this.port = null;
		this.emailAddress = '';
		this.messageFrom = '';
		this.description = '';
	}
}