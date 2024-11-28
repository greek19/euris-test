import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Layout from './components/Layout';
import AddProduct from './pages/AddProduct';
import CategoryChart from './pages/CategoryChart';
import Login from './pages/Login';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state)=> state.isAuthenticated);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Login />} />
        <Route path="/add-product" element={isAuthenticated ? <AddProduct /> : <Login />} />
        <Route path='/chart' element={isAuthenticated ?<CategoryChart /> : <Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
