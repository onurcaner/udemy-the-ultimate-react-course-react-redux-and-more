import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

import { StarRating } from './components/StarRating.tsx';

const rootElement = document.querySelector<HTMLElement>('#root');
if (!rootElement) throw new Error('Can not find the #root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={10}
      onRate={(newRating: number) => {
        console.log(newRating);
      }}
    /> */}
  </React.StrictMode>
);
