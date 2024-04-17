import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import { GlobalStyles } from './styles/GlobalStyles.tsx';

const rootElement = document.querySelector<HTMLElement>('#root');
if (!rootElement) throw new Error('Can not find the #root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalStyles />

    <App />
  </React.StrictMode>,
);
