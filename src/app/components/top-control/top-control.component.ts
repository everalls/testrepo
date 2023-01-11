import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-top-control',
  templateUrl: './top-control.component.html',
  styleUrls: ['./top-control.component.scss']
})
export class TopControlComponent {

  links = ['Overview', 'Expenses'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  navigateTo(link: string) {
    console.log('Will navigat eto:::', link);
    // https://stackoverflow.com/questions/45940965/angular-material-customize-tab
    // https://stackoverflow.com/questions/45295122/angular-2-material-tab-active-color-customize
  }

}
