import '../App.css';
import { AvailableCashe } from './availableCash';
import ImageGraph from '../assets/graph.svg'
import { PeriodMenu } from './periodMenu';
import { IncomingsExpencesControl } from './incomingsExpensesControl';
import { HomeViewContext } from '../contexts/homeViewContext';
import { useContext, useEffect, useRef } from 'react';

export const MainApp = () => {

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
      <AvailableCashe value={avaiableCash}/>
      <div className="incomings-expenses-control-wrapper">
        <IncomingsExpencesControl type='incoming'value={totalIncomings} onAdd={() => console.log('Add incomng')}/>
        <IncomingsExpencesControl type='expence' value={totalExpenses} onAdd={() => console.log('Add expense')}/>
      </div>
    </div>
  );
}