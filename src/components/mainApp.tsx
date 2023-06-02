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
  
  const { showHideExpense, setExpenseId } = useContext(HomeViewContext);

  const handleOnAddExpense = () => {
    setExpenseId(null);
    showHideExpense(true);
  }

  if (error) {
    return <div>{error || 'Error occured'}</div>
  }

  return (
    <div className="home-page-container"
         style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f9f9f9'
         }}
    >    
      <div className="available-cash-wrapper"
            style={{
              position: 'absolute',
              top: '24px',
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: 'calc(100% - 120px)',

            }}
      >
        <AvailableCashe value={avaiableCash}/>
      </div> 
      <div className="incomings-expenses-control-wrapper"
            style={{
              display: 'flex',
              width: 'calc(100% - 32px)',
              flexDirection: 'row',
              position: 'absolute',
              left: '50%',
              bottom: '64px',
              transform: 'translate(-50%, 0)',
              justifyContent: 'space-between',
            }}
      
      >
        <IncomingsExpencesControl type='incoming'value={totalIncomings} onAdd={() =>  console.log('Add incoming...')}/>
        <IncomingsExpencesControl type='expence' value={totalExpenses} onAdd={() =>  handleOnAddExpense()}/>
      </div>
    </div>
  );
}