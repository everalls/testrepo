import { useContext, useEffect } from "react";
import { PeriodMenu } from "../periodMenu";
import ImageGraph from '../../assets/graph.svg'
import { HomeViewContext } from "../../contexts/homeViewContext";
import dayjs from 'dayjs';


export  const TopBar = () => {

  const {startDate, endDate } = useContext(HomeViewContext);

  return (
      <div className="top-bar">
        <PeriodMenu/>
        <img  src={ImageGraph} 
              alt="no graph image" 
              style={{
                width: '100%',
                marginTop: '16px',
                fontSize: '16px'
              }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            color: '#777777',
            marginTop: '16px',
          }}
        >
        { dayjs(startDate).format('MMM-DD, YYYY') } - { dayjs(endDate).format('MMM-DD, YYYY') }
        </div>

      </div>
  )
}