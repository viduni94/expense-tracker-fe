import { Fragment, memo, useEffect, useState } from 'react';
import cx from 'classnames';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import pageStyles from 'pages/pages.module.scss';
import { useGetTransactionByDateRangeQuery } from '../../services/transactions';
import styles from './dashboard.module.scss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Dashboard = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const { data } = useGetTransactionByDateRangeQuery({
    startDate: `${year}-${`0${month + 1}`.slice(-2)}-01`,
    endDate: `${year}-${`0${month + 1}`.slice(-2)}-28`,
  });

  useEffect(() => {
    if (data) {
      setTotalIncome(data.incomes.reduce((acc, current) => acc + current.amount, 0));
      setTotalExpense(data.expenses.reduce((acc, current) => acc + current.amount, 0));
    }
  }, [data]);

  const onClickNext = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const onClickBack = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  if (!data) {
    return <Alert severity="info">No data available</Alert>;
  }

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <Container>
        <div className={styles.selectedMonth}>
          <ArrowBackIosIcon onClick={onClickBack} />
          <span>
            {months[month]} - {year}
          </span>
          <ArrowForwardIosIcon onClick={onClickNext} />
        </div>
        <div className={styles.title}>
          <h4>Total Income - {parseFloat(totalIncome).toFixed(2)} LKR</h4>
        </div>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 'auto' }}>
          {data.incomes.map(income => (
            <Fragment key={income.id}>
              <Grid item xs={6}>
                <p className={styles.record}>{income.note || income.category.name}</p>
              </Grid>
              <Grid item xs={6}>
                <p>{parseFloat(income.amount).toFixed(2)}</p>
              </Grid>
            </Fragment>
          ))}
        </Grid>

        <div className={cx(styles.title, styles.expenseTitle)}>
          <h4>Total Expense - {parseFloat(totalExpense).toFixed(2)} LKR</h4>
        </div>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 'auto' }}>
          {data.expenses.map(expense => (
            <Fragment key={expense.id}>
              <Grid item xs={6}>
                <p className={styles.record}>{expense.note || expense.category.name}</p>
              </Grid>
              <Grid item xs={6}>
                <p>{parseFloat(expense.amount).toFixed(2)}</p>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Container>
      <div className={cx(styles.title, styles.balance)}>
        <h4>
          Balance - {parseFloat(parseFloat(totalIncome) - parseFloat(totalExpense)).toFixed(2)} LKR
        </h4>
      </div>
    </div>
  );
};

export default memo(Dashboard);
