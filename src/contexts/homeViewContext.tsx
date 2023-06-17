import { createContext, useEffect, useState } from "react";
import { HomeView, getUrl, HOME_VIEW_API, EXPENSE_POST_API, Expense } from "../types";
import dayjs, { Dayjs } from 'dayjs';
import { homeViewMock } from "../mocks/homeViewMock";
type ExpenseOpType = 'create' | 'update';


const dateFormatToPayload = (date: string ): string => {
  return dayjs(date).isValid() ? dayjs(date).format('YYYY-MM-DD') : date;
}

//TODO:  to be taken from UI. Hardcoding to testing only!
const startDate = '2023-04-01T20:44:29.220Z';
const endDate = '2023-07-01T20:44:29.220Z';
const startDateToFetch = dateFormatToPayload(startDate);
const endDateToFetch = dateFormatToPayload(endDate);

interface HomeViewContext {
  data: HomeView;  
  loading: boolean;
  error: string|null;
  startDate: string;
  endDate: string;
  fetchData: () => void;
  postExpense: (payload: any) => void;
  putExpense: (payload: any) => void;
  deleteExpense: (id: number, date: string, isRecurrent: boolean) => void;
  extractExpenses: () => Expense[];
  expenseModalOpen: boolean;
  showHideExpense: (isOpen: boolean) => void;
  expenseId: number | null;
  setExpenseId: (id: number | null) => void;
  currentExpense: any | null; //TODO: use type;
  populateExpenseUpdateDialog: (id: number) => void;
  populateExpenseCreateDialog: () => void;
  expenseOpType: ExpenseOpType;

} 

interface HomeViewContextProviderProps {
  children: React.ReactNode;
}

export const HomeViewContext = createContext<HomeViewContext>({
  data: {},
  loading: true,
  error: null,
  startDate: startDate,
  endDate: endDate,
  fetchData: () => {},
  postExpense: (payload: any) => {},
  putExpense: (payload: any) => {},
  deleteExpense: (id: number, date: string, isRecurrent: boolean) => {},
  extractExpenses: ():Expense[]  =>  [],
  expenseModalOpen: false,
  showHideExpense: (isOpen: boolean) => {},
  expenseId: null,
  setExpenseId: (id: number | null) => {},
  currentExpense: null,
  populateExpenseUpdateDialog: (id: number) =>  {},
  populateExpenseCreateDialog: () => {},
  expenseOpType: 'create',
});
  
export const HomeViewProvider: React.FC<HomeViewContextProviderProps> = ({children}) => {
  const [data, setData] = useState<HomeView>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const showHideExpense = (isOpen: boolean): void => {
    setExpenseModalOpen(isOpen);
  }
  const [expenseId, setExpenseId] = useState<number|null>(null);
  const [currentExpense, setCurrentExpense] = useState<any|null>(null); //TODO: use type
  const [expenseOpType, setExpenseOpType] = useState<ExpenseOpType>('create');
  

  const fetchData_ = () => {
    console.log('mockdata:::', homeViewMock)
    setLoading(true);
    setData(homeViewMock);
    console.log('set mockdata:::', data)
    setTimeout(() => {
      console.log('Setting loading to false')
      setLoading(false);
    }, 300);
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      //TDDO: add date range. Hardcoding to testing only!
      const response = await fetch(('/' + HOME_VIEW_API + '?from=2023-04-01&to=2023-07-01'), {
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });      
      const data = await response.json();
      if (response.ok) {
        setData(data);
      } else {
        throw new Error('Error occurred');
      }
    } catch (error: any) {
      setError(error?.message || 'Error occured');
    } finally {
      setLoading(false);
    }
  }

  const postExpense = async (payload: any) => { //TODO add type
    try {
      setLoading(true);
      const response = await fetch(('/' + EXPENSE_POST_API), {
        method: "POST",
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            accept: 'text/plain',
            'accept-encoding': 'gzip, deflate, br', 
        },
        body: JSON.stringify(payload, null, 2)
      });      
      await fetchData();
      
    } catch (error: any) {
      setError(error?.message || 'Error occured during post expense');
    } finally {
      setLoading(false);
    }
  }

  const putExpense = async (payload: any) => { //TODO add type
    try {
      setLoading(true);
      const response = await fetch(('/' + EXPENSE_POST_API), {
        method: "PUT",
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            accept: 'text/plain',
            'accept-encoding': 'gzip, deflate, br', 
        },
        body: JSON.stringify(payload, null, 2)
      });      
      await fetchData();
      
    } catch (error: any) {
      setError(error?.message || 'Error occured during put expense');
    } finally {
      setLoading(false);
    }
  }


  const deleteExpense = async (id: number, date: string, isRecurrent: boolean ) => { //TODO add type 
    try {
      setLoading(true);
      const baseDeleteUrl = '/' + EXPENSE_POST_API + '/' + id;
      const url = isRecurrent ? baseDeleteUrl + '/0': baseDeleteUrl + '/' + date;
      const response = await fetch((url), {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
              accept: 'text/plain',
              'accept-encoding': 'gzip, deflate, br', 
          },
      });
      console.log('DElete in contxt done:::')
      await fetchData();
    } catch (error: any) {
      setError(error?.message || 'Error occured during delete expense');
    } finally {
      setLoading(false);
    }
  }

  const populateExpenseCreateDialog = () => {
    setCurrentExpense(null);
    setExpenseOpType('create');
    setExpenseModalOpen(true);
  }

  const populateExpenseUpdateDialog = async (id: number) => {
    console.log('populateExpenseUpdateDialog id:::', id);
    try {
      setLoading(true);
      console.log('populateExpenseUpdateDialog setloADING:::');
      const response = await fetch(('/' + EXPENSE_POST_API + '/' + id + '/view'), {
        headers: {  
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
      });
      console.log('populateExpenseUpdateDialog response:::', response);
      const data = await response.json();
      console.log('populateExpenseUpdateDialog data before ok:::', data);
      if (response.ok) {
        console.log('populateExpenseUpdateDialog data after ok:::', data);
        setCurrentExpense(data);
        setExpenseOpType('update');
        setExpenseModalOpen(true);
      } else {
        throw new Error('Error occurred while fetching expense details');
      }
    } catch (error: any) {
      setError(error?.message || 'Error occured while fetching expense details');
    } finally {
      setLoading(false);
    }
  }


  const extractExpenses = (): Expense[] => {
    const temp1: Record<string, any>  = data?.MoneyMovements?.Expenses?.List;
    return Object.keys(temp1).reduce((result: Expense[], key: string) =>  [...result, ...temp1[key].Data.map((item: any) => {item['Date'] = key; return item})], []);
  }


  const contextvalue: HomeViewContext = {
    data,
    loading,
    error,
    startDate,
    endDate,
    fetchData,
    postExpense,
    putExpense,
    deleteExpense,
    extractExpenses,
    expenseModalOpen,
    showHideExpense,
    expenseId,
    setExpenseId,
    currentExpense,
    populateExpenseUpdateDialog,
    populateExpenseCreateDialog,
    expenseOpType,
  };

  return (
    <HomeViewContext.Provider value={contextvalue}>
      {children}
    </HomeViewContext.Provider>
  );
}



