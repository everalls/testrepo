import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { IconButton, Stack } from '@mui/material';

import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Expense } from '../../types';
import { useNavigate } from 'react-router';
import { HomeViewContext } from '../../contexts/homeViewContext';
import { ConfirmationDialog } from '../common/confirmationDialog';
import { dateToParams } from '../../commonCode/utils';



export type ExpensesListProps = {
  expenses: Expense[];
  onExpenceClick?: () => void;
}

export  const ExpensesList = (props: ExpensesListProps) => {

  const navigate = useNavigate();

  const { deleteExpense } = useContext(HomeViewContext);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<{id: number, date: string, isRecurrent: boolean}>({id: 0, date: '', isRecurrent: false});


  const handleDelete = (expense: any)=>  { //TODO: use type
    setExpenseToDelete({id: expense.Id, date: dateToParams(expense.Date), isRecurrent: expense.TotalOccurrenses > 1});  
    setOpenDeleteDialog(true);
  }
  const proceedDelete = (confirmed: boolean) => {
    setOpenDeleteDialog(false);
    if (confirmed) {
      console.log('Delete expense with id and date: ',expenseToDelete);
      deleteExpense(expenseToDelete.id, expenseToDelete.date, expenseToDelete.isRecurrent);
    }
  }
  
  return (
    <div className="expenses-container"
         style={{
          width: '100%',
          padding: '16px',
          boxSizing: 'border-box',
         }}
        
    >
      <ConfirmationDialog
                title="Delete expense"
                message="Are you sure you want to delete this expense?"
                open={openDeleteDialog}
                onClose={proceedDelete}
            />
     {
      props.expenses.map((expense: Expense) => { //TODO: make component(?)
        return (
          <div className="expense-item hoverable-box" key={'' + expense.Id + expense.Date }
                style={{
                    marginBottom: '8px',
                    border: '2px solid rgb(238, 238, 238)',
                    borderRadius: '8px',
                    padding: '16px',
                    paddingBottom: '0px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
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
              <Stack direction="row" spacing={2} sx={{marginTop: '16px'}}>
               {expense.TotalOccurrenses > 1 && 
                <IconButton aria-label="delete" size="small"  onClick={() => navigate(`/recurrent-expenses/${expense.Id}`)}>
                    <DynamicFeedOutlinedIcon fontSize="small" fontWeight="100" color="primary"/>
                  </IconButton>
               }
                
                <IconButton aria-label="delete" size="small">
                  <EditOutlinedIcon fontSize="small" fontWeight="100" color="primary" />
                </IconButton>
  
                <IconButton aria-label="delete" size="small" onClick={() => handleDelete(expense)}>
                  <DeleteOutlinedIcon fontSize="small" fontWeight="100" color="primary" />
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