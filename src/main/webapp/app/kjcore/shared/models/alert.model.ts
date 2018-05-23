export class Alert {
    message: string;
    type: string;
    timeout: number;
    dismissible: boolean;
    show: boolean;

    constructor(timeout: number, dismissible: boolean) {
        this.timeout = timeout;
        this.dismissible = dismissible;
        this.message = '';
        this.type = null;
        this.show = false;
    }
}