import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { login } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROOT } from "../utility/routesConstants";
import { GOOGLE_CLIENT_ID } from "../utility/constants";

const GoogleLoginComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    dispatch(login({username:decoded.given_name}))
    navigate(ROOT)
  };

  const handleError = () => {
    console.error("Errore durante il login con Google");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="google-login-container">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          size="large"    // Forza una dimensione "large" per il bottone
          width="100%"    // Estendi il bottone alla larghezza del contenitore
          className="google-login-button"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
