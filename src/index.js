import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import RootReducer from "../src/store/reducer/RootReducer";
import './index.css';
import App from './App';

import {
  BrowserRouter as Router
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={RootReducer}>
  <Router>
    <Suspense fallback={<div>Loading...</div>} >
    <App />
    </Suspense>
  </Router>
  </Provider>
);


