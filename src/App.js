import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navigation from 'components/Navigation';
import PageLoader from 'components/PageLoader';
import constants from 'utils/constants';

const Budget = lazy(() => import('pages/Budget'));
const Categories = lazy(() => import('pages/Categories'));
const Spending = lazy(() => import('pages/Spending'));
const Transactions = lazy(() => import('pages/Transactions'));
const Reports = lazy(() => import('pages/Reports'));

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          marginTop: '4rem',
          marginLeft: { sm: `${constants.navigation.drawerWidth}px` },
        }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={constants.pages.spending.path} element={<Spending />} />
            <Route path={constants.pages.transactions.path} element={<Transactions />} />
            <Route path={constants.pages.categories.path} element={<Categories />} />
            <Route path={constants.pages.budget.path} element={<Budget />} />
            <Route path={constants.pages.budget.path} element={<Reports />} />
          </Routes>
        </Suspense>
      </Box>
    </>
  );
};

export default App;
