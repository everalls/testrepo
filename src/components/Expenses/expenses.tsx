import { useContext, useEffect, useMemo, useRef } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import '../../App.css';
import ImageGraph from '../../assets/graph.svg';
import { PeriodMenu } from '../periodMenu';
import { ExpensesList } from './expensesList';
import { log } from 'console';
import { logDOM } from '@testing-library/react';
import { Expense } from '../../types';

export const Expenses = () => {

  const {data, error, fetchData, extractExpenses } = useContext(HomeViewContext);

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


  const expenses = useMemo(() => {
    const exp = extractExpenses();
    console.log('Expenses: ', exp);
    return exp;
  }, [data]);

  
  if (error) {
    return <div>{error || 'Error occured'}</div>
  }

  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '16px',
    }}>Expenses</div>
      <ExpensesList expenses={expenses}/>
    </>
  );
}