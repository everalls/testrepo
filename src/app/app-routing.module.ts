import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { MainOverviewComponent } from './components/main-overview/main-overview.component';

const routes: Routes = [
  { path: 'overview', component: MainOverviewComponent },
  { path: 'expenses', component: ExpensesListComponent },
  { path: '**', component: MainOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
