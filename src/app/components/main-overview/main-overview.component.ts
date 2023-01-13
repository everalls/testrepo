import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodDataService } from 'src/app/services/period-data.service';
import { PeriodData, Transaction } from 'src/app/types/Period';
import { cloneObject } from 'src/app/utils/utils';

@Component({
  selector: 'app-main-overview',
  templateUrl: './main-overview.component.html',
  styleUrls: ['./main-overview.component.scss']
})
export class MainOverviewComponent implements OnInit {

  periodData: PeriodData;
  totalIncomes: number = 0;
  totalIncomesDetails: Transaction[];
  totalExpenses: number = 0;
  totalExpensesDetails: Transaction[];
  startingBudget: number = 0;

  constructor(private _periodDataService: PeriodDataService,
              private _router: Router) {}

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
    this.totalExpenses = 0;
    this.totalExpensesDetails = [];
    let incomesObject = this.periodData?.MoneyMovements?.Incomes; 
    let expensesObject = this.periodData?.MoneyMovements?.Expenses; 

    Object.keys(incomesObject || {}).forEach(key => {
      this.totalIncomes = this.totalIncomes + (incomesObject?.[key]?.Totals || 0);
      this.totalIncomesDetails.push({
        name: incomesObject?.[key]?.Names as string,
        value: incomesObject?.[key]?.Totals as number,
        date: key as string
      });
    });

    Object.keys(expensesObject || {}).forEach(key => {
      this.totalExpenses = this.totalExpenses + (expensesObject?.[key]?.Totals || 0);
      this.totalExpensesDetails.push({
        name: expensesObject?.[key]?.Names as string,
        value: expensesObject?.[key]?.Totals as number,
        date: key as string
      });
    });
    this._periodDataService.totalExpensesDetails = cloneObject(this.totalExpensesDetails);
    console.log('totalExpensesDetails from parent:::',this._periodDataService.totalExpensesDetails);

    this.startingBudget = this.periodData.StartingBudget;

  }

  onAddExpense(event): void {
    event.stopPropagation();

    alert('New expense to be added')
 }

 onNavigateToExpensesTable(event) {
  this._router.navigate(['/expenses']);
 }
  
}
