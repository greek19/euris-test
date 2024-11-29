import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR' }),
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
