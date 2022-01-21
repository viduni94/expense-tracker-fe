import { memo, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useUpdateCategoryMutation } from '../../../services/categories';
import styles from '../categories.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditCategoryModal = ({ open, toggle, selectedCategory, refetchCategories }) => {
  const [name, setName] = useState(selectedCategory.name);
  const [budget, setBudget] = useState(selectedCategory.budget);

  const [updateCategory] = useUpdateCategoryMutation();

  const editCategory = async () => {
    await updateCategory({ id: selectedCategory.id, name, budget });
    refetchCategories();
    toggle();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Category
            </Typography>
            <FormControl className={styles.formField}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </FormControl>
            <FormControl className={styles.formField}>
              <InputLabel htmlFor="budget">Budget</InputLabel>
              <Input id="budget" value={budget} onChange={e => setBudget(e.target.value)} />
            </FormControl>
            <Button
              variant="contained"
              className={styles.submitButton}
              onClick={editCategory}
              disabled={!name}>
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default memo(EditCategoryModal);
