import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";

ReactDOM.render(
    <React.StrictMode>
        <DefaultLayout/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
