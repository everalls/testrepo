import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PeriodData, Transaction } from '../types/Period';
import { periodMock } from '../mocks/period.mock';
import { cloneObject} from '../utils/utils';





@Injectable({
  providedIn: 'root'
})
export class PeriodDataService {

  periodData: PeriodData;
  totalExpensesDetails: Transaction[];


  constructor() { }

  getPeriod$(): Observable<PeriodData> {
    this.periodData = cloneObject(periodMock);
    return of(periodMock)
  }
}
