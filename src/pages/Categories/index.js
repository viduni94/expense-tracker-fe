import { memo, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import cx from 'classnames';
import pageStyles from 'pages/pages.module.scss';
import Alert from '@mui/material/Alert';
import CategoryTable from './components/CategoryTable';
import AddCategoryModal from './components/AddCategoryModal';
import { useGetAllCategoriesQuery } from '../../services/categories';
import styles from './categories.module.scss';

const Categories = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  const { data, refetch: refetchCategories, isFetching } = useGetAllCategoriesQuery();

  const toggleAddCategoryModal = () => {
    setOpenAddCategoryModal(!openAddCategoryModal);
  };

  if (!isFetching && !data?.length) {
    return <Alert severity="info">No categories available</Alert>;
  }

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <Container maxWidth="md" className={styles.container}>
        <div className={styles.addButtonContainer}>
          <Button variant="contained" onClick={toggleAddCategoryModal}>
            Add Category
          </Button>
        </div>
        {data?.length ? (
          <CategoryTable categories={data} refetchCategories={refetchCategories} />
        ) : undefined}
      </Container>
      <AddCategoryModal
        open={openAddCategoryModal}
        toggle={toggleAddCategoryModal}
        refetchCategories={refetchCategories}
      />
    </div>
  );
};

export default memo(Categories);
