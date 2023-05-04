import CheckBoxOff from '../assets/checkbox-off.svg';
import Info from '../assets/info.svg';


export type AvailableCasheProps = {
  value: number;
  considerPrevious?: boolean;
  previousValue?: number;
}

export  const AvailableCashe = (props: AvailableCasheProps) => {
  return (
    <div className="available-cash-circle"
         style={{
          position: 'absolute',
          top: '232px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: 'calc(100% - 120px)',
          border: '#16BFFA solid 8px',
          aspectRatio: '1/1',
          borderRadius: '50%',
         }}
        
    >
      <div style={{
        position: 'absolute',
        top: '72px',
        textAlign: 'center',
        fontSize: '60px',
        fontFamily: 'Arial',
        color: 'black',
        width: '100%'
      }}
      >
        <div style={{
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: '24px',
          color: 'rgb(153, 153, 153)',
        }}
        >
          Available cash:
        </div>
        {props.value}
        <span className="currence"
              style={{
                fontSize: '24px',
                opacity: '0.7'
              }}  
        >
          $
        </span>
      </div>
    
    <div  className="previous-cash-control-wrapper"
          style={{
            position: 'absolute',
            top: '177px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}  
    >
      <img  src={CheckBoxOff} 
            alt="Checkbox Image not found"
            style={{
              width: "18px",
              marginRight: "4px"
            }}
      />
      <span style={{
                    fontSize: '14px',
                    color: '#716C6C',
                    whiteSpace: 'nowrap'
      }}
      >
        Consider previous budget 
      </span>
      <img  src={Info} 
            alt="Info Image not found"
            style={{
              width: "18px",
              marginLeft: "4px"
            }}
      />
    </div>
    
    </div>
  );
}