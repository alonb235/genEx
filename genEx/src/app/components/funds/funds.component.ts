import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})
export class FundsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Balance Funds','Quantity', 'Price','Current Balance']
  @Input()
  fundData;

  ngOnInit() {
    this.dataSource.data = this.fundData
  }
}
