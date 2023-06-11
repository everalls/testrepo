import { Backdrop, Box, Button, Collapse, Fade, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, Switch } from "@mui/material";
import TextField from '@mui/material/TextField';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { useContext, useEffect, useState } from "react";
import { HomeViewContext } from "../contexts/homeViewContext";
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

export const Expense = () =>  {
  
  const [expense, setExpense] = useState<any|null>(null); //TODO: use type
  const [expenseDate, setExpenseDate] = useState<Dayjs|null>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs|null>(dayjs());
  const [stopDate, setStopDate] = useState<Dayjs|null>(dayjs());
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [recurringOfType, setRecurringOfType] = useState<RecurrenceTypes>("1");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [numberOfPayments, setNumberOfPayments] = useState<number>(1);
  const [stopRecurrencyCondition, setStopRecurrencyCondition] = useState<'stopByNumberOfPayments' | 'stopByDate'>('stopByNumberOfPayments');

  const {data, loading, error, postExpense, putExpense, expenseModalOpen, showHideExpense, expenseId, currentExpense, expenseOpType } = useContext(HomeViewContext);
  
  const onRecurrentTypeChange = (event: SelectChangeEvent<RecurrenceTypes>) => {
    setRecurringOfType(event.target.value as RecurrenceTypes);
  };

  const updateRecurrentState = () => {
    if (!currentExpense) {
      setIsRecurring(false);
      setRecurringOfType("1");

    } else {
      let recurrentType = currentExpense?.Recurrence?.RecurrenceTypeId;
      if (recurrentType && recurrentType > 0) {
        setIsRecurring(true);
        setRecurringOfType(recurrentType.toString());
      } else {
        setIsRecurring(false);
        setRecurringOfType("1");
      }
    }
  }

  const updateStopDate = () => { 
    if (!currentExpense) {
      setStopDate(null);
    } else {
      const stopDate = currentExpense?.Recurrence?.StopDate;
      if (stopDate) {
        setStopDate(dayjs(stopDate));
      } else {
        setStopDate(null);
      }
    }
  }

  const updateStopRecurrencyCondition = () => {
    const endAfterTimes = currentExpense?.Recurrence?.EndAfterTimes;
    console.log('endAfterTimes expense:::', currentExpense);
    console.log('endAfterTimes:::', endAfterTimes);
    endAfterTimes && (endAfterTimes > 0) ? setStopRecurrencyCondition('stopByNumberOfPayments') : setStopRecurrencyCondition('stopByDate');
    console.log('stopRecurrencyCondition:::', stopRecurrencyCondition);
  }
  
  const resertForm = () => {
    !currentExpense ? setExpenseDate(dayjs()) : setExpenseDate(dayjs(currentExpense?.Created));
    !currentExpense ? setStartDate(dayjs()) : setStartDate(dayjs(currentExpense?.Recurrence?.StartDate));
    updateStopDate();
    !currentExpense ? setName('') : setName(currentExpense?.Name);
    !currentExpense ? setAmount(0) : setAmount(currentExpense?.Amount);
    updateRecurrentState();
    setNumberOfPayments(currentExpense?.Recurrence?.EndAfterTimes || 1);
    updateStopRecurrencyCondition();

    console.log('currentExpense:::', currentExpense);
  };
  
  useEffect(() => {
    resertForm();
  }, [currentExpense]);
  

  return (
    <Modal className="expense-modal" open={expenseModalOpen}
    slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 700,
          },
        }}>
      <Fade in={expenseModalOpen}>
        <div className="expense-modal-container">
          <h4 style={{marginTop: '8px', marginBottom: '24px', color: '#1976d2',fontSize: '14px'}}
          >
            { !currentExpense ? 'New Expense' : 'Edit Expense'}
          </h4>
          <Box
            component="form"
            autoComplete="off"
          >
          <TextField
              sx={{marginBottom: '16px'}}
              inputProps={{
                            style: {
                                    fontSize: '14px'
                            }
                          }}
              size="small"
              required
              label="Name"
              fullWidth
              value={name} onChange={(event) => setName(event.target.value)}
            />
              
      
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={expenseDate} 
                          onChange={(newDate) => setExpenseDate(newDate)} 
                          label="Date" sx={{marginRight: '8px', marginBottom: '16px'}} 
                          slotProps={{ textField: { size: 'small', inputProps: {style: {fontSize: '14px'}}, fullWidth: true } }}
              />
            </LocalizationProvider>
            <TextField
              sx={{marginBottom: '16px'}}
              inputProps={{
                            style: {
                              fontSize: '14px'
                            },
                            pattern: '[0-9]*[.]?[0-9]*',
                          }}
              size="small"
              required
              label="Amount"
              fullWidth
              value={amount} onChange={(event) => setAmount(Number(event.target.value) || amount)}
            />
                
              <FormControlLabel control=
                                {<Switch  checked={isRecurring}
                                          size="small"  
                                          onChange={() => setIsRecurring(!isRecurring)}
                                />} 
                                label={<span style={{ fontSize: '14px' }}>Recurrent</span>}
                                sx={{widh: '100%', fontWeight: '600', marginBottom: '16px'}} 
              />

              <Collapse in={isRecurring}>
              <>
                <FormControl sx={{width: '100%', marginTop: '16px'}}>
                  <InputLabel>Period</InputLabel>
                    <Select
                      value={recurringOfType}
                      onChange={onRecurrentTypeChange}
                      size="small" 
                      label="Period"
                      sx={{fontSize: '14px'}}
                    >
                      {Object.keys(recurrenceTypesMap).map(key => 
                        <MenuItem sx={{fontSize: '14px'}} key={key} value={key}>{recurrenceTypesMap[key as RecurrenceTypes]}
                        </MenuItem>
                        )
                      }   
                    </Select>
                </FormControl>
                  
              <FormControl sx={{marginTop: '16px'}} variant="outlined" >
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={startDate} 
                                    label="Start date"
                                    onChange={(newDate) => setStartDate(newDate)} 
                                    sx={{marginBottom: '16px'}}
                                    slotProps={{ textField: { size: 'small', inputProps: {style: {fontSize: '14px'}}, fullWidth: true } }}
                        />
                </LocalizationProvider>

                <RadioGroup
                  defaultValue={stopRecurrencyCondition}
                  name="radio-buttons-group"
                >
                <div style={{color: '#bbbbbb', fontSize: '14px', fontWeight: 'bold', padding: '16px', paddingTop: '0px'}}>Stop conditions:</div>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '16px'}}> 
                  <Radio size="small"   
                        value="stopByDate"                                  
                        sx={{flex: 0.1, padding: '0px', marginRight: '8px'}}
                        onChange={() => setStopRecurrencyCondition('stopByDate')}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker value={stopDate} 
                                  label="Stop date"
                                  disabled={stopRecurrencyCondition === 'stopByNumberOfPayments'}
                                  onChange={(newDate) => setStopDate(newDate)} 
                                  sx={{flex: 1}}
                                  slotProps={{ textField: { size: 'small', inputProps: {style: {fontSize: '14px'}}}}}
                      />
                    </LocalizationProvider>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    
                      <Radio  size="small"
                              value="stopByNumberOfPayments"
                              sx={{flex: 0.1, padding: '0px', marginRight: '8px'}}
                              onChange={() => {
                                setStopRecurrencyCondition('stopByNumberOfPayments')
                              }}
                    />
                    <TextField
                        disabled={stopRecurrencyCondition === 'stopByDate'}
                        label="Number of payments"
                        required
                        size="small"
                        inputProps={{style: {fontSize: '14px'}}}
                        id="number-of-payments"
                        value={numberOfPayments} onChange={(event) => setNumberOfPayments(numberOfPayments => Number(event.target.value) || numberOfPayments)}
                        sx={{flex: 1}}
                    />
                  </div>

                </RadioGroup>
              </FormControl>
              </>
              </Collapse>
          </Box>

          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '16px'}}>
          
            <Button onClick={() => {
              const recurrenceTypeId = isRecurring ? recurringOfType : 0;
              const endAfterTimes = stopRecurrencyCondition === 'stopByNumberOfPayments' ? numberOfPayments : null;
              const payload: any = [ //TODO add type. Need elaborate with backend too.
                {
                  "Amount":amount,
                  "Name":name,
                  "Description": name,  //TODO add description field
                  "MovementsDate": expenseDate?.toISOString(),
                  "Recurrence":{
                    "RecurrenceTypeId": Number(recurrenceTypeId),
                    "StartDate": startDate?.toISOString(),
                    "EndAfterTimes": endAfterTimes,
                    "EndDate":  stopDate?.toISOString(),
                    "WeekDay": startDate?.day(),
                    "MonthDay": startDate?.date() || 0 + 1,  
                  }
                } 
              ]
              expenseOpType === 'create' ? postExpense(payload) : putExpense([{...payload[0], Id: currentExpense.Id}]);
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
        </div>
      </Fade>
    </Modal>
  );
}