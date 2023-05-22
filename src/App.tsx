import './App.css';
import { HomeViewProvider } from './contexts/homeViewContext';
import { AppRouter } from './AppRouter';
import { Expense } from './components/expense';
import { CircularIndicator } from './components/circularIndicator';
import { TopBar } from './components/TopBar/topBar';


function App() {
  const value = 18000;
  return (
    
    <HomeViewProvider>
      <div className="app-container">
        <TopBar />
        <div className="outlet">
          <AppRouter />
        </div>
        <Expense/>
        <CircularIndicator/>
      </div>
    </HomeViewProvider>

  );
}

export default App;
