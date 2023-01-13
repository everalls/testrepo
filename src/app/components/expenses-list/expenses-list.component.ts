import { Component, OnInit } from '@angular/core';
import { PeriodDataService } from 'src/app/services/period-data.service';
import { Transaction } from 'src/app/types/Period';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit{

  totalExpensesDetails: Transaction[];

  constructor(private _periodDataService: PeriodDataService) {}

  ngOnInit(): void {
    this.totalExpensesDetails = this._periodDataService.totalExpensesDetails || [];
    console.log('totalExpensesDetails from child:::', this.totalExpensesDetails);
    
  }
}
