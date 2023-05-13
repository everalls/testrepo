import CheckBoxOff from '../assets/checkbox-off.svg';
import Info from '../assets/info.svg';


// export type AvailableCasheProps = {
//   value: number;
//   considerPrevious?: boolean;
//   previousValue?: number;
// }

export  const ExpensesList = () => {
  return (
    <div className="available-cash-circle"
         style={{
          position: 'absolute',
          top: '232px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: 'calc(100% - 120px)',
         }}
        
    >
      Expenses will be here...
    </div>
  )
}