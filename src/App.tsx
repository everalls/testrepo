import './App.css';
import { AppRouter } from './AppRouter';
import { TopBar } from './components/TopBar/topBar';
import { CircularIndicator } from './components/circularIndicator';
import { Expense } from './components/expense';
import { HomeViewProvider } from './contexts/homeViewContext';


function App() {

  //const {data, loading, error, fetchData } = useContext(HomeViewContext);
  
  
  return (
    <>
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
    </>
  );
}

export default App;
