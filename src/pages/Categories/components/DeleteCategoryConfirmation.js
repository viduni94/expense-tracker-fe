import { memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteCategoryMutation } from 'services/categories';

const DeleteCategoryConfirmation = ({
  open,
  toggle,
  selectedCategory,
  refetchCategories,
  setDeleteError,
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const onClickDelete = async () => {
    const { error } = await deleteCategory(selectedCategory.id);

    if (!error) {
      refetchCategories();
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
      <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the category {selectedCategory.name}?
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

export default memo(DeleteCategoryConfirmation);
