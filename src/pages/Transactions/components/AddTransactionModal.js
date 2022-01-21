/* eslint-disable react/jsx-props-no-spreading */
import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { format } from 'date-fns';
import cx from 'classnames';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from '../transactions.module.scss';
import { useAddTransactionMutation } from '../../../services/transactions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddTransactionModal = ({ open, toggle, refetchTransactions, categories }) => {
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState();
  const [note, setNote] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState(1);
  const [frequency, setFrequency] = useState('months');
  const [endDate, setEndDate] = useState();

  const [addTransaction] = useAddTransactionMutation();

  const submitTransaction = async () => {
    const { error } = await addTransaction({
      date,
      type,
      category,
      amount,
      note,
      period,
      frequency,
      endDate,
    });

    if (!error) {
      refetchTransactions();
    }
    toggle();
  };

  const renderMenuItems = () => {
    const array = [];
    for (let i = 0; i < 31; i += 1) {
      array.push(i);
    }

    return array.map(j => (
      <MenuItem key={j + 1} value={j + 1}>
        {j + 1}
      </MenuItem>
    ));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Transaction
            </Typography>
            <FormControl className={styles.formField}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  {!isMobile ? (
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="yyyy-MM-dd"
                      value={date}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => setDate(format(e, 'yyyy-MM-dd'))}
                      renderInput={params => <TextField {...params} />}
                    />
                  ) : (
                    <MobileDatePicker
                      label="Date"
                      inputFormat="yyyy-MM-dd"
                      value={date}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => setDate(format(e, 'yyyy-MM-dd'))}
                      renderInput={params => <TextField {...params} />}
                    />
                  )}
                </Stack>
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={type}
                label="Type"
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={e => setType(e.target.value)}>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={styles.formField}
              label="Amount"
              variant="outlined"
              id="amount"
              type="number"
              value={amount}
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={e => setAmount(e.target.value)}
            />
            <FormControl className={styles.formField}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Category"
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={e => setCategory(e.target.value)}>
                {categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormGroup className={styles.formField}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRecurring}
                    onChange={e => setIsRecurring(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Repeating"
              />
            </FormGroup>
            {isRecurring ? (
              <>
                <div className={cx(styles.formField, styles.frequency)}>
                  <FormControl>
                    <InputLabel htmlFor="frequency">Every</InputLabel>
                    <Select
                      labelId="frequency"
                      id="frequency"
                      value={frequency}
                      label="Frequency"
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => setFrequency(e.target.value)}>
                      <MenuItem value="months">Months</MenuItem>
                      <MenuItem value="weeks">Weeks</MenuItem>
                      <MenuItem value="days">Days</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="period">Period</InputLabel>
                    <Select
                      labelId="period"
                      id="period"
                      value={period}
                      label="Period"
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => setPeriod(e.target.value)}>
                      {renderMenuItems()}
                    </Select>
                  </FormControl>
                </div>
                <FormControl className={styles.formField}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      {!isMobile ? (
                        <DesktopDatePicker
                          label="End Date"
                          inputFormat="yyyy-MM-dd"
                          value={endDate}
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={e => setEndDate(format(e, 'yyyy-MM-dd'))}
                          renderInput={params => <TextField {...params} />}
                        />
                      ) : (
                        <MobileDatePicker
                          label="End Date"
                          inputFormat="yyyy-MM-dd"
                          value={endDate}
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={e => setEndDate(format(e, 'yyyy-MM-dd'))}
                          renderInput={params => <TextField {...params} />}
                        />
                      )}
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </>
            ) : undefined}
            <TextField
              className={styles.formField}
              label="Note"
              variant="outlined"
              id="note"
              value={note}
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={e => setNote(e.target.value)}
            />
            <Button
              variant="contained"
              className={styles.submitButton}
              onClick={submitTransaction}
              disabled={!amount || !date || !category}>
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default memo(AddTransactionModal);
