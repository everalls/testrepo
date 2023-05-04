import ImagePlus from '../assets/plus.svg';
import ImageList from '../assets/list.svg'
import { useContext } from 'react';
import { HomeViewContext } from '../contexts/homeViewContext';

export type IncomingsExpencesControlProps = {
  type: 'incoming'|'expence';
  value: number;
  onAdd: () => void;
}

export const IncomingsExpencesControl = (props: IncomingsExpencesControlProps) => {


  const { showHideExpense } = useContext(HomeViewContext);

  return (
    <div  className='incomings-expences-control'
          style={{
            position: 'relative'
          }}
    >
      <div className="incomings-expences-icons" style={{padding: '8px'}}>
        <img src={ImagePlus} alt="Image Plus not found" onClick={() => showHideExpense(true)}/>
        <img src={ImageList} alt="Image List not found" style = {{marginLeft: '8px'}}/>
      </div>
      <div className="incomings-expences-value-label"
        style={{
          position: 'absolute',
          left: '12px',
          top: '54px',
          fontFamily: 'Arial',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000'
        }} 
      >
        {props.type === 'expence' ? 'Expenses' : 'Incomings'}
      </div>

      <div className="incomings-expences-value"
           style={{
            position: 'absolute',
            left: '12px',
            top: '72px',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '24px',
            color: '#999999'
           }}  
      >
        {props.value}
        <span className="currence"
              style={{
                fontSize: '24px',
              }}  
        >
        </span>
        <span style={{
                fontSize: '18px',
                fontWeight: 'normal'
              }}  
        >
          $
        </span>
      </div>
    </div>  
  )
}