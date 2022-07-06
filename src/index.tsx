import React from 'react';
import {createRoot} from 'react-dom/client'
import './index.css';
import 'antd/dist/antd.min.css';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {AppRoutes} from "@routes";


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
