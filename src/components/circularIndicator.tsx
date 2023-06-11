import CircularProgress from '@mui/joy/CircularProgress';
import { useContext } from "react";
import { HomeViewContext } from "../contexts/homeViewContext";

export const CircularIndicator = () =>  {

  const {loading } = useContext(HomeViewContext);
  
  if (loading) {
    return (     
      <div style={{
        position: 'fixed',
        top: '200px',
        left: '50%',
        transform: 'translate(-50%)',
      }}      
      >
        <CircularProgress thickness={2}/>
      </div>
    )
  }
  return null;
}