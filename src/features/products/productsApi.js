import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utility/constants';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, elements }) => `/products?page=${page}&elements=${elements}`,
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/products`,
        method: "POST",
        body: newProduct,
        responseHandler: (response) => response.text(), 
      }),
    }),
    deleteProduct: builder.mutation({
      query: (idProduct) => ({
        url: `/productssd/${idProduct}`,
        method: 'DELETE',
      }),
    }),
    getCategoriesStats: builder.query({
      query: () => '/stats/categories', // Query per ottenere la statistica delle categorie
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetCategoriesStatsQuery } = productsApi;
