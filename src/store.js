import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import budgetReducer from 'pages/Budget/budgetSlice';
import categoriesReducer from 'pages/Categories/categoriesSlice';
import spendingReducer from 'pages/Spending/spendingSlice';
import transactionsReducer from 'pages/Transactions/transactionsSlice';
import { transactionsApi } from './services/transactions';

const store = configureStore({
  reducer: {
    spending: spendingReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    budget: budgetReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(transactionsApi.middleware),
});

setupListeners(store.dispatch);
export default store;
