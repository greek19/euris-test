import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useGetProductsQuery } from '../features/products/productsApi';

const Chart = () => {
  const { data: products } = useGetProductsQuery();

  const categoryCounts = products?.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCounts || {}),
    datasets: [
      {
        data: Object.values(categoryCounts || {}),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <PolarArea data={data} />;
};

export default Chart;
