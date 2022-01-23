import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';

const ENTITY_PATH = 'progress';

export const reportsApi = createApi({
  reducerPath: 'reports',
  baseQuery: fetchBaseQuery({ baseUrl: constants.api.basePath }),
  endpoints: builder => ({
    getTotalPerCategory: builder.query({
      query: () => `${ENTITY_PATH}/transactionTotalPerCategory`,
      transformResponse: response => {
        return response.map(res => {
          return {
            name: res.category.name,
            budget: res.category.budget,
            expense: res.total,
          };
        });
      },
    }),
  }),
});

export const { useGetTotalPerCategoryQuery } = reportsApi;
