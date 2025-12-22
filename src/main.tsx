import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
//i can add redirect uri here as well when I move to cloudfront

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience
      }}
      cacheLocation='localstorage'
      useRefreshTokens={true}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
