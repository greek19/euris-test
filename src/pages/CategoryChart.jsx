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
  RadialLinearScale, // Importa la scala radialLinear
} from 'chart.js';
import { Container } from 'react-bootstrap';

// Registrazione degli elementi necessari per il grafico
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  Title, 
  CategoryScale, 
  RadialLinearScale // Registriamo la scala radialLinear
);

const CategoryChart = () => {
  const { data, error, isLoading } = useGetCategoriesStatsQuery();

  // Prepara i dati per il grafico PolarArea
  const chartData = {
    labels: data ? data.map(item => item.category) : [], 
    datasets: [
      {
        label: 'Prodotti per Categoria',
        data: data ? data.map(item => item.numberOfProducts) : [], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ], // Colori per ogni sezione
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ], // Colori del bordo
        borderWidth: 1,
      },
    ],
  };

  // Gestione dei vari stati di richiesta
  if (isLoading) return <p>Caricamento in corso...</p>;
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
