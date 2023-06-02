
import { useParams } from 'react-router-dom';
import { Expense } from '../../types';
import { useContext, useMemo } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import { ExpensesList } from '../Expenses/expensesList';

export type RecurrentExpensesProps = {
}

export  const RecurrentExpenses = (props: RecurrentExpensesProps) => {

  const {data, extractExpenses } = useContext(HomeViewContext);

  const { id } = useParams();

  const recurrentExpenses = useMemo(() => {
    const exp = id ? extractExpenses().filter((expense: Expense) => expense.Id === Number(id)) : [];
    console.log('Recurrent Expenses: ', exp);
    return exp;
  }, [data]);


  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '16px',
    }}>Recurrent Expense Details</div>
    <ExpensesList expenses={recurrentExpenses}/>
    </>
  )
}