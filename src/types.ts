export type HomeView = any; //TODO: add type
export const BASE_URL = 'http://bcontrol-web-api.azurewebsites.net/api';
export const HOME_VIEW_API = 'HomeView/user';
export const EXPENSE_POST_API = 'Expenses/user';
export const EXPENSE_DELETE_API = 'Expenses/user';

export const getUrl = (url: string) => `${BASE_URL}/${url}`;

export type Expense = {   
  Id: number,
  Name: string,
  Amount: number,
  MovementDescription: string,
  MovementDate: string,
  ThisPaymentNumber: number,
  TotalOccurrenses: number,
  DetailsEndpoint: string,
  Date: string
};