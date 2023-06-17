import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Expense } from './components/expense';
import { MainApp } from './components/mainApp';
import { Expenses } from "./components/Expenses/expenses";
import { RecurrentExpenses } from "./components/RecurrentExpenseInstances/recurrentExpenses";

export const AppRouter = () => {
  //const basename = '/bcontrol-backup';
  const basename = '/';
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/recurrent-expenses/:id" element={<RecurrentExpenses/>} />

        {/* <Route path="/expense/:id" element={<Expense/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}