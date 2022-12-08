import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/base/grid.css";
import "./css/base/reset.css";
import reportWebVitals from './reportWebVitals';
import "./access/fonts/boxicons-2.0.7/css/boxicons.min.css";
import { Provider } from 'react-redux';
import store from "./redux/store";
import Router from './router/Router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
    <Provider store={store}>
        <Router />
    </Provider>
//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
