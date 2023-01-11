import { Component, OnInit } from '@angular/core';
import { PeriodDataService } from 'src/app/services/period-data.service';
import { Period } from 'src/app/types/Period';

@Component({
  selector: 'app-main-overview',
  templateUrl: './main-overview.component.html',
  styleUrls: ['./main-overview.component.scss']
})
export class MainOverviewComponent implements OnInit {

  periodData: Period;

  constructor(private _periodDataService: PeriodDataService) {}

  ngOnInit(): void {
    this._periodDataService.getPeriod$().subscribe(data => {
      this.periodData = data;
      console.log('Data:::', this.periodData);
      
    });
  }

  

}
