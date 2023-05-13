import { useContext, useEffect, useRef } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import '../../App.css';
import ImageGraph from '../../assets/graph.svg';
import { PeriodMenu } from '../periodMenu';
import { ExpensesList } from './expensesList';

export const Expenses = () => {

  const {data, loading, error, fetchData } = useContext(HomeViewContext);

  const avaiableCash = data?.AvailableFunds?.AvailableWithRegisteredMovements || 0; 
  const totalExpenses = data?.MoneyMovements?.ExpensesTotalForPeriod || 0;
  const totalIncomings = data?.MoneyMovements?.IncomingsTotalForPeriod || 0;

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

  if (error) {
    return <div>{error || 'Error occured'}</div>
  }

  return (
    <div className="container"> 
      <PeriodMenu/>
      <img  src={ImageGraph} 
            alt="no graph image" 
            style={{
              position: 'absolute',
              top: '100px',
              width: '100%',
            }}
      />
      <ExpensesList/>
    </div>
  );
}