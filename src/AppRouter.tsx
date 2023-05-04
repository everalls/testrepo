import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Expense } from './components/expense';
import { MainApp } from './components/mainApp';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        {/* <Route path="/expense/:id" element={<Expense/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}