import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './app/App';
import './app/index.css';

ReactDOM.render(
  
  <React.StrictMode>
    <div id="qq">
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
