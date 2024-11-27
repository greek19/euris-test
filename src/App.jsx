import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Layout from './components/Layout';
import AddProduct from './pages/AddProduct';
import CategoryChart from './pages/CategoryChart';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path='/chart' element={<CategoryChart />} />
      </Routes>
    </Layout>
  );
};

export default App;
