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
import styles from '../categories.module.scss';
import EditCategoryModal from './EditCategoryModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cfcfcf',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CategoryTable = ({ categories }) => {
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  const toggleEditCategoryModal = () => {
    setOpenEditCategoryModal(!openEditCategoryModal);
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
                  className={styles.editIcon}
                  onClick={toggleEditCategoryModal}>
                  <EditIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditCategoryModal open={openEditCategoryModal} toggle={toggleEditCategoryModal} />
    </>
  );
};

export default memo(CategoryTable);
