import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Period } from '../types/Period';
import { periodMock } from '../mocks/period.mock';
import { cloneObject} from '../utils/utils';





@Injectable({
  providedIn: 'root'
})
export class PeriodDataService {

  period: Period;

  constructor() { }

  getPeriod$(): Observable<Period> {
    this.period = cloneObject(periodMock);
    return of(periodMock)
  }
}
