import { memo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import LoopIcon from '@mui/icons-material/Loop';
import styles from '../transactions.module.scss';
import capitalize from '../../../utils/capitalize';
import EditTransactionModal from './EditTransactionModal';
import DeleteTransactionConfirmation from './DeleteTransactionConfirmation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cfcfcf',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TransactionsTable = ({ transactions, refetchTransactions, categories }) => {
  const [openEditTransactionModal, setOpenEditTransactionModal] = useState(false);
  const [openDeleteTransactionConfirmation, setOpenDeleteTransactionConfirmation] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [deleteError, setDeleteError] = useState();
  const [editError, setEditError] = useState();

  const toggleEditTransactionModal = () => {
    setOpenEditTransactionModal(!openEditTransactionModal);
  };

  const toggleDeleteTransactionConfrimation = () => {
    setOpenDeleteTransactionConfirmation(!openDeleteTransactionConfirmation);
  };

  const onClickEditTransaction = tx => {
    toggleEditTransactionModal();
    setSelectedTransaction(tx);
  };

  const onClickDeleteTransaction = tx => {
    toggleDeleteTransactionConfrimation();
    setSelectedTransaction(tx);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" className={styles.name}>
                  {tx.note || tx.category.name}{' '}
                  {tx.recurring ? (
                    <span>
                      <LoopIcon fontSize="small" color="info" />
                    </span>
                  ) : undefined}
                </TableCell>
                <TableCell>{tx.category.name}</TableCell>
                <TableCell>{capitalize(tx.type)}</TableCell>
                <TableCell align="right">{parseFloat(tx.amount).toFixed(2)}</TableCell>
                <TableCell align="center">{tx.date}</TableCell>
                <TableCell
                  align="center"
                  className={styles.actionIcon}
                  onClick={() => onClickEditTransaction(tx)}>
                  <EditIcon />
                </TableCell>
                <TableCell
                  align="center"
                  className={styles.actionIcon}
                  onClick={() => onClickDeleteTransaction(tx)}>
                  <DeleteIcon color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteError ? (
        <div className={styles.deleteErrorAlert}>
          <Alert severity="error">
            Could not delete transaction. Transaction may have associated categories
          </Alert>
        </div>
      ) : undefined}
      {editError ? (
        <div className={styles.deleteErrorAlert}>
          <Alert severity="error">Error occurred when editing the transaction</Alert>
        </div>
      ) : undefined}
      {selectedTransaction && openEditTransactionModal ? (
        <EditTransactionModal
          open={openEditTransactionModal}
          toggle={toggleEditTransactionModal}
          selectedTransaction={selectedTransaction}
          refetchTransactions={refetchTransactions}
          categories={categories}
          setEditError={setEditError}
        />
      ) : undefined}
      {selectedTransaction ? (
        <DeleteTransactionConfirmation
          open={openDeleteTransactionConfirmation}
          toggle={toggleDeleteTransactionConfrimation}
          selectedTransaction={selectedTransaction}
          refetchTransactions={refetchTransactions}
          setDeleteError={setDeleteError}
        />
      ) : undefined}
    </>
  );
};

export default memo(TransactionsTable);
