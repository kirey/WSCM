import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Alert, ValidationError } from '../models';

/**
 * App service with shared data on global scope of the app
 * @author Nikola Gavric
 */
@Injectable()
export class AppDataService {
    /**
     * Message in report management
     * after successful creation of
     * report
     * @author Nikola Gavric
     */
    private reportMessage: Alert = null;

    constructor() {}

    /**
     * Setter for report message
     * @author Nikola Gavric
     */
    public setReportMessage(alert: Alert): void {
        alert.show = true;
        alert.type = 'success';
        this.reportMessage = alert;
    }

    /**
     * Getter for report message
     * @author Nikola Gavric
     */
    public getReportMessage(): Alert {
        return this.reportMessage;
    }

    /**
     * Destroys all data saved in
     * this service
     * @author Nikola Gavric
     */
    public destroyData(): void {
        this.reportMessage = null;
    }
}