
import { useParams } from 'react-router-dom';
import { Expense } from '../../types';
import { useContext, useMemo, useState } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import { ExpensesList } from '../Expenses/expensesList';
import { IconButton, Stack } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ConfirmationDialog } from '../common/confirmationDialog';

export type RecurrentExpensesProps = {
}

export  const RecurrentExpenses = (props: RecurrentExpensesProps) => {

  const {data, extractExpenses, deleteExpense, populateExpenseUpdateDialog } = useContext(HomeViewContext);

  const { id } = useParams();

  const recurrentExpenses = useMemo(() => {
    const filteredExpenses = id ? extractExpenses().filter((expense: Expense) => expense.Id === Number(id)) : [];
    console.log('filteredExpenses', filteredExpenses);
    return filteredExpenses;
  }, [data]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = ()=>  {  
    setOpenDeleteDialog(true);
  }
  const proceedDelete = (confirmed: boolean) => {
    setOpenDeleteDialog(false);
    if (confirmed) {
      deleteExpense(Number(id), '0', true);
    }
  }

  return (
    <>
    <ConfirmationDialog
                title="Delete expense"
                message="Are you sure you want to delete this expense?"
                open={openDeleteDialog}
                onClose={proceedDelete}
      />
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '16px',
    }}>Recurrent Expense Details
    </div>
    <Stack direction="row" spacing={2} sx={{marginTop: '16px', paddingLeft: '16px'}}>          
      <IconButton aria-label="delete" size="medium" onClick={() => populateExpenseUpdateDialog(Number(id))}>
        <EditOutlinedIcon fontSize="medium" fontWeight="100" color="primary"/>
      </IconButton>
      <IconButton aria-label="delete" size="medium" onClick={() => handleDelete()}>
        <DeleteOutlinedIcon fontSize="medium" fontWeight="100" color="primary" />
      </IconButton>
    </Stack>
    <ExpensesList expenses={recurrentExpenses} isRecurrent={true}/>
    </>
  )
}