import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

const rootElement = document.querySelector<HTMLElement>('#root');
if (!rootElement) throw new Error('Can not find the #root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
