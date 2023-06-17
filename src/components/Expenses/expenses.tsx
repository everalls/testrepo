import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import '../../App.css';
import ImageGraph from '../../assets/graph.svg';
import { PeriodMenu } from '../periodMenu';
import { ExpensesList } from './expensesList';
import { log } from 'console';
import { logDOM } from '@testing-library/react';
import { Expense } from '../../types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export const Expenses = () => {

  const {data, error, fetchData, extractExpenses } = useContext(HomeViewContext);

  //Work-around to avoid calling the callback in useEffect twise.
  //It happens because of the way React 18 renders components in development mode, in strict mode.
  //Solution from here: https://stackoverflow.com/questions/72406486/react-fetch-api-being-called-2-times-on-page-load
  // const renderAfterCalled = useRef(false);

  // useEffect(() => {
  //   if (!renderAfterCalled.current) {
  //     fetchData();
  //   }
  //   renderAfterCalled.current = true;
  // }, []);


  // const expenses = useMemo(() => {
  //   const exp = extractExpenses();
  //   console.log('Expenses: ', exp);
  //   return exp;
  // }, [data]);

  const [searchQuery, setSearchQuery] = useState('');

  const filterExpenses = (expenses: Expense[]) => { //TODO use type
    return expenses.filter((expense) =>
      expense.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredExpenses = useMemo(() => filterExpenses(extractExpenses()), [
    data,
    searchQuery,
  ]);
  
  if (error) {
    return <div>{error || 'Error occured'}</div>
  }

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '16px',
        justifyContent: 'flex-start',
        paddingLeft: '16px'
      }}>
        <TextField
        label="Search"
        value={searchQuery}
        size="small"
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      </div>
      <ExpensesList expenses={filteredExpenses}/>
    </>
  );
}