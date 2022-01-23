import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import categoriesReducer from 'pages/Categories/categoriesSlice';
import dashboardReducer from 'pages/Dashboard/dashboardSlice';
import transactionsReducer from 'pages/Transactions/transactionsSlice';
import { transactionsApi } from './services/transactions';
import { categoriesApi } from './services/categories';
import { reportsApi } from './services/reports';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(transactionsApi.middleware),
});

setupListeners(store.dispatch);
export default store;
