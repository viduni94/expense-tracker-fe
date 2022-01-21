import { memo, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import cx from 'classnames';
// import { increment } from './categoriesSlice';
import pageStyles from 'pages/pages.module.scss';
import CategoryTable from './components/CategoryTable';
import AddCategoryModal from './components/AddCategoryModal';
import { useGetAllCategoriesQuery } from '../../services/categories';
import styles from './categories.module.scss';

const Categories = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const { data } = useGetAllCategoriesQuery();

  const toggleAddCategoryModal = () => {
    setOpenAddCategoryModal(!openAddCategoryModal);
  };

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <Container maxWidth="md" className={styles.container}>
        <div className={styles.addButtonContainer}>
          <Button variant="contained" onClick={toggleAddCategoryModal}>
            Add Category
          </Button>
        </div>
        {data ? <CategoryTable categories={data} /> : undefined}
      </Container>
      <AddCategoryModal open={openAddCategoryModal} toggle={toggleAddCategoryModal} />
    </div>
  );
};

export default memo(Categories);
