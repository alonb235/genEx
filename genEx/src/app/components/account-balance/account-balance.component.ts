import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js/auto';

@Component({
    selector: 'account-balance',
    standalone: true,
    imports: [],
    templateUrl: './account-balance.component.html',
    styleUrl: './account-balance.component.css'
})
export class AccountBalanceComponent {
    
    ngOnInit() {
        this.calculateFutureBalances();
        this.createChart();
    }
    public chart: Chart;
    
    @Input() balance: number = 100000;
    public estimatedReturn: number = 0.07;
    public futureBalances: number[] = [];
    public lineChartOptions: ChartOptions = {
        responsive: true
    };

    public lineChartType: ChartType = "line";
    public lineChartLegend = false;
    public lineChartData: ChartDataset[] = [
        { data: this.futureBalances, label: "Estimated Account Balance" }
    ]

    calculateFutureBalances() {
        let currBalance = this.balance;
        for (let i = 0; i < 10; i++) {
            currBalance *= (1+this.estimatedReturn);
            this.futureBalances.push(currBalance);
        }
        this.lineChartData[0].data = this.futureBalances;
    }

    createChart() {
        this.chart = new Chart("MyChart", {
            type: this.lineChartType,
            data: {
                labels: Array.from({length: (2050-2024)/2}, (_,i)=>2024 + i*1),
                datasets: this.lineChartData
            },
            options: { aspectRatio: 2.5 }
            }
        );
    }
}
