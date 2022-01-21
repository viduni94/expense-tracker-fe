import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import constants from '../utils/constants';

const ENTITY_PATH = 'categories';

export const categoriesApi = createApi({
  reducerPath: 'categories',
  baseQuery: fetchBaseQuery({ baseUrl: constants.api.basePath }),
  endpoints: builder => ({
    getAllCategories: builder.query({
      query: () => `${ENTITY_PATH}`,
    }),
    addCategory: builder.mutation({
      query: category => ({
        url: `${ENTITY_PATH}`,
        method: 'POST',
        body: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: category => ({
        url: `${ENTITY_PATH}/${category.id}`,
        method: 'PUT',
        body: category,
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation } =
  categoriesApi;
