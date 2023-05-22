import { useContext, useEffect, useMemo, useRef } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import '../../App.css';
import ImageGraph from '../../assets/graph.svg';
import { PeriodMenu } from '../periodMenu';
import { ExpensesList } from './expensesList';
import { log } from 'console';
import { logDOM } from '@testing-library/react';

export const Expenses = () => {

  const {data, loading, error, fetchData } = useContext(HomeViewContext);

  //Work-around to avoid calling the callback in useEffect twise.
  //It happens because of the way React 18 renders components in development mode, in strict mode.
  //Solution from here: https://stackoverflow.com/questions/72406486/react-fetch-api-being-called-2-times-on-page-load
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      fetchData();
    }
    renderAfterCalled.current = true;
  }, []);

  

  //TODO: typing
  const getExpenses: any = () => {
    console.log('data:::', data);
    const temp1: Record<string, any>  = data?.MoneyMovements?.Expenses?.List;
    return Object.keys(temp1).reduce((result: any[], key: string) =>  [...result, ...temp1[key].Data.map((item: any) => {item['Date'] = key; return item})], []);
  }

  const expenses = useMemo(() => getExpenses(), [data]);

  const { showHideExpense } = useContext(HomeViewContext);

  if (error) {
    return <div>{error || 'Error occured'}</div>
  }

  return (
      <ExpensesList expenses={expenses} onExpenceClick={() => showHideExpense(true)}/>
  );
}