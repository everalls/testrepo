import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Expense } from './components/expense';
import { MainApp } from './components/mainApp';
import { Expenses } from "./components/Expenses/expenses";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/expenses" element={<Expenses />} />

        {/* <Route path="/expense/:id" element={<Expense/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}