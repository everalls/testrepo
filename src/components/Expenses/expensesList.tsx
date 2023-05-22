import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export type ExpensesProps = {
  expenses: any; //TODO: typing
  onExpenceClick?: () => void;
}

export  const ExpensesList = (props: ExpensesProps) => {

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="expenses-container"
         style={{
          width: '100%',
          padding: '16px',
          boxSizing: 'border-box',
         }}
        
    >
     {
      props.expenses.map((expense: any) => { //TODO: make component
        return (
          <div className="expense-item hoverable-box" key={'' + expense.Id + expense.Date }
                style={{
                    marginBottom: '8px',
                    border: '2px solid rgb(238, 238, 238)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onClick={props.onExpenceClick}
          >
            <div className="left-side-details"
                  style={{
                    width: '75%'
                  }}

            >
              <div className="expense-item-date" style={{fontSize: '12px', color: '#999999', marginBottom: '4px'}}>
                { dayjs(expense.Date).format('ddd, MMM-DD, YYYY')}
              </div>
              <div className="expense-item-description" style={{fontSize: '16px', color: '#000000'}}>
                {expense.Name}
              </div>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            
            </div>
              <div className="right-side-details"
               
                     style={{
                      fontSize: '18px',
                      fontWeight: 'bold', 
                      color: 'rgb(120, 120, 120)',
                      }}>
                  {expense.Amount}
               
              </div>
          </div>
          
        )
      })
     }
     </div>
  )
}