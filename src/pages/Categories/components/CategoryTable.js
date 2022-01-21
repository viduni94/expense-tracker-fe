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
import styles from '../categories.module.scss';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryConfirmation from './DeleteCategoryConfirmation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cfcfcf',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CategoryTable = ({ categories, refetchCategories }) => {
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openDeleteCategoryConfirmation, setOpenDeleteCategoryConfirmation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [deleteError, setDeleteError] = useState();

  const toggleEditCategoryModal = () => {
    setOpenEditCategoryModal(!openEditCategoryModal);
  };

  const toggleDeleteCategoryConfrimation = () => {
    setOpenDeleteCategoryConfirmation(!openDeleteCategoryConfirmation);
  };

  const onClickEditCategory = category => {
    toggleEditCategoryModal();
    setSelectedCategory(category);
  };

  const onClickDeleteCategory = category => {
    toggleDeleteCategoryConfrimation();
    setSelectedCategory(category);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Budget</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow
                key={category.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category.budget}</TableCell>
                <TableCell
                  align="right"
                  className={styles.actionIcon}
                  onClick={() => onClickEditCategory(category)}>
                  <EditIcon />
                </TableCell>
                <TableCell
                  align="right"
                  className={styles.actionIcon}
                  onClick={() => onClickDeleteCategory(category)}>
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
            Could not delete category. Category may have associated transactions
          </Alert>
        </div>
      ) : undefined}
      {selectedCategory ? (
        <EditCategoryModal
          open={openEditCategoryModal}
          toggle={toggleEditCategoryModal}
          selectedCategory={selectedCategory}
          refetchCategories={refetchCategories}
        />
      ) : undefined}
      {selectedCategory ? (
        <DeleteCategoryConfirmation
          open={openDeleteCategoryConfirmation}
          toggle={toggleDeleteCategoryConfrimation}
          selectedCategory={selectedCategory}
          refetchCategories={refetchCategories}
          setDeleteError={setDeleteError}
        />
      ) : undefined}
    </>
  );
};

export default memo(CategoryTable);
