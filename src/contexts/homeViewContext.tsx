import { createContext, useEffect, useState } from "react";
import { HomeView, getUrl, HOME_VIEW_API, EXPENSE_POST_API, Expense } from "../types";
import dayjs, { Dayjs } from 'dayjs';


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
  deleteExpense: (id: number, date: string, isRecurrent: boolean) => void;
  extractExpenses: () => Expense[];
  expenseModalOpen: boolean;
  showHideExpense: (isOpen: boolean) => void;
  expenseId: number | null;
  setExpenseId: (id: number | null) => void;

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
  deleteExpense: (id: number, date: string, isRecurrent: boolean) => {},
  extractExpenses: ():Expense[]  =>  [],
  expenseModalOpen: false,
  showHideExpense: (isOpen: boolean) => {},
  expenseId: null,
  setExpenseId: (id: number | null) => {},
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
  
  const fetchData = async () => {
    try {
      setLoading(true);
      //TDOD: add date range. Hardcoding to testing only!
      const response = await fetch((HOME_VIEW_API + '?from=2023-04-01&to=2023-07-01'), {
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
      const response = await fetch((EXPENSE_POST_API), {
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

  const deleteExpense = async (id: number, date: string, isRecurrent: boolean ) => { //TODO add type 
    try {
      setLoading(true);
      const baseDeleteUrl = EXPENSE_POST_API + '/' + id + '/' + 0;
      const url = isRecurrent ? baseDeleteUrl : baseDeleteUrl + '/' + date;
      const response = await fetch((url), {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
              accept: 'text/plain',
              'accept-encoding': 'gzip, deflate, br', 
          },
      });
      await fetchData();
    } catch (error: any) {
      setError(error?.message || 'Error occured during delete expense');
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
    deleteExpense,
    extractExpenses,
    expenseModalOpen,
    showHideExpense,
    expenseId,
    setExpenseId,
  };

  return (
    <HomeViewContext.Provider value={contextvalue}>
      {children}
    </HomeViewContext.Provider>
  );
}



