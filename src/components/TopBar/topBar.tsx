import { useEffect } from "react";
import { PeriodMenu } from "../periodMenu";
import ImageGraph from '../../assets/graph.svg'

export  const TopBar = () => {

  return (
      <div className="top-bar">
        <PeriodMenu/>
        <img  src={ImageGraph} 
              alt="no graph image" 
              style={{
                width: '100%',
                marginTop: '16px',
              }}
        />
      </div>
  )
}