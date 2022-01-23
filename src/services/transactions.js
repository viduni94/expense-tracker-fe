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
    getTransactionByDateRange: builder.query({
      query: (startDate, endDate) =>
        `${ENTITY_PATH}/${startDate ? `?startdate=${startDate}&endDate=${endDate}` : ''}`,
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
    deleteTransaction: builder.mutation({
      query: id => ({
        url: `${ENTITY_PATH}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionByDateRangeQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
