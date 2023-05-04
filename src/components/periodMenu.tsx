export type PeriodMenuProps = {
  customPeriods?: string[];
}

export const PeriodMenu = (props: PeriodMenuProps) => {
  return (
    <div style={{
          width: '240px',
          height: '11px',
         }}
         className='period-menu-container'
    >
      <div>Week</div>
      <div>Month</div>
      <div>Year</div>
      <div>Period</div>
    </div>  
  )
}