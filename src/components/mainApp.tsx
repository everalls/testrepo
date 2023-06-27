import '../App.css';
import { AvailableCashe } from './availableCash';
import { IncomingsExpencesControl } from './incomingsExpensesControl';
import { HomeViewContext } from '../contexts/homeViewContext';
import { useContext, useMemo } from 'react';

export const MainApp = () => {

  const {data, error } = useContext(HomeViewContext);

  const avaiableCash = data?.AvailableFunds?.AvailableWithRegisteredMovements || 0; 
  const totalExpenses = data?.MoneyMovements?.ExpensesTotalForPeriod || 0;
  const totalIncomings = data?.MoneyMovements?.IncomingsTotalForPeriod || 0;
  
  const { populateExpenseCreateDialog } = useContext(HomeViewContext);

  const handleOnAddExpense = () => {
    populateExpenseCreateDialog();
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