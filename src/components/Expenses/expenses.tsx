import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HomeViewContext } from '../../contexts/homeViewContext';
import '../../App.css';
import ImageGraph from '../../assets/graph.svg';
import { PeriodMenu } from '../periodMenu';
import { ExpensesList } from './expensesList';
import { log } from 'console';
import { logDOM } from '@testing-library/react';
import { Expense } from '../../types';
import { IconButton, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);



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
  const [sortOption, setSortOption] = useState('date'); // Initial sort option
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null); // Anchor element for the sort menu


  const filterExpenses = (expenses: Expense[]) => { //TODO use type
    return expenses.filter((expense) =>
      expense.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSortMenuOpen = (event: any) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleSortOptionSelect = (option: any) => {
    setSortOption(option);
    setSortMenuAnchor(null); // Close the sort menu
  };

  const filteredExpenses = useMemo(() => filterExpenses(extractExpenses()), [
    data,
    searchQuery,
  ]);

  const sortedExpenses = useMemo(() => {
    // Apply sorting logic based on the selected sort option
    let sorted = [...filteredExpenses]; // Make a copy of the filtered expenses

    if (sortOption === 'date') {
      sorted.sort((a, b) =>
        dayjs(a.Date).isBefore(dayjs(b.Date)) ? -1 : 1
      );
    } else if (sortOption === 'name') {
      console.log('sorted by name:::');
      console.log('Sorted before:::', sorted);
      sorted.sort((a, b) => a.Name.localeCompare(b.Name)); // Sort by name
    }

    return sorted;
  }, [filteredExpenses, sortOption]);
  
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

      <IconButton onClick={handleSortMenuOpen}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={sortMenuAnchor}
          open={Boolean(sortMenuAnchor)}
          onClose={() => setSortMenuAnchor(null)}
        >
          <MenuItem
            onClick={() => handleSortOptionSelect('date')}
            selected={sortOption === 'date'}
          >
            Sort by Date
          </MenuItem>
          <MenuItem
            onClick={() => handleSortOptionSelect('name')}
            selected={sortOption === 'name'}
          >
            Sort by Name
          </MenuItem>
        </Menu>
      </div>
      <ExpensesList expenses={sortedExpenses}/>
    </>
  );
}