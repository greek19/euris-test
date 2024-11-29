import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { ERROR_MESSAGES_LOGIN, MOCK_USERS } from '../utility/constants'; // Importa utenti mock

const ErrorAlert = ({ error }) => (error ? <Alert variant="danger">{error}</Alert> : null);

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
      dispatch(login({ username })); // Salva l'utente in Redux
      navigate('/'); // Reindirizza alla home
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

        <Button variant="primary" type="submit" className="mt-3" id="button-login">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
