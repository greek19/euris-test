import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { ERROR_MESSAGES_LOGIN, MOCK_USERS } from '../utility/constants'; 
import GoogleLoginComponent from '../components/GoogleLoginComponent';
import PropTypes from 'prop-types';

const ErrorAlert = ({ error }) => (error ? <Alert variant="danger">{error}</Alert> : null);

ErrorAlert.propTypes = {
  error: PropTypes.string
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') setUsername(value);
    if (id === 'password') setPassword(value);
  };

  const validateInputs = () => {
    if (!username.trim() || !password.trim()) {
      setError(ERROR_MESSAGES_LOGIN.required);
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    // Verifica delle credenziali
    const isValidUser = MOCK_USERS.some(
      (u) => u.username === username && u.password === password
    );

    if (isValidUser) {
      dispatch(login({ username }));
      navigate('/');
    } else {
      setError(ERROR_MESSAGES_LOGIN.invalid);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <ErrorAlert error={error} />
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="row justify-content-between text-break">
          <div className="col-12 col-md-5 mt-3 d-flex justify-content-center">
            <div className="w-100" >
              <GoogleLoginComponent />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <Button variant="primary" type="submit" className="mt-3 w-100" id="button-login">
              Login
            </Button>
          </div>
        </div>

      </Form>

      

    </div>
  );
};

export default Login;
