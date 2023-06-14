import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';

Providers.globalProvider = new Msal2Provider({
  clientId: '37dd0407-2dca-47af-894c-3c2017b60a9e'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);