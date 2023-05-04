import { createContext, useEffect, useState } from "react";
import { HomeView, getUrl, HOME_VIEW_API, EXPENSE_POST_API } from "../types";
import { log } from "console";

interface HomeViewContext {
  data: HomeView;  
  loading: boolean;
  error: string|null;
  fetchData: () => void;
  postExpense: (payload: any) => void;
  expenseModalOpen: boolean;
  showHideExpense: (isOpen: boolean) => void;

} 

interface HomeViewContextProviderProps {
  children: React.ReactNode;
}

export const HomeViewContext = createContext<HomeViewContext>({
  data: {},
  loading: true,
  error: null,
  fetchData: () => {},
  postExpense: (payload: any) => {},
  expenseModalOpen: false,
  showHideExpense: (isOpen: boolean) => {}
    
});
  
export const HomeViewProvider: React.FC<HomeViewContextProviderProps> = ({children}) => {
  const [data, setData] = useState<HomeView>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const showHideExpense = (isOpen: boolean): void => {
    setExpenseModalOpen(isOpen);
  }
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch((HOME_VIEW_API), {
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
      //const postExpenseResponse = await response.json();
      await fetchData();

      
    } catch (error: any) {
      setError(error?.message || 'Error occured during post expense');
    } finally {
      console.log('Payload:::', payload);
      setLoading(false);
    }
  }

  const contextvalue: HomeViewContext = {
    data,
    loading,
    error,
    fetchData,
    postExpense,
    expenseModalOpen,
    showHideExpense
  };

return (
  <HomeViewContext.Provider value={contextvalue}>
    {children}
  </HomeViewContext.Provider>
);
}



