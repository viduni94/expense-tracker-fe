import { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteTransactionMutation } from 'services/transactions';

const DeleteTransactionConfirmation = ({
  open,
  toggle,
  selectedTransaction,
  refetchTransactions,
  setDeleteError,
}) => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const onClickDelete = async () => {
    const { error } = await deleteTransaction(selectedTransaction.id);

    if (!error) {
      refetchTransactions();
      setDeleteError();
    } else {
      setDeleteError(error);
    }
    toggle();
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Delete Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the transaction{' '}
          {selectedTransaction.note || selectedTransaction.category.name} (
          {selectedTransaction.amount} GBP)?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>No</Button>
        <Button onClick={onClickDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DeleteTransactionConfirmation);
