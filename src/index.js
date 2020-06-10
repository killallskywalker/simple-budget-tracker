import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import './styles/main.css';
import App from './App';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';

const customHistory = createBrowserHistory();

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }

ReactDOM.render(
<Router history={customHistory}>
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
</Router>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
