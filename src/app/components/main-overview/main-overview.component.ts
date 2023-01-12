import { Component, OnInit } from '@angular/core';
import { PeriodDataService } from 'src/app/services/period-data.service';
import { PeriodData, Transaction } from 'src/app/types/Period';

@Component({
  selector: 'app-main-overview',
  templateUrl: './main-overview.component.html',
  styleUrls: ['./main-overview.component.scss']
})
export class MainOverviewComponent implements OnInit {

  periodData: PeriodData;
  totalIncomes: number = 0;
  totalIncomesDetails: Transaction[];

  constructor(private _periodDataService: PeriodDataService) {}

  ngOnInit(): void {
    this._periodDataService.getPeriod$().subscribe(data => {
      this.periodData = data;
      this.parseData();
    });
  }

  parseData(): void {
    // Get total incomes
    this.totalIncomes = 0;
    this.totalIncomesDetails = [];
    let incomesObject = this.periodData?.MoneyMovements?.Incomes; 

    Object.keys(incomesObject || {}).forEach(key => {
      this.totalIncomes = this.totalIncomes + (incomesObject?.[key]?.Totals || 0);
      this.totalIncomesDetails.push({
        name: incomesObject?.[key]?.Names as string,
        value: incomesObject?.[key]?.Totals as number,
        date: key as string
      });
    });

    console.log("totalIncomesDetails:::", this.totalIncomesDetails);
    
  }

  

}
