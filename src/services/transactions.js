import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';

const ENTITY_PATH = 'transactions';

export const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({ baseUrl: constants.api.basePath }),
  endpoints: builder => ({
    getAllTransactions: builder.query({
      query: () => `${ENTITY_PATH}`,
    }),
    getTransactionById: builder.query({
      query: id => `${ENTITY_PATH}/${id}`,
    }),
    addTransaction: builder.mutation({
      query: transaction => ({
        url: `${ENTITY_PATH}`,
        method: 'POST',
        body: transaction,
      }),
    }),
    updateTransaction: builder.mutation({
      query: transaction => ({
        url: `${ENTITY_PATH}/${transaction.id}`,
        method: 'PUT',
        body: transaction,
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
} = transactionsApi;
