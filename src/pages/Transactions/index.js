import { memo, useState } from 'react';
import cx from 'classnames';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useGetAllTransactionsQuery } from '../../services/transactions';
import { useGetAllCategoriesQuery } from '../../services/categories';
import pageStyles from 'pages/pages.module.scss';
import TransactionsTable from './components/TransactionsTable';
import AddTransactionModal from './components/AddTransactionModal';
import styles from './transactions.module.scss';

const Transactions = () => {
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);

  const { data, refetch: refetchTransactions } = useGetAllTransactionsQuery();
  const { data: categories } = useGetAllCategoriesQuery();

  const toggleAddTransactionModal = () => {
    setOpenAddTransactionModal(!openAddTransactionModal);
  };

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <div className={cx(pageStyles.container, styles.main)}>
        <Container maxWidth="md" className={styles.container}>
          <div className={styles.addButtonContainer}>
            <Button variant="contained" onClick={toggleAddTransactionModal}>
              Add Transaction
            </Button>
          </div>
          {data?.length ? (
            <TransactionsTable
              transactions={data}
              refetchTransactions={refetchTransactions}
              categories={categories}
            />
          ) : (
            <Alert severity="info">No transactions available</Alert>
          )}
        </Container>
        {openAddTransactionModal ? (
          <AddTransactionModal
            open={openAddTransactionModal}
            toggle={toggleAddTransactionModal}
            refetchTransactions={refetchTransactions}
            categories={categories}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default memo(Transactions);
