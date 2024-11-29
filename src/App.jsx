import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Layout from './components/layout/Layout';
import AddProduct from './pages/AddProduct';
import CategoryChart from './pages/CategoryChart';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // Importa PrivateRoute
import { ADD_PRODUCTS, CHART, LOGIN, PRODUCTS, ROOT } from './utility/routesConstants';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROOT} element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={PRODUCTS} element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path={ADD_PRODUCTS} element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path={CHART} element={<PrivateRoute><CategoryChart /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={ROOT} />} />
      </Routes>
    </Layout>
  );
};

export default App;
