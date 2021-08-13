import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from '@particular.cloud/i18n-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <I18nProvider config={{ defaultLanguage: 'en-US' }}>
            <App />
        </I18nProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
