import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import ReactLogo from 'components/ReactLogo';
import { useGetAllTransactionsQuery } from '../../services/transactions';
import { increment } from './transactionsSlice';
import pageStyles from 'pages/pages.module.scss';
import styles from './transactions.module.scss';

const Transactions = () => {
  const count = useSelector(({ transactions }) => transactions.value);
  const dispatch = useDispatch();

  const { error, isLoading } = useGetAllTransactionsQuery();

  let transactions;

  if (isLoading) {
    transactions = <div>Transactions loading...</div>;
  } else if (error) {
    transactions = <div>Transactions error...</div>;
  } else {
    transactions = <div>Transactions fetched...</div>;
  }

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <ReactLogo onClick={() => dispatch(increment())} />
      <h2>Transactions</h2>
      <div data-testid="count" hidden>
        {count}
      </div>
      {transactions}
    </div>
  );
};

export default memo(Transactions);
