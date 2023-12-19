
import React from 'react';

import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// Utiliza createRoot desde react-dom/client y pasa el contenedor como argumento.
const root = document.getElementById('root');
const rootElement = root ? ReactDOM.createRoot(root) : ReactDOM.createRoot();
window.electronAPI.onUpdateTheme((event,theme)=>{
  const root =document.documentElement
  // console.log(root);
  root.style.setProperty("--scheme",theme)
})
rootElement.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
