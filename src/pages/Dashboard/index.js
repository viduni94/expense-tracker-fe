import { memo, useState } from 'react';
import cx from 'classnames';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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

  const { data, refetch: refetchTransactions, isFetching } = useGetTransactionByDateRangeQuery();

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <div className={styles.selectedMonth}>{months[month]}</div>
          <Grid container spacing={2}>
            {/* {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))} */}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default memo(Dashboard);
