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

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData('Frozen yoghurt', 159, <EditIcon />),
  createData('Ice cream sandwich', 237, <EditIcon />),
  createData('Eclair', 262, <EditIcon />),
  createData('Cupcake', 305, <EditIcon />),
  createData('Gingerbread', 356, <EditIcon />),
];

const CategoryTable = () => {
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
            {rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell
                  align="right"
                  className={styles.editIcon}
                  onClick={toggleEditCategoryModal}>
                  {row.fat}
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
