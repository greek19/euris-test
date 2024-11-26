import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import HeaderNonAuth from './HeaderNonAuth';

const Layout = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="d-flex flex-column min-vh-100">
      {isAuthenticated ? <Header /> : <HeaderNonAuth /> }
      <Container className="my-4 flex-grow-1">
        <div className="d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: '1200px' }}>
            {children}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
