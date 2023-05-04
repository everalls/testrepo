import './App.css';
import { HomeViewProvider } from './contexts/homeViewContext';
import { AppRouter } from './AppRouter';
import { Expense } from './components/expense';
import { CircularIndicator } from './components/circularIndicator';

function App() {
  const value = 18000;
  return (
    
    <HomeViewProvider>
      <AppRouter />
      <Expense/>
      <CircularIndicator/>
    </HomeViewProvider>

  );
}

export default App;
