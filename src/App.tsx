import './App.css';
import { HomeViewProvider } from './contexts/homeViewContext';
import { AppRouter } from './AppRouter';
import { Expense } from './components/expense';
import { CircularIndicator } from './components/circularIndicator';
import { TopBar } from './components/TopBar/topBar';


function App() {
  return (
    
    <HomeViewProvider>
      <div className="app-container">
        <div className="top-bar-container">
          <TopBar />
        </div>  

        {/* outlet, main cotent */}
        <div className="outlet">
          <AppRouter />
        </div>

      </div>

      {/* modal dialogs */}
      <Expense/>
      <CircularIndicator/>
    </HomeViewProvider>

  );
}

export default App;
