import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import { HomeViewContext } from "../contexts/homeViewContext";
import TextField from '@mui/material/TextField';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear);

const recurrenceTypesMap = { // TODO make it dynamic by fetching from API
  "1": "Daily",
  "2": "Weekly",
  "3": "BiWeekly",
  "4": "SemiMonthly",
  "5": "Monthly",
  "6": "Annually"
};

type RecurrenceTypes = keyof typeof recurrenceTypesMap;

const dateFormatToPayload = (date: string ): string => {
  return dayjs(date).isValid() ? dayjs(date).format('YYYY-MM-DD') : date;

}

export const Expense = () =>  {

  const [startDate, setStartDate] = useState<Dayjs|null>(dayjs());
  const [stopDate, setStopDate] = useState<Dayjs|null>(dayjs());
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [recurringOfType, setRecurringOfType] = useState<RecurrenceTypes>("1");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [numberOfPayments, setNumberOfPayments] = useState<number>(1);
  const [stopRecurrencyCondition, setStopRecurrencyCondition] = useState<'stopByNumberOfPayments' | 'stopByDate'>('stopByNumberOfPayments');

  const {data, loading, error, postExpense, expenseModalOpen, showHideExpense } = useContext(HomeViewContext);
  
  const onRecurrentTypeChange = (event: SelectChangeEvent<RecurrenceTypes>) => {
    setRecurringOfType(event.target.value as RecurrenceTypes);
  };

  const resertForm = () => {
    setStartDate(dayjs());
    setStopDate(dayjs());
    setName('');
    setAmount(0);
    setRecurringOfType("1");
    setIsRecurring(false);
    setNumberOfPayments(1);
    setStopRecurrencyCondition('stopByNumberOfPayments');
  }


  return (
    <Modal className="expense-modal" open={expenseModalOpen}>
      <div className="expense-modal-container">
        <h3>New Expense</h3>


        <Box
          component="form"
          autoComplete="off"
        >
          <div style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}>
            <TextField
              required
              id="expense-name"
              label="Name"
              placeholder="Enter expense name"
              fullWidth
              value={name} onChange={(event) => setName(event.target.value)}
            />
            
            </div>
            <div style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={startDate} 
                            onChange={(newDate) => setStartDate(newDate)} 
                            label="Purchasing date" sx={{marginRight: '8px', flex: 1}} 
                            slotProps={{ textField: { size: 'small' } }}
                />
              </LocalizationProvider>
              <TextField
                sx={{flex: 1}}
                size="small"
                required
                id="expense-amount"
                label="Amount"
                placeholder="Enter expense amount"
                fullWidth
                value={amount} onChange={(event) => setAmount(Number(event.target.value))}
             />
            </div>

            <div style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              flexDirection: 'row'
            }}>
              <div style={{flex: 1, marginRight: '8px'}}>
                <FormControlLabel control=
                                  {<Checkbox checked={isRecurring}
                                             onChange={() => setIsRecurring(!isRecurring)}
                                  />} 
                                  label={'Recurrent'} 
                                  sx={{widh: '100%', fontWeight: '600'}} 
                />
              </div>
              <div style={{flex: 1}}>
              {isRecurring && 
                <FormControl sx={{width: '100%', marginTop: '16px'}}>
                  <InputLabel id="test-select-label">Period</InputLabel>
                    <Select
                      value={recurringOfType}
                      onChange={onRecurrentTypeChange}
                      label="Recurrency period"
                      size="small" 
                    >
                      {Object.keys(recurrenceTypesMap).map(key => 
                        <MenuItem key={key} value={key}>{recurrenceTypesMap[key as RecurrenceTypes]}
                        </MenuItem>
                        )
                      }   
                    </Select>
                </FormControl>}
                
              </div>
            </div>
            
            {isRecurring && <FormControl sx={{padding: '8px', marginTop: '8px'}}>
              <FormLabel id="demo-radio-buttons-group-label" sx={{fontWeight: '700'}}>Stop by:</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="stopByNumberOfPayments"
                name="radio-buttons-group"
              >
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                  <FormControlLabel value="stopByNumberOfPayments" 
                                    control={<Radio size="small"/>} 
                                    label="Number of payments:" 
                                    sx={{flex: 1}}
                                    onChange={() => {
                                      console.log('stopByNumberOfPayments')
                                      setStopRecurrencyCondition('stopByNumberOfPayments')
                                    }}
                  />
                  <TextField
                      disabled={stopRecurrencyCondition === 'stopByDate'}
                      required
                      size="small"
                      id="number-of-payments"
                      value={numberOfPayments} onChange={(event) => setNumberOfPayments(Number(event.target.value))}
                      sx={{flex: 0.7}}
                  />
                </div>

                <div style={{ display: 'flex', 
                              flexDirection: 'row',  
                              margin: '8px',
                              fontWeight: '700',
                              paddingLeft: '24px',
                              fontStyle: 'italic',
                              fontSize: '16px'}}
                >
                   OR     
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <FormControlLabel value="stopByDate" 
                                    control={<Radio size="small"/>} 
                                    label="By specific date:" 
                                    sx={{flex: 1}}
                                    onChange={() => {
                                      console.log('stopByDate')
                                      setStopRecurrencyCondition('stopByDate')
                                    }}
                  />
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={stopDate} 
                                disabled={stopRecurrencyCondition === 'stopByNumberOfPayments'}
                                onChange={(newDate) => setStopDate(newDate)} 
                                sx={{flex: 0.7}}
                                slotProps={{ textField: { size: 'small' } }}
                    />
                  </LocalizationProvider>
                </div>


              </RadioGroup>
            </FormControl>}
            
        </Box>
        
        <Button onClick={() => {

        const recurrenceTypeId = isRecurring ? recurringOfType : 0;
        const startDatePayload = dateFormatToPayload((startDate || '').toString());
        const endDatePayload = stopRecurrencyCondition === 'stopByDate' ? dateFormatToPayload((stopDate || '').toString()) : null;
        const endAfterTimes = stopRecurrencyCondition === 'stopByNumberOfPayments' ? numberOfPayments : null;
        
          
          const payload: any = [ //TODO add type. Need elaborate with backend too.
            // {"Amount":amount,
            //   "Name":name,
            //   "Recurrence":{
            //     "RecurrenceTypeId": recurrenceTypeId,
            //     "StartDate": startDate?.toISOString(),
            //     "WeekDay": startDate?.day(),
            //     "MonthDay": startDate?.date(),
            //     "EndDate":  startDate?.toISOString(),
            //     "EndAfterTimes": endAfterTimes
            //   }
            // },

            {
              "Recurrence": {
                "RecurrenceTypeId": 5,
                "WeekDay": 0,
                "MonthDay": 1,
                "EndDate": "2023-05-07T17:33:51.882Z",
                "StartDate": "2023-05-07T17:33:51.882Z",
                "EndAfterTimes": 3,
              },
              "Amount": 1,
              "Name": "string1117",
              "ExpenseDate": "2023-05-07T17:33:51.882Z",
              "Description": "string"
              
            }
          ];
          
          // "AnnualDay": startDate?.toISOString(),

          /*
          [
            {
              "Recurrence": {
                "RecurrenceTypeId": 0,
                "WeekDay": 0,
                "MonthDay": 0,
                "IsNeverEnd": true,
                "EndDate": "2023-05-05T20:11:03.613Z",
                "UpdateFor": 0,
                "StartDate": "2023-05-05T20:11:03.613Z",
                "EndAfterTimes": 0,
                "AnnualDay": "2023-05-05T20:11:03.613Z",
                "Created": "2023-05-05T20:11:03.613Z",
                "Updated": "2023-05-05T20:11:03.613Z",
                "Id": 0
              },
              "Amount": 0,
              "Name": "string",
              "PeriodFrom": "2023-05-05T20:11:03.613Z",
              "PeriodTo": "2023-05-05T20:11:03.613Z"
            }
          ]
          */

          console.log('payload::: ', payload);
          postExpense(payload);
          showHideExpense(false);
          resertForm();

        }}
        >
          Save
        </Button>
        <Button onClick={() => {
          showHideExpense(false);
          resertForm();
        }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}