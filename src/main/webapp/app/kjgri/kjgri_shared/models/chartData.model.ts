import { ChartDataSet } from './chartDataSet.model';

export class ChartData {
    labels: string[];
    datasets: ChartDataSet[];

    constructor() {
        this.labels = [];
        this.datasets = [];
    }
}