import React from 'react';
import { useGetCategoriesStatsQuery } from '../features/products/productsApi';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  RadialLinearScale, 
} from 'chart.js';
import { Container, Spinner } from 'react-bootstrap';
import { COLORS } from '../utility/constants';

// Registrazione degli elementi necessari per il grafico
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  Title, 
  CategoryScale, 
  RadialLinearScale
);

const CategoryChart = () => {
  const { data, error, isLoading } = useGetCategoriesStatsQuery();

  const chartData = {
    labels: data ? data.map(item => item.category) : [], 
    datasets: [
      {
        label: 'Prodotti per Categoria',
        data: data ? data.map(item => item.numberOfProducts) : [], 
        backgroundColor: COLORS,
        borderColor: COLORS, 
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p>Errore nel recupero dei dati: {error.message}</p>;

  return (
    <div>
      <h2>Prodotti per Categoria</h2>
      <Container>
        <PolarArea data={chartData} options={{ responsive: true }} />
      </Container>
    </div>
  );
};

export default CategoryChart;
