import { useEffect } from 'react';

export type ExpensesProps = {
  expenses: any; //TODO: typing
}

export  const ExpensesList = (props: ExpensesProps) => {

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="available-cash-circle"
         style={{
          position: 'absolute',
          top: '232px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: 'calc(100% - 120px)',
         }}
        
    >
     {
      props.expenses.map((expense: any) => {
        return (
          <div className="expense-item" key={'' + expense.Id + expense.Date }>
            <div className="expense-item-date" style={{fontSize: '14px', color: '#999999'}}>
              {expense.Date}
            </div>
            <div className="expense-item-description" style={{fontSize: '16px', color: '#000000'}}>
              {expense.Name}
            </div>
            <div className="expense-item-value" style={{fontSize: '16px', color: '#000000'}}>
              {expense.Amount}
            </div>
          </div>
        )
      })
     }
    </div>
  )
}